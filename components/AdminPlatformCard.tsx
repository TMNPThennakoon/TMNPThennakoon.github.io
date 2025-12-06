'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Edit, Trash2, ExternalLink, Star, StarOff } from 'lucide-react'
import { type Platform } from '@/lib/platforms'
import { convertImageUrl, getGoogleDriveAlternatives } from '@/lib/imageUtils'

interface AdminPlatformCardProps {
  platform: Platform
  onEdit: (platform: Platform) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Platform>) => void
  isSelected?: boolean
}

export default function AdminPlatformCard({
  platform,
  onEdit,
  onDelete,
  onUpdate,
  isSelected = false,
}: AdminPlatformCardProps) {
  // Convert image URL (especially for Google Drive)
  const processedImageUrl = platform.imageUrl ? convertImageUrl(platform.imageUrl) : ''
  
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [currentImageUrl, setCurrentImageUrl] = useState(processedImageUrl || '')
  const [alternativeIndex, setAlternativeIndex] = useState(0)
  const [alternativeUrls, setAlternativeUrls] = useState<string[]>([])

  useEffect(() => {
    if (processedImageUrl) {
      setCurrentImageUrl(processedImageUrl)
      setAlternativeIndex(0)
      setImageError(false)
      setImageLoading(true)
      // If it's a Google Drive URL, get alternative URLs for fallback
      if (processedImageUrl.includes('drive.google.com') && processedImageUrl.includes('id=')) {
        const fileIdMatch = processedImageUrl.match(/id=([a-zA-Z0-9_-]+)/)
        if (fileIdMatch) {
          setAlternativeUrls(getGoogleDriveAlternatives(fileIdMatch[1]))
        }
      } else {
        setAlternativeUrls([])
      }
    } else {
      setCurrentImageUrl('')
      setImageError(false)
      setImageLoading(false)
    }
  }, [processedImageUrl])

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
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col border transition-all duration-300 ${
        isSelected 
          ? 'border-blue-500/50 ring-2 ring-blue-500/30' 
          : 'border-gray-700/50 hover:border-blue-500/50'
      }`}
    >
      {/* Image */}
      <div className="relative h-56 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        {!currentImageUrl || currentImageUrl.startsWith('/') || imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-3xl font-bold opacity-50">
              {platform.name.charAt(0)}
            </span>
          </div>
        ) : (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center z-10">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              key={currentImageUrl}
              src={currentImageUrl}
              alt={platform.name}
              className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => {
                setImageLoading(false)
                setImageError(false)
              }}
              onError={() => {
                if (alternativeIndex < alternativeUrls.length - 1) {
                  tryNextAlternative()
                } else {
                  setImageError(true)
                  setImageLoading(false)
                }
              }}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-100 flex-1 pr-2 line-clamp-2">
            {platform.name}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onUpdate(platform.id, { featured: !platform.featured })
            }}
            className="ml-2 p-1.5 hover:bg-gray-800/50 rounded-lg transition-colors flex-shrink-0"
          >
            {platform.featured ? (
              <Star size={20} className="text-yellow-500 fill-yellow-500" />
            ) : (
              <StarOff size={20} className="text-gray-400" />
            )}
          </button>
        </div>

        <span className="inline-block px-3 py-1.5 text-xs font-semibold text-blue-400 bg-blue-500/20 rounded-full mb-4 border border-blue-500/30">
          {platform.category}
        </span>

        <p className="text-gray-300 text-sm mb-6 line-clamp-2 flex-1">
          {platform.description}
        </p>

        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-700/50">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onEdit(platform)
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            <Edit size={16} />
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              window.open(platform.url, '_blank')
            }}
            className="px-4 py-2.5 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 border border-gray-700/50 transition-colors"
          >
            <ExternalLink size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onDelete(platform.id)
            }}
            className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

