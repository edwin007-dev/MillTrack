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
    if (serviceOrProductName) {
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

    // Try local Service or Products folder
    return `${this.SERVICE_PRODUCTS_PATH}/${encodeURIComponent(cleanFilename)}`;
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
    if (serviceOrProductName) {
      return this.getServiceImageUrl(serviceOrProductName, filename);
    }

    if (!filename) {
      return '';
    }

    const cleanFilename = filename.trim();
    if (cleanFilename.startsWith('/assets') || cleanFilename.startsWith('http://') || cleanFilename.startsWith('https://')) {
      return cleanFilename;
    }

    // Return the local asset path for service/product images
    return `${this.SERVICE_PRODUCTS_PATH}/${encodeURIComponent(cleanFilename)}`;
  }

  /**
   * Graceful fallback when an image fails to load.
   * Tries the backend URL first, then falls back to a default banner.
   */
  handleImageError(event: Event, fallbackFilename?: string | null): void {
    const target = event.target as HTMLImageElement;
    if (!target) return;

    const attempts = parseInt(target.dataset['loadAttempts'] || '0', 10);
    if (attempts === 0) {
      target.dataset['loadAttempts'] = '1';
      if (fallbackFilename) {
        const clean = fallbackFilename.trim();
        target.src = `${this.BACKEND_URL}${this.IMAGE_BASE_PATH}/${encodeURIComponent(clean)}`;
        return;
      }
    }
    if (attempts <= 1) {
      target.dataset['loadAttempts'] = '2';
      target.src = '/assets/customer/images/about-image.jpg';
    }
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
