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
  message: string = 'Update platforms data'
): Promise<boolean> => {
  const config = getGitHubConfig()
  if (!config) {
    throw new Error('GitHub configuration not found. Please configure GitHub sync in admin settings.')
  }

  try {
    // Get existing file to get SHA (for update) or create new
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

