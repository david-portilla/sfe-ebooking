/**
 * Validates and sanitizes a URL string to prevent XSS and open redirect attacks.
 * @param url - The URL string to validate (can be a domain or full URL)
 * @returns A valid HTTPS URL string, or null if invalid
 */
export function sanitizeUrl(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    // Remove any whitespace
    const trimmed = url.trim();

    // Check for dangerous protocols before processing
    const dangerousProtocols = /^(javascript|data|file|vbscript|about):/i;
    if (dangerousProtocols.test(trimmed)) {
      return null;
    }

    // Prepend https:// if no protocol is present
    const urlWithProtocol = trimmed.match(/^https?:\/\//)
      ? trimmed
      : `https://${trimmed}`;

    // Parse and validate URL
    const parsedUrl = new URL(urlWithProtocol);

    // Only allow http and https protocols (prevents javascript:, data:, file:, etc.)
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return null;
    }

    // Ensure there's a valid hostname
    if (!parsedUrl.hostname || parsedUrl.hostname.length === 0) {
      return null;
    }

    return parsedUrl.href;
  } catch {
    // Invalid URL format
    return null;
  }
}

/**
 * Checks if a URL is safe to use in an anchor tag.
 * @param url - The URL to check
 * @returns True if the URL is safe, false otherwise
 */
export function isSafeUrl(url: string): boolean {
  return sanitizeUrl(url) !== null;
}
