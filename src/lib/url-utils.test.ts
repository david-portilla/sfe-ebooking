import { describe, it, expect } from 'vitest';
import { sanitizeUrl, isSafeUrl } from './url-utils';

describe('sanitizeUrl', () => {
  it('should sanitize valid domain without protocol', () => {
    const result = sanitizeUrl('example.com');
    expect(result).toBe('https://example.com/');
  });

  it('should sanitize valid URL with https protocol', () => {
    const result = sanitizeUrl('https://example.com');
    expect(result).toBe('https://example.com/');
  });

  it('should sanitize valid URL with http protocol', () => {
    const result = sanitizeUrl('http://example.com');
    expect(result).toBe('http://example.com/');
  });

  it('should sanitize URL with path and query params', () => {
    const result = sanitizeUrl('example.com/path?foo=bar');
    expect(result).toBe('https://example.com/path?foo=bar');
  });

  it('should handle URLs with whitespace', () => {
    const result = sanitizeUrl('  example.com  ');
    expect(result).toBe('https://example.com/');
  });

  it('should reject javascript: protocol (XSS prevention)', () => {
    const result = sanitizeUrl('javascript:alert("XSS")');
    expect(result).toBeNull();
  });

  it('should reject data: protocol', () => {
    const result = sanitizeUrl('data:text/html,<script>alert("XSS")</script>');
    expect(result).toBeNull();
  });

  it('should reject file: protocol', () => {
    const result = sanitizeUrl('file:///etc/passwd');
    expect(result).toBeNull();
  });

  it('should reject vbscript: protocol', () => {
    const result = sanitizeUrl('vbscript:msgbox("XSS")');
    expect(result).toBeNull();
  });

  it('should handle protocol-relative URLs safely', () => {
    const result = sanitizeUrl('//evil.com');
    expect(result).toBe('https://evil.com/');
  });

  it('should return null for empty string', () => {
    const result = sanitizeUrl('');
    expect(result).toBeNull();
  });

  it('should return null for invalid URL', () => {
    const result = sanitizeUrl('not a valid url !@#$%');
    expect(result).toBeNull();
  });

  it('should return null for non-string input', () => {
    const result = sanitizeUrl(null as unknown as string);
    expect(result).toBeNull();
  });
});

describe('isSafeUrl', () => {
  it('should return true for valid URLs', () => {
    expect(isSafeUrl('https://example.com')).toBe(true);
    expect(isSafeUrl('example.com')).toBe(true);
  });

  it('should return false for dangerous URLs', () => {
    expect(isSafeUrl('javascript:alert("XSS")')).toBe(false);
    expect(isSafeUrl('data:text/html,<script>')).toBe(false);
    expect(isSafeUrl('')).toBe(false);
  });
});
