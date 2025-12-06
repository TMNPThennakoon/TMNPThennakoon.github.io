'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Info } from 'lucide-react'
import { type Platform } from '@/lib/platforms'
import { convertImageUrl, getGoogleDriveAlternatives } from '@/lib/imageUtils'

interface AddPlatformModalProps {
  platform: Platform | null
  onClose: () => void
  onSave: (data: Omit<Platform, 'id' | 'createdAt'>) => void
}

function ImagePreview({ url }: { url: string }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const [alternativeIndex, setAlternativeIndex] = useState(0)
  const [alternativeUrls, setAlternativeUrls] = useState<string[]>([])
  const processedUrl = convertImageUrl(url)

  useEffect(() => {
    if (processedUrl) {
      setCurrentImageUrl(processedUrl)
      setAlternativeIndex(0)
      // If it's a Google Drive URL, get alternative URLs for fallback
      if (processedUrl.includes('drive.google.com') && processedUrl.includes('id=')) {
        const fileIdMatch = processedUrl.match(/id=([a-zA-Z0-9_-]+)/)
        if (fileIdMatch) {
          setAlternativeUrls(getGoogleDriveAlternatives(fileIdMatch[1]))
        }
      } else {
        setAlternativeUrls([])
      }
    }
  }, [processedUrl])

  const tryNextAlternative = () => {
    if (alternativeIndex < alternativeUrls.length - 1) {
      const nextIndex = alternativeIndex + 1
      setAlternativeIndex(nextIndex)
      setCurrentImageUrl(alternativeUrls[nextIndex])
      setImageError(false)
      setImageLoading(true)
    } else {
      setImageError(true)
      setImageLoading(false)
    }
  }

  return (
    <>
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {imageError ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Image preview unavailable</p>
        </div>
      ) : (
        <img
          src={currentImageUrl}
          alt="Preview"
          className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            if (alternativeUrls.length > 0) {
              tryNextAlternative()
            } else {
              setImageError(true)
              setImageLoading(false)
            }
          }}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      )}
    </>
  )
}

export default function AddPlatformModal({ platform, onClose, onSave }: AddPlatformModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    imageUrl: '',
    category: '',
    featured: false,
  })

  useEffect(() => {
    if (platform) {
      setFormData({
        name: platform.name,
        description: platform.description,
        url: platform.url,
        imageUrl: platform.imageUrl,
        category: platform.category,
        featured: platform.featured,
      })
    }
  }, [platform])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.url || !formData.description) {
      alert('Please fill in all required fields')
      return
    }
    onSave(formData)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {platform ? 'Edit Platform' : 'Add New Platform'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Platform Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., QR Bar Code Generator"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe your platform and its features..."
                required
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Platform URL *
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://your-platform.com"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg or Google Drive link"
              />
              
              {/* Help Text for Google Drive */}
              {formData.imageUrl && formData.imageUrl.includes('drive.google.com') && (
                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-blue-700 dark:text-blue-300">
                      <p className="font-semibold mb-1">Google Drive Image:</p>
                      <p>Make sure your Google Drive file is set to "Anyone with the link can view". The system will automatically convert your Google Drive URL to a direct image link.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Image Preview */}
              {formData.imageUrl && (
                <div className="mt-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                  <div className="relative w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                    <ImagePreview url={formData.imageUrl} />
                  </div>
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Tools, AI Tools, Utilities"
                required
              />
            </div>

            {/* Featured */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="featured" className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Featured Platform
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {platform ? 'Update Platform' : 'Add Platform'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

