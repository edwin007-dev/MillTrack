import { Injectable } from '@angular/core';

/**
 * Centralized service for constructing image URLs across the MillTrack application.
 * Ensures consistent handling of image paths, special characters, and backend URLs.
 *
 * This service provides a single source of truth for image URL construction,
 * making it easier to manage backend URL changes and handle special cases.
 */
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly BACKEND_URL = 'http://localhost:3000';
  private readonly IMAGE_BASE_PATH = '/images';

  /**
   * Build a complete image URL for display in the frontend.
   *
   * @param filename The image filename as stored in the database
   * @returns Complete URL for the image
   *
   * @example
   * imageUrl = this.imageService.buildImageUrl('Kunnappalliyil Oil Mills');
   * // Returns: 'http://localhost:3000/images/Kunnappalliyil%20Oil%20Mills'
   *
   * imageUrl = this.imageService.buildImageUrl('venkys-oil-mill.jpg');
   * // Returns: 'http://localhost:3000/images/venkys-oil-mill.jpg'
   */
  buildImageUrl(filename: string | null | undefined): string {
    if (!filename) {
      // Return a placeholder or empty string if no filename provided
      return '';
    }

    // Remove any leading/trailing whitespace
    const cleanFilename = filename.trim();

    // URL encode the filename to handle spaces and special characters
    const encodedFilename = encodeURIComponent(cleanFilename);

    // Construct the full URL
    return `${this.BACKEND_URL}${this.IMAGE_BASE_PATH}/${encodedFilename}`;
  }

  /**
   * Helper method for use in Angular templates.
   *
   * @param filename The image filename as stored in the database
   * @returns Complete URL for the image, suitable for use in [src] binding
   *
   * @example
   * <img [src]="imageService.getUrl(data.image)" alt="Image">
   */
  getUrl(filename: string | null | undefined): string {
    return this.buildImageUrl(filename);
  }

  /**
   * Check if a filename appears to have an image extension.
   * This can be used for conditional logic if needed.
   */
  hasImageExtension(filename: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.bmp', '.svg'];
    const lowerFilename = filename.toLowerCase();
    return imageExtensions.some(ext => lowerFilename.endsWith(ext));
  }
}