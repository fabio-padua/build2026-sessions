const ALLOWED_LINK_HOSTS = [
  'medius.microsoft.com',
  'build.microsoft.com',
  'learn.microsoft.com',
  'eventtools.event.microsoft.com',
  'developer.microsoft.com',
  'aka.ms',
];

const ALLOWED_IMAGE_HOSTS = [
  'medius.microsoft.com',
  'mediusdl.event.microsoft.com',
  'mediastream.microsoft.com',
  'eventtools.event.microsoft.com',
  'build.microsoft.com',
];

export function safeUrl(value: string | undefined | null, allowedHosts: string[]): string | null {
  if (!value || typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    const hostname = url.hostname.toLowerCase();
    const isAllowed = allowedHosts.some(
      (host) => hostname === host || hostname.endsWith(`.${host}`)
    );
    return isAllowed ? url.toString() : null;
  } catch {
    return null;
  }
}

export function safeLinkUrl(value: string | undefined | null): string | null {
  return safeUrl(value, ALLOWED_LINK_HOSTS);
}

export function safeImageUrl(value: string | undefined | null): string | null {
  return safeUrl(value, ALLOWED_IMAGE_HOSTS);
}
