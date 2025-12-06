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
export const defaultPlatforms: Platform[] = [
  {
    id: 'qr-generator',
    name: 'QR Bar Code Generator',
    description: 'Generate QR codes and barcodes instantly. Create custom QR codes with logos, colors, and sizes. Perfect for businesses, events, and personal use.',
    url: 'https://your-qr-generator-platform.com',
    imageUrl: '/images/qr-generator.jpg',
    category: 'Tools',
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'text-to-voice',
    name: 'Text to Voice Generator with Unlimited Translator',
    description: 'Convert text to natural-sounding voice in multiple languages. Unlimited translation support with high-quality voice synthesis. Perfect for content creators and accessibility.',
    url: 'https://your-text-to-voice-platform.com',
    imageUrl: '/images/text-to-voice.jpg',
    category: 'AI Tools',
    featured: true,
    createdAt: new Date().toISOString(),
  },
];

// Store platforms in localStorage (with GitHub sync support)
export const getPlatforms = async (): Promise<Platform[]> => {
  if (typeof window === 'undefined') return defaultPlatforms;
  
  // Try to load from GitHub first if configured
  try {
    const { loadPlatformsFromGitHub } = await import('./githubSync');
    const result = await loadPlatformsFromGitHub();
    if (result.success && result.platforms && result.platforms.length > 0) {
      // Save to localStorage and return
      localStorage.setItem('platforms', JSON.stringify(result.platforms));
      return result.platforms;
    }
  } catch (error) {
    console.log('Loading platforms from GitHub failed, using localStorage:', error);
  }
  
  // Fallback to localStorage
  const stored = localStorage.getItem('platforms');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultPlatforms;
    }
  }
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



