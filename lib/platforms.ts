export interface Platform {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  createdAt: string;
}

// Default platforms
// These are used when there is no data yet in localStorage / GitHub.
// They are also the initial data that will be written to GitHub JSON.
export const defaultPlatforms: Platform[] = [
  {
    id: 'qr-generator',
    name: 'QR Bar Code Generator',
    description:
      'Generate QR codes and barcodes instantly. Create custom QR codes with logos, colors, and sizes. Perfect for businesses, events, and personal use.',
    // Live QR generator app
    // Ref: https://nayana.top/QR-Barcode-Generator/
    url: 'https://nayana.top/QR-Barcode-Generator/',
    // Hosted image (Google Drive share link, converted at runtime)
    imageUrl:
      'https://drive.google.com/file/d/1kJY_YyO0DOjB_KsLD-8V5CRLZxIpSvys/view?usp=drive_link',
    category: 'Tools',
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'text-to-voice',
    name: 'Text to Voice Generator with Unlimited Translator',
    description:
      'Convert text to natural-sounding voice in multiple languages. Unlimited translation support with high-quality voice synthesis. Perfect for content creators and accessibility.',
    // Live Text-to-Voice generator app
    // Ref: https://nayana.top/Text-to-Voice-Generator.github.io/
    url: 'https://nayana.top/Text-to-Voice-Generator.github.io/',
    // Hosted image (Google Drive share link, converted at runtime)
    imageUrl:
      'https://drive.google.com/file/d/13sDTkHpBfOyaJEbc09-hb6UsIxI7t0I1/view?usp=drive_link',
    category: 'AI Tools',
    featured: true,
    createdAt: new Date().toISOString(),
  },
];

// Store platforms in localStorage (with GitHub sync support)
export const getPlatforms = async (): Promise<Platform[]> => {
  if (typeof window === 'undefined') return defaultPlatforms;
  
  // 1) Try to load from the public GitHub JSON (no token required, works for all visitors)
  //    This reads from the same file that the admin dashboard syncs to: data/platforms.json
  try {
    const publicUrl =
      'https://raw.githubusercontent.com/TMNPThennakoon/TMNPThennakoon.github.io/main/data/platforms.json';
    const response = await fetch(publicUrl, { cache: 'no-store' });
    if (response.ok) {
      const remotePlatforms = await response.json();
      if (Array.isArray(remotePlatforms) && remotePlatforms.length > 0) {
        localStorage.setItem('platforms', JSON.stringify(remotePlatforms));
        return remotePlatforms as Platform[];
      }
    }
  } catch (error) {
    console.log('Loading platforms from public GitHub JSON failed, falling back...', error);
  }
  
  // 2) Try to load via authenticated GitHub API if a config/token is present in this browser
  try {
    const { loadPlatformsFromGitHub } = await import('./githubSync');
    const result = await loadPlatformsFromGitHub();
    if (result.success && result.platforms) {
      // Always use GitHub data if available (even if empty array)
      // This ensures cross-device sync works properly (for devices with config)
      if (result.platforms.length > 0 || localStorage.getItem('platforms')) {
        localStorage.setItem('platforms', JSON.stringify(result.platforms));
        return result.platforms as Platform[];
      }
    }
  } catch (error) {
    console.log('Loading platforms from GitHub (with token) failed, using localStorage:', error);
  }
  
  // Fallback to localStorage
  const stored = localStorage.getItem('platforms');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Only return if we have platforms, otherwise try GitHub again
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // Invalid JSON, continue to default
    }
  }
  
  // Last resort: use defaults
  localStorage.setItem('platforms', JSON.stringify(defaultPlatforms));
  return defaultPlatforms;
};

// Get platforms synchronously from localStorage (for initial render)
export const getPlatformsSync = (): Platform[] => {
  if (typeof window === 'undefined') return defaultPlatforms;
  const stored = localStorage.getItem('platforms');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultPlatforms;
    }
  }
  return defaultPlatforms;
};

export const savePlatforms = (platforms: Platform[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('platforms', JSON.stringify(platforms));
};

export const addPlatform = (platform: Omit<Platform, 'id' | 'createdAt'>): Platform => {
  const platforms = getPlatformsSync();
  const newPlatform: Platform = {
    ...platform,
    id: `platform-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  platforms.push(newPlatform);
  savePlatforms(platforms);
  return newPlatform;
};

export const updatePlatform = (id: string, updates: Partial<Platform>): Platform | null => {
  const platforms = getPlatformsSync();
  const index = platforms.findIndex(p => p.id === id);
  if (index === -1) return null;
  platforms[index] = { ...platforms[index], ...updates };
  savePlatforms(platforms);
  return platforms[index];
};

export const deletePlatform = (id: string): boolean => {
  const platforms = getPlatformsSync();
  const filtered = platforms.filter(p => p.id !== id);
  if (filtered.length === platforms.length) return false;
  savePlatforms(filtered);
  return true;
};



