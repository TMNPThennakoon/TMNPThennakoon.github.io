export interface DashboardSettings {
  // Branding
  dashboardName: string
  dashboardSubtitle: string
  dashboardDescription: string
  
  // Section Text
  featuredSectionTitle: string
  featuredSectionSubtitle: string
  allPlatformsSectionTitle: string
  allPlatformsSectionSubtitle: string
  
  // 3D Background Style
  backgroundStyle: 'grid-dots' | 'particles' | 'waves' | 'geometric' | 'minimal'
  
  // Animation Styles
  animationSpeed: 'slow' | 'normal' | 'fast'
  animationIntensity: 'subtle' | 'moderate' | 'intense'
  enableParticles: boolean
  enableFloatingElements: boolean
  
  // Colors (optional for future)
  primaryColor: string
  secondaryColor: string
}

export const defaultSettings: DashboardSettings = {
  dashboardName: 'Platform',
  dashboardSubtitle: 'hub',
  dashboardDescription: 'Your Gateway to Powerful Tools & Platforms',
  
  featuredSectionTitle: 'Featured Platforms',
  featuredSectionSubtitle: 'Handpicked tools and platforms for you',
  allPlatformsSectionTitle: 'All Platforms',
  allPlatformsSectionSubtitle: 'Explore all available tools and platforms',
  
  backgroundStyle: 'grid-dots',
  animationSpeed: 'normal',
  animationIntensity: 'moderate',
  enableParticles: true,
  enableFloatingElements: true,
  
  primaryColor: '#3b82f6',
  secondaryColor: '#8b5cf6',
}

// Get settings from localStorage
export const getSettings = (): DashboardSettings => {
  if (typeof window === 'undefined') return defaultSettings
  const stored = localStorage.getItem('dashboard_settings')
  if (stored) {
    try {
      return { ...defaultSettings, ...JSON.parse(stored) }
    } catch {
      return defaultSettings
    }
  }
  localStorage.setItem('dashboard_settings', JSON.stringify(defaultSettings))
  return defaultSettings
}

// Save settings to localStorage
export const saveSettings = (settings: DashboardSettings): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('dashboard_settings', JSON.stringify(settings))
}

// Update specific setting
export const updateSetting = <K extends keyof DashboardSettings>(
  key: K,
  value: DashboardSettings[K]
): void => {
  const settings = getSettings()
  settings[key] = value
  saveSettings(settings)
}

