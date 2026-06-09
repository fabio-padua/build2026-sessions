export function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-brand">
          <svg className="ms-logo" viewBox="0 0 23 23" fill="none">
            <rect width="11" height="11" fill="#f25022" />
            <rect x="12" width="11" height="11" fill="#7fba00" />
            <rect y="12" width="11" height="11" fill="#00a4ef" />
            <rect x="12" y="12" width="11" height="11" fill="#ffb900" />
          </svg>
          <div className="header-text">
            <h1>Microsoft Build 2026</h1>
            <p className="header-subtitle">Session Explorer</p>
          </div>
        </div>
        <div className="header-links">
          <a
            href="https://build.microsoft.com/en-US/home"
            target="_blank"
            rel="noopener noreferrer"
            className="header-link"
          >
            Build Home ↗
          </a>
        </div>
      </div>
    </header>
  );
}
