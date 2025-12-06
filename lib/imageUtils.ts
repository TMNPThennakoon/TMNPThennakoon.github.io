/**
 * Converts Google Drive URLs to direct image URLs
 * Supports various Google Drive URL formats
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url || !url.includes('drive.google.com')) {
    return url
  }

  // Extract file ID from different Google Drive URL formats
  let fileId = ''

  // Format 1: https://drive.google.com/file/d/FILE_ID/view (with or without query params)
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) {
    fileId = fileMatch[1]
  }

  // Format 2: https://drive.google.com/open?id=FILE_ID
  if (!fileId) {
    const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (openMatch) {
      fileId = openMatch[1]
    }
  }

  // Format 3: https://drive.google.com/uc?id=FILE_ID
  if (!fileId) {
    const ucMatch = url.match(/\/uc\?id=([a-zA-Z0-9_-]+)/)
    if (ucMatch) {
      fileId = ucMatch[1]
    }
  }

  // Format 4: Direct file ID in URL (fallback)
  if (!fileId) {
    const directMatch = url.match(/([a-zA-Z0-9_-]{25,})/)
    if (directMatch) {
      fileId = directMatch[1]
    }
  }

  if (fileId) {
    // Try multiple Google Drive image endpoints
    // Method 1: Standard export view (most reliable)
    return `https://drive.google.com/uc?export=view&id=${fileId}`
  }

  return url
}

/**
 * Gets alternative Google Drive image URLs (for fallback)
 */
export function getGoogleDriveAlternatives(fileId: string): string[] {
  return [
    `https://drive.google.com/uc?export=view&id=${fileId}`,
    `https://drive.google.com/uc?export=download&id=${fileId}`,
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
    `https://lh3.googleusercontent.com/d/${fileId}=w1000`,
  ]
}

/**
 * Converts various image hosting URLs to direct image URLs
 */
export function convertImageUrl(url: string): string {
  if (!url) return url

  // Google Drive
  if (url.includes('drive.google.com')) {
    return convertGoogleDriveUrl(url)
  }

  // Dropbox - convert to direct link
  if (url.includes('dropbox.com')) {
    // Convert ?dl=0 to ?raw=1 for direct image access
    return url.replace('?dl=0', '?raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com')
  }

  // OneDrive - convert sharing link to direct link
  if (url.includes('onedrive.live.com') || url.includes('1drv.ms')) {
    // OneDrive requires special handling - return as is for now
    // Users should use direct image URLs for OneDrive
    return url
  }

  // Imgur - ensure direct image link
  if (url.includes('imgur.com')) {
    // Convert album/gallery links to direct image
    if (url.includes('/a/') || url.includes('/gallery/')) {
      return url // Can't convert albums automatically
    }
    // Ensure .jpg extension for direct access
    if (!url.includes('.') && !url.endsWith('/')) {
      return `${url}.jpg`
    }
  }

  // Return original URL if no conversion needed
  return url
}

/**
 * Checks if URL is a valid image URL
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false
  
  // Check if it's a valid URL
  try {
    new URL(url)
  } catch {
    return false
  }

  // Check for common image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp']
  const hasImageExtension = imageExtensions.some(ext => 
    url.toLowerCase().includes(ext)
  )

  // If it's a known image hosting service, consider it valid
  const imageHosts = [
    'drive.google.com',
    'dropbox.com',
    'imgur.com',
    'i.imgur.com',
    'cloudinary.com',
    'unsplash.com',
    'pexels.com',
    'github.com',
    'raw.githubusercontent.com',
  ]

  const isImageHost = imageHosts.some(host => url.includes(host))

  return hasImageExtension || isImageHost
}

