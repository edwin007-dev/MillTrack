import { Injectable } from '@angular/core';

/**
 * Centralized service for constructing image URLs across the MillTrack application.
 * Ensures consistent handling of image paths, special characters, and local asset/backend URLs.
 */
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly BACKEND_URL = 'http://localhost:3000';
  private readonly IMAGE_BASE_PATH = '/images';
  private readonly SERVICE_PRODUCTS_PATH = '/assets/customer/images/Service or Products';

  /**
   * Build a complete image URL for display in the frontend.
   * Checks local assets/customer/images/Service or Products first, then backend URL.
   *
   * @param filename The image filename as stored in the database
   * @param serviceOrProductName Optional service or product name to match
   * @returns Complete URL for the image
   */
  buildImageUrl(filename: string | null | undefined, serviceOrProductName?: string | null | undefined): string {
    if (serviceOrProductName && !filename) {
      const cleanName = serviceOrProductName.trim();
      return `${this.SERVICE_PRODUCTS_PATH}/${encodeURIComponent(cleanName)}.jpg`;
    }

    if (!filename) {
      return '';
    }

    const cleanFilename = filename.trim();

    // If filename already points to a full path or external URL
    if (cleanFilename.startsWith('/assets') || cleanFilename.startsWith('http://') || cleanFilename.startsWith('https://')) {
      return cleanFilename;
    }

    // Default to backend images
    return `${this.BACKEND_URL}${this.IMAGE_BASE_PATH}/${encodeURIComponent(cleanFilename)}`;
  }

  /**
   * Specifically resolves an image from "Service or Products" folder by service/product name.
   */
  getServiceImageUrl(name: string | null | undefined, fallbackFilename?: string | null): string {
    if (name) {
      const cleanName = name.trim();
      return `${this.SERVICE_PRODUCTS_PATH}/${encodeURIComponent(cleanName)}.jpg`;
    }
    if (fallbackFilename) {
      return this.getUrl(fallbackFilename);
    }
    return '';
  }

  /**
   * Helper method for use in Angular templates.
   */
  getUrl(filename: string | null | undefined, serviceOrProductName?: string | null | undefined): string {
    if (serviceOrProductName && !filename) {
      return this.getServiceImageUrl(serviceOrProductName);
    }

    if (!filename) {
      return '';
    }

    const cleanFilename = filename.trim();
    if (cleanFilename.startsWith('/assets') || cleanFilename.startsWith('http://') || cleanFilename.startsWith('https://')) {
      return cleanFilename;
    }

    // Return the backend URL for standard database images
    return `${this.BACKEND_URL}${this.IMAGE_BASE_PATH}/${encodeURIComponent(cleanFilename)}`;
  }

  /**
   * Graceful fallback when an image fails to load.
   * Tries alternative paths (backend <-> local assets), then falls back to a default banner.
   */
  handleImageError(event: Event, fallbackFilename?: string | null, serviceOrProductName?: string | null): void {
    const target = event.target as HTMLImageElement;
    if (!target) return;

    if (target.src.includes('about-image.jpg')) {
      return; // prevent infinite error loops
    }

    const attempts = parseInt(target.dataset['loadAttempts'] || '0', 10);
    if (attempts === 0) {
      target.dataset['loadAttempts'] = '1';
      // If failed from local assets, try backend
      if (target.src.includes('/assets/customer/images/Service%20or%20Products') || target.src.includes('/assets/customer/images/Service or Products')) {
        const fileToTry = fallbackFilename || (serviceOrProductName ? `${serviceOrProductName.trim()}.jpg` : '');
        if (fileToTry) {
          target.src = `${this.BACKEND_URL}${this.IMAGE_BASE_PATH}/${encodeURIComponent(fileToTry.trim())}`;
          return;
        }
      } else {
        // If failed from backend, try local assets
        const nameToTry = serviceOrProductName || (fallbackFilename ? fallbackFilename.trim().replace(/\.[^/.]+$/, '') : '');
        if (nameToTry) {
          target.src = `${this.SERVICE_PRODUCTS_PATH}/${encodeURIComponent(nameToTry.trim())}.jpg`;
          return;
        }
      }
    }
    // Final fallback: fallback banner/placeholder
    target.src = '/assets/customer/images/about-image.jpg';
  }

  /**
   * Check if a filename appears to have an image extension.
   */
  hasImageExtension(filename: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.bmp', '.svg'];
    const lowerFilename = filename.toLowerCase();
    return imageExtensions.some(ext => lowerFilename.endsWith(ext));
  }
}
