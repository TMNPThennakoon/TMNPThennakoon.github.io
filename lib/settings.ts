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

// Get settings from localStorage (with GitHub sync support)
export const getSettings = async (): Promise<DashboardSettings> => {
  if (typeof window === 'undefined') return defaultSettings
  
  // Try to load from GitHub first if configured
  try {
    const { loadSettingsFromGitHub } = await import('./githubSync')
    const result = await loadSettingsFromGitHub()
    if (result.success && result.settings) {
      // Merge with defaults and save to localStorage
      const mergedSettings = { ...defaultSettings, ...result.settings }
      localStorage.setItem('dashboard_settings', JSON.stringify(mergedSettings))
      return mergedSettings
    }
  } catch (error) {
    console.log('Loading from GitHub failed, using localStorage:', error)
  }
  
  // Fallback to localStorage
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

// Get settings synchronously from localStorage (for initial render)
export const getSettingsSync = (): DashboardSettings => {
  if (typeof window === 'undefined') return defaultSettings
  const stored = localStorage.getItem('dashboard_settings')
  if (stored) {
    try {
      return { ...defaultSettings, ...JSON.parse(stored) }
    } catch {
      return defaultSettings
    }
  }
  return defaultSettings
}

// Save settings to localStorage and optionally sync to GitHub
export const saveSettings = async (settings: DashboardSettings, syncToGitHub: boolean = true): Promise<{ success: boolean; message: string }> => {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Cannot save settings in server environment' }
  }
  
  // Save to localStorage first
  localStorage.setItem('dashboard_settings', JSON.stringify(settings))
  
  // Sync to GitHub if configured
  if (syncToGitHub) {
    try {
      const { syncSettingsToGitHub } = await import('./githubSync')
      const result = await syncSettingsToGitHub(settings)
      return result
    } catch (error: any) {
      return {
        success: false,
        message: `Settings saved locally but GitHub sync failed: ${error.message}`
      }
    }
  }
  
  return {
    success: true,
    message: 'Settings saved successfully'
  }
}

// Update specific setting
export const updateSetting = async <K extends keyof DashboardSettings>(
  key: K,
  value: DashboardSettings[K],
  syncToGitHub: boolean = true
): Promise<{ success: boolean; message: string }> => {
  const settings = getSettingsSync()
  settings[key] = value
  return await saveSettings(settings, syncToGitHub)
}

