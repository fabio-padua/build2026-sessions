<#
.SYNOPSIS
    Deploy the Build 2026 Session Explorer to Azure Static Web Apps.

.DESCRIPTION
    Creates a resource group and Azure Static Web App, links it to the GitHub repo,
    and triggers the first deployment via GitHub Actions.

.PARAMETER ResourceGroupName
    Name of the Azure resource group to create/use. Default: rg-build2026-sessions

.PARAMETER Location
    Azure region. Default: eastus2

.PARAMETER AppName
    Static Web App name. Default: build2026-sessions

.EXAMPLE
    .\deploy.ps1
    .\deploy.ps1 -ResourceGroupName "my-rg" -Location "westus2"
#>

param(
    [string]$ResourceGroupName = "rg-build2026-sessions",
    [string]$Location = "eastus2",
    [string]$AppName = "build2026-sessions",
    [string]$GitHubRepo = "fabio-padua/build2026-sessions",
    [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Build 2026 Session Explorer - Deploy" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Step 1: Ensure logged in
Write-Host "[1/4] Checking Azure CLI login..." -ForegroundColor Yellow
$account = az account show 2>$null | ConvertFrom-Json
if (-not $account) {
    Write-Host "  Not logged in. Running az login..." -ForegroundColor Gray
    az login
}
Write-Host "  Subscription: $($account.name)" -ForegroundColor Green

# Step 2: Create Resource Group
Write-Host "`n[2/4] Creating resource group '$ResourceGroupName' in '$Location'..." -ForegroundColor Yellow
az group create --name $ResourceGroupName --location $Location --output none
Write-Host "  Resource group ready." -ForegroundColor Green

# Step 3: Create Static Web App
Write-Host "`n[3/4] Creating Azure Static Web App '$AppName'..." -ForegroundColor Yellow
$swa = az staticwebapp create `
    --name $AppName `
    --resource-group $ResourceGroupName `
    --source "https://github.com/$GitHubRepo" `
    --branch $Branch `
    --app-location "/" `
    --output-location "dist" `
    --login-with-github `
    --output json 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "  Error creating Static Web App:" -ForegroundColor Red
    Write-Host "  $swa" -ForegroundColor Red
    exit 1
}

$swaObj = $swa | ConvertFrom-Json
Write-Host "  Static Web App created!" -ForegroundColor Green

# Step 4: Show results
Write-Host "`n[4/4] Deployment initiated!" -ForegroundColor Yellow
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  DEPLOYMENT COMPLETE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`n  App URL:  https://$($swaObj.defaultHostname)" -ForegroundColor White
Write-Host "  Portal:   https://portal.azure.com/#@/resource$($swaObj.id)" -ForegroundColor White
Write-Host "  GitHub:   https://github.com/$GitHubRepo/actions" -ForegroundColor White
Write-Host "`n  The GitHub Actions workflow will build and deploy automatically." -ForegroundColor Gray
Write-Host "  Check the Actions tab for deployment progress.`n" -ForegroundColor Gray
