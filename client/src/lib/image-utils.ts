/**
 * Image optimization utilities for Pan Eventz
 * Preserves all original media files and URLs while delivering non-destructive CDN optimizations:
 * - f_auto: delivers modern formats (WebP/AVIF) when supported by the client
 * - q_auto: optimal visual quality compression
 * - c_limit: prevents artificial upscaling
 * - Responsive srcset generation for high-DPI screens and mobile devices
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: 'auto' | 'good' | 'best' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg';
  crop?: 'limit' | 'fill' | 'scale';
}

export function getOptimizedImageUrl(
  originalUrl: string,
  options: ImageOptimizationOptions = {}
): string {
  if (!originalUrl) return '';

  // Only apply Cloudinary transformations to Cloudinary URLs
  if (originalUrl.includes('res.cloudinary.com')) {
    const uploadMarker = '/image/upload/';
    const index = originalUrl.indexOf(uploadMarker);

    if (index !== -1) {
      const prefix = originalUrl.substring(0, index + uploadMarker.length);
      const rest = originalUrl.substring(index + uploadMarker.length);

      // Check if already transformed
      if (/^(?:f_auto|q_|w_|c_)/.test(rest)) {
        return originalUrl;
      }

      const transforms: string[] = [];

      // Auto format (WebP / AVIF)
      transforms.push(`f_${options.format || 'auto'}`);

      // Auto quality
      const q = options.quality ?? 'good';
      transforms.push(`q_auto:${q}`);

      // Responsive width / height with c_limit to preserve aspect ratio & quality
      if (options.width) {
        transforms.push(`w_${Math.round(options.width)}`);
        transforms.push(`c_${options.crop || 'limit'}`);
      }
      if (options.height) {
        transforms.push(`h_${Math.round(options.height)}`);
      }

      return `${prefix}${transforms.join(',')}/${rest}`;
    }
  }

  // Unsplash URLs
  if (originalUrl.includes('images.unsplash.com')) {
    try {
      const url = new URL(originalUrl);
      if (options.width) url.searchParams.set('w', String(Math.round(options.width)));
      if (options.height) url.searchParams.set('h', String(Math.round(options.height)));
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      return url.toString();
    } catch {
      return originalUrl;
    }
  }

  // Preserve all other URLs exactly as-is
  return originalUrl;
}

export function getSrcSet(
  originalUrl: string,
  widths: number[] = [480, 768, 1200, 1920]
): string {
  if (!originalUrl) return '';
  if (!originalUrl.includes('res.cloudinary.com') && !originalUrl.includes('images.unsplash.com')) {
    return '';
  }

  return widths
    .map((w) => `${getOptimizedImageUrl(originalUrl, { width: w })} ${w}w`)
    .join(', ');
}
