'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight, Eye } from 'lucide-react'
import { convertImageUrl, getGoogleDriveAlternatives } from '@/lib/imageUtils'

interface PlatformCardProps {
  platform: {
    id: string
    name: string
    description: string
    url: string
    imageUrl: string
    category: string
  }
  viewCount?: number
  onView?: () => void
}

export default function PlatformCard({ platform, viewCount = 0, onView }: PlatformCardProps) {
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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        rotateY: 2,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.97 }}
      className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden cursor-pointer group h-full flex flex-col border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 relative"
      onClick={() => {
        if (onView) onView()
        window.open(platform.url, '_blank')
      }}
    >
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-20"
        initial={false}
        animate={{
          background: [
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)"
          ],
          x: ["-100%", "200%"]
        }}
        transition={{
          x: {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }
        }}
        style={{
          backgroundSize: "200% 100%"
        }}
      />
      
      {/* Image */}
      <div className="relative h-56 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
        {!currentImageUrl || currentImageUrl.startsWith('/') || currentImageUrl.startsWith('file://') || imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-4xl font-bold opacity-50">
              {platform.name.charAt(0)}
            </span>
          </div>
        ) : (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center z-10">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              key={currentImageUrl}
              src={currentImageUrl}
              alt={platform.name}
              className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
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
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"
          whileHover={{ opacity: 0.3 }}
        />
        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0
              }}
              animate={{
                y: [null, "-100%"],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col relative z-10">
        <div className="flex items-start justify-between mb-3">
          <motion.h3 
            className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors flex-1 pr-2 line-clamp-2"
            whileHover={{ scale: 1.02 }}
          >
            {platform.name}
          </motion.h3>
          <motion.div
            whileHover={{ rotate: 45, scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink
              size={20}
              className="text-gray-400 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-1"
            />
          </motion.div>
        </div>
        
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <motion.span 
            className="inline-block px-3 py-1.5 text-xs font-semibold text-blue-400 bg-blue-500/20 rounded-full border border-blue-500/30"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
          >
            {platform.category}
          </motion.span>
          {viewCount > 0 && (
            <motion.div
              className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 bg-gray-800/50 rounded-full border border-gray-700/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Eye size={12} />
              <span>{viewCount}</span>
            </motion.div>
          )}
        </div>
        
        <motion.p 
          className="text-gray-300 text-sm mb-6 line-clamp-3 flex-1"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {platform.description}
        </motion.p>

        <motion.div
          whileHover={{ x: 8 }}
          className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50 group-hover:border-blue-500/50 transition-colors"
        >
          <motion.span 
            className="text-blue-400 font-semibold text-sm"
            whileHover={{ scale: 1.05 }}
          >
            Open Platform
          </motion.span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowRight size={18} className="text-blue-400" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

