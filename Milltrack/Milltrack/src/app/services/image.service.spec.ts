import { TestBed } from '@angular/core/testing';
import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildImageUrl', () => {
    it('should return empty string for null filename', () => {
      expect(service.buildImageUrl(null)).toBe('');
    });

    it('should return empty string for undefined filename', () => {
      expect(service.buildImageUrl(undefined)).toBe('');
    });

    it('should return empty string for empty string', () => {
      expect(service.buildImageUrl('')).toBe('');
    });

    it('should handle filename with spaces correctly', () => {
      const result = service.buildImageUrl('Kunnappalliyil Oil Mills');
      // Spaces should be encoded as %20
      expect(result).toBe('http://localhost:3000/images/Kunnappalliyil%20Oil%20Mills');
    });

    it('should handle filename with commas correctly', () => {
      const result = service.buildImageUrl('30 tons per day corn processing plant,corn flour grains grinding machine,corn mill');
      // Commas should be encoded as %2C
      expect(result).toBe('http://localhost:3000/images/30%20tons%20per%20day%20corn%20processing%20plant%2Ccorn%20flour%20grains%20grinding%20machine%2Ccorn%20mill');
    });

    it('should handle filename with extension correctly', () => {
      const result = service.buildImageUrl('venkys-oil-mill.jpg');
      expect(result).toBe('http://localhost:3000/images/venkys-oil-mill.jpg');
    });

    it('should handle filename with parentheses correctly', () => {
      const result = service.buildImageUrl('d1aa7033eb989bf22362333ed9b6406f (1).jpg');
      // Parentheses and spaces should be encoded
      expect(result).toBe('http://localhost:3000/images/d1aa7033eb989bf22362333ed9b6406f%20(1).jpg');
    });

    it('should trim whitespace from filename', () => {
      const result = service.buildImageUrl('  venkys-oil-mill.jpg  ');
      expect(result).toBe('http://localhost:3000/images/venkys-oil-mill.jpg');
    });
  });

  describe('getUrl', () => {
    it('should be an alias for buildImageUrl', () => {
      const filename = 'Kunnappalliyil Oil Mills';
      expect(service.getUrl(filename)).toBe(service.buildImageUrl(filename));
    });
  });

  describe('hasImageExtension', () => {
    it('should return true for filename with .jpg extension', () => {
      expect(service.hasImageExtension('test.jpg')).toBe(true);
      expect(service.hasImageExtension('TEST.JPG')).toBe(true);
      expect(service.hasImageExtension('test.product.jpg')).toBe(true);
    });

    it('should return true for filename with .jpeg extension', () => {
      expect(service.hasImageExtension('test.jpeg')).toBe(true);
    });

    it('should return true for filename with .png extension', () => {
      expect(service.hasImageExtension('test.png')).toBe(true);
    });

    it('should return true for filename with .gif extension', () => {
      expect(service.hasImageExtension('test.gif')).toBe(true);
    });

    it('should return true for filename with .webp extension', () => {
      expect(service.hasImageExtension('test.webp')).toBe(true);
    });

    it('should return true for filename with .avif extension', () => {
      expect(service.hasImageExtension('test.avif')).toBe(true);
    });

    it('should return true for filename with .bmp extension', () => {
      expect(service.hasImageExtension('test.bmp')).toBe(true);
    });

    it('should return true for filename with .svg extension', () => {
      expect(service.hasImageExtension('test.svg')).toBe(true);
    });

    it('should return false for filename without image extension', () => {
      expect(service.hasImageExtension('test.txt')).toBe(false);
      expect(service.hasImageExtension('test')).toBe(false);
      expect(service.hasImageExtension('test.pdf')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(service.hasImageExtension('')).toBe(false);
    });
  });
});