export interface GitHubConfig {
  token: string
  owner: string
  repo: string
  branch: string
  filePath: string
}

interface GitHubFileContent {
  content: string
  sha?: string
}

// Get GitHub configuration from localStorage
export const getGitHubConfig = (): GitHubConfig | null => {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('github_config')
  if (stored) {
    return JSON.parse(stored)
  }
  return null
}

// Save GitHub configuration to localStorage
export const saveGitHubConfig = (config: GitHubConfig): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('github_config', JSON.stringify(config))
}

// Delete GitHub configuration
export const deleteGitHubConfig = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('github_config')
}

// Encode content to base64 (GitHub API requirement)
const encodeBase64 = (str: string): string => {
  if (typeof window === 'undefined') return ''
  return btoa(unescape(encodeURIComponent(str)))
}

// Decode base64 content
const decodeBase64 = (str: string): string => {
  if (typeof window === 'undefined') return ''
  return decodeURIComponent(escape(atob(str)))
}

// Get file content from GitHub
const getFileContent = async (config: GitHubConfig): Promise<GitHubFileContent | null> => {
  try {
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.filePath}?ref=${config.branch}`
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (response.status === 404) {
      // File doesn't exist yet, will create it
      return { content: '' }
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      content: data.content ? decodeBase64(data.content.replace(/\n/g, '')) : '',
      sha: data.sha,
    }
  } catch (error) {
    console.error('Error fetching file from GitHub:', error)
    throw error
  }
}

// Commit file to GitHub
export const commitToGitHub = async (
  content: string,
  message: string = 'Update platforms data',
  retryCount: number = 0,
  maxRetries: number = 3
): Promise<boolean> => {
  const config = getGitHubConfig()
  if (!config) {
    throw new Error('GitHub configuration not found. Please configure GitHub sync in admin settings.')
  }

  try {
    // Always fetch fresh SHA right before committing to avoid conflicts
    const existingFile = await getFileContent(config)
    const encodedContent = encodeBase64(content)

    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.filePath}`
    
    const body: any = {
      message: message,
      content: encodedContent,
      branch: config.branch,
    }

    // If file exists, include SHA for update
    if (existingFile?.sha) {
      body.sha = existingFile.sha
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json()
      
      // Handle 409 Conflict - file was updated, retry with latest SHA
      if (response.status === 409 && retryCount < maxRetries) {
        console.log(`409 Conflict detected (attempt ${retryCount + 1}/${maxRetries}), fetching latest SHA and retrying...`)
        // Wait a bit longer for each retry to allow GitHub to process
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)))
        // Retry with incremented counter
        return commitToGitHub(content, message, retryCount + 1, maxRetries)
      }
      
      throw new Error(`GitHub API error: ${response.status} - ${errorData.message || response.statusText}`)
    }

    return true
  } catch (error) {
    console.error('Error committing to GitHub:', error)
    throw error
  }
}

// Test GitHub connection
export const testGitHubConnection = async (config: GitHubConfig): Promise<{ success: boolean; message: string }> => {
  try {
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}`
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        return { success: false, message: 'Invalid token. Please check your GitHub token.' }
      }
      if (response.status === 404) {
        return { success: false, message: 'Repository not found. Check owner and repo name.' }
      }
      return { success: false, message: `Error: ${response.status} ${response.statusText}` }
    }

    const data = await response.json()
    return { 
      success: true, 
      message: `Successfully connected to ${data.full_name}` 
    }
  } catch (error: any) {
    return { 
      success: false, 
      message: `Connection error: ${error.message}` 
    }
  }
}

// Auto-sync platforms to GitHub
export const syncPlatformsToGitHub = async (
  platforms: any[],
  action: 'create' | 'update' | 'delete' = 'update'
): Promise<{ success: boolean; message: string }> => {
  try {
    const platformsJson = JSON.stringify(platforms, null, 2)
    const timestamp = new Date().toISOString()
    
    let commitMessage = ''
    switch (action) {
      case 'create':
        commitMessage = `Add new platform - ${timestamp}`
        break
      case 'update':
        commitMessage = `Update platforms - ${timestamp}`
        break
      case 'delete':
        commitMessage = `Delete platform - ${timestamp}`
        break
      default:
        commitMessage = `Sync platforms - ${timestamp}`
    }

    await commitToGitHub(platformsJson, commitMessage)
    
    return {
      success: true,
      message: `Successfully synced to GitHub: ${commitMessage}`
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Failed to sync to GitHub: ${error.message}`
    }
  }
}

// Sync settings to GitHub
export const syncSettingsToGitHub = async (
  settings: any
): Promise<{ success: boolean; message: string }> => {
  try {
    const config = getGitHubConfig()
    if (!config) {
      return {
        success: false,
        message: 'GitHub configuration not found. Settings saved locally only.'
      }
    }

    // Use settings file path (default to data/settings.json)
    const settingsFilePath = config.filePath.replace('platforms.json', 'settings.json')
    const settingsConfig = { ...config, filePath: settingsFilePath }
    
    const settingsJson = JSON.stringify(settings, null, 2)
    const timestamp = new Date().toISOString()
    const commitMessage = `Update dashboard settings - ${timestamp}`

    // Get existing file
    const existingFile = await getFileContent(settingsConfig)
    const encodedContent = encodeBase64(settingsJson)

    const url = `https://api.github.com/repos/${settingsConfig.owner}/${settingsConfig.repo}/contents/${settingsConfig.filePath}`
    
    const body: any = {
      message: commitMessage,
      content: encodedContent,
      branch: settingsConfig.branch,
    }

    if (existingFile?.sha) {
      body.sha = existingFile.sha
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${settingsConfig.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json()
      
      // Handle 409 Conflict - retry with latest SHA
      if (response.status === 409) {
        console.log('409 Conflict detected for settings, retrying with latest SHA...')
        await new Promise(resolve => setTimeout(resolve, 500))
        // Retry once with fresh SHA
        const retryFile = await getFileContent(settingsConfig)
        body.sha = retryFile?.sha
        
        const retryResponse = await fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${settingsConfig.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
        
        if (!retryResponse.ok) {
          const retryErrorData = await retryResponse.json()
          throw new Error(`GitHub API error: ${retryResponse.status} - ${retryErrorData.message || retryResponse.statusText}`)
        }
      } else {
        throw new Error(`GitHub API error: ${response.status} - ${errorData.message || response.statusText}`)
      }
    }

    return {
      success: true,
      message: `Successfully synced settings to GitHub: ${commitMessage}`
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Failed to sync settings to GitHub: ${error.message}`
    }
  }
}

// Load settings from GitHub
export const loadSettingsFromGitHub = async (): Promise<{ success: boolean; settings: any | null; message: string }> => {
  try {
    const config = getGitHubConfig()
    if (!config) {
      return {
        success: false,
        settings: null,
        message: 'GitHub configuration not found'
      }
    }

    const settingsFilePath = config.filePath.replace('platforms.json', 'settings.json')
    const settingsConfig = { ...config, filePath: settingsFilePath }
    
    const fileContent = await getFileContent(settingsConfig)
    
    if (!fileContent || !fileContent.content) {
      return {
        success: false,
        settings: null,
        message: 'Settings file not found on GitHub'
      }
    }

    const settings = JSON.parse(fileContent.content)
    
    return {
      success: true,
      settings,
      message: 'Settings loaded from GitHub'
    }
  } catch (error: any) {
    return {
      success: false,
      settings: null,
      message: `Failed to load settings from GitHub: ${error.message}`
    }
  }
}

// Load platforms from GitHub
export const loadPlatformsFromGitHub = async (): Promise<{ success: boolean; platforms: any[] | null; message: string }> => {
  try {
    const config = getGitHubConfig()
    if (!config) {
      return {
        success: false,
        platforms: null,
        message: 'GitHub configuration not found'
      }
    }
    
    const fileContent = await getFileContent(config)
    
    if (!fileContent || !fileContent.content) {
      return {
        success: false,
        platforms: null,
        message: 'Platforms file not found on GitHub'
      }
    }

    const platforms = JSON.parse(fileContent.content)
    
    return {
      success: true,
      platforms: Array.isArray(platforms) ? platforms : [],
      message: 'Platforms loaded from GitHub'
    }
  } catch (error: any) {
    return {
      success: false,
      platforms: null,
      message: `Failed to load platforms from GitHub: ${error.message}`
    }
  }
}

