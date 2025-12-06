'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Filter, SortAsc, X } from 'lucide-react'
import { getPlatforms, getPlatformsSync, type Platform } from '@/lib/platforms'
import { getSettings, getSettingsSync } from '@/lib/settings'
import PlatformCard from '@/components/PlatformCard'
import BackgroundAnimation from '@/components/BackgroundAnimation'
import Footer from '@/components/Footer'
import FloatingParticles from '@/components/FloatingParticles'

type SortOption = 'name' | 'date' | 'category' | 'views'

export default function Home() {
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({})
  const [settings, setSettings] = useState(getSettingsSync())
  const router = useRouter()

  // Load settings from GitHub on mount and reload when they change
  useEffect(() => {
    const loadSettings = async () => {
      const loadedSettings = await getSettings()
      setSettings(loadedSettings)
    }
    
    loadSettings()
    
    const handleStorageChange = () => {
      loadSettings()
    }
    window.addEventListener('storage', handleStorageChange)
    
    // Check for settings updates periodically
    const interval = setInterval(() => {
      loadSettings()
    }, 2000)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    // Check for admin access via hash
    const checkHash = () => {
      const hash = window.location.hash
      if (hash === '#NPT@1009/dasboard' || hash === '#NPT@1009/dashboard') {
        // Store hash access in sessionStorage before redirecting
        sessionStorage.setItem('admin_hash_access', 'true')
        // Redirect to admin page
        window.location.href = '/admin'
        return
      }
    }

    // Small delay to ensure hash is available
    const timer = setTimeout(() => {
      checkHash()
    }, 100)
    
    // Listen for hash changes
    window.addEventListener('hashchange', checkHash)

    // Load platforms (sync for initial render, then async from GitHub)
    const initialPlatforms = getPlatformsSync()
    setPlatforms(initialPlatforms)
    
    // Then try to load from GitHub
    const loadPlatforms = async () => {
      const loadedPlatforms = await getPlatforms()
      setPlatforms(loadedPlatforms)
    }
    loadPlatforms()

    // Load view counts from localStorage
    const storedViews = localStorage.getItem('platform_views')
    if (storedViews) {
      setViewCounts(JSON.parse(storedViews))
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('hashchange', checkHash)
    }
  }, [router])

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = new Set(platforms.map(p => p.category))
    return Array.from(cats).sort()
  }, [platforms])

  // Filter and sort platforms
  const filteredAndSortedPlatforms = useMemo(() => {
    let filtered = platforms.filter(platform => {
      const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           platform.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           platform.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || platform.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort platforms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'category':
          return a.category.localeCompare(b.category)
        case 'views':
          return (viewCounts[b.id] || 0) - (viewCounts[a.id] || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [platforms, searchQuery, selectedCategory, sortBy, viewCounts])

  const featuredPlatforms = filteredAndSortedPlatforms.filter(p => p.featured)
  const otherPlatforms = filteredAndSortedPlatforms.filter(p => !p.featured)

  return (
    <main className="min-h-screen relative bg-black">
      <BackgroundAnimation backgroundStyle={settings.backgroundStyle} />
      {settings.enableParticles && <FloatingParticles />}
      
      <div className="relative z-20 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <h1 className="flex items-center justify-center gap-0 text-6xl md:text-8xl font-bold leading-none select-none">
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    textShadow: [
                      "0 0 0px rgba(255, 255, 255, 0)",
                      "0 0 10px rgba(255, 255, 255, 0.5)",
                      "0 0 0px rgba(255, 255, 255, 0)"
                    ]
                  }}
                  transition={{ 
                    opacity: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                    x: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                    textShadow: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 1.5
                    }
                  }}
                  className="text-white dark:text-white tracking-tight font-extrabold"
                >
                  {settings.dashboardName}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5, x: 50 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: 0,
                    y: [0, -12, 0],
                    boxShadow: [
                      "0 0 0px rgba(255, 140, 0, 0)",
                      "0 0 20px rgba(255, 140, 0, 0.8)",
                      "0 0 0px rgba(255, 140, 0, 0)"
                    ]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.5 },
                    scale: { duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 },
                    x: { duration: 0.6, delay: 0.5 },
                    y: {
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 1
                    },
                    boxShadow: {
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 1
                    }
                  }}
                  className="bg-[#FF8C00] text-black px-6 py-3.5 rounded-lg font-extrabold ml-0.5 inline-block relative"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  >
                    {settings.dashboardSubtitle}
                  </motion.span>
                </motion.span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="text-xl md:text-2xl text-gray-300 dark:text-gray-300 font-medium"
            >
              {settings.dashboardDescription}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              className="mt-4 text-gray-400 dark:text-gray-400"
            >
              <motion.span
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Discover, access, and manage all your favorite platforms in one beautiful place
              </motion.span>
            </motion.div>
          </div>
        </motion.header>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12 max-w-6xl mx-auto"
        >
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search platforms by name, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Category Filter and Sort */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 flex-1">
                <Filter className="text-gray-400 mt-2" size={18} />
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-blue-500/30 text-blue-400 border border-blue-500/50'
                      : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600 hover:text-gray-300'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-500/30 text-blue-400 border border-blue-500/50'
                        : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600 hover:text-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <SortAsc className="text-gray-400" size={18} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all cursor-pointer"
                >
                  <option value="name">Sort by Name</option>
                  <option value="date">Sort by Date</option>
                  <option value="category">Sort by Category</option>
                  <option value="views">Sort by Views</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-gray-400"
            >
              Showing {filteredAndSortedPlatforms.length} of {platforms.length} platforms
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Platforms */}
        {featuredPlatforms.length > 0 && (
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div 
                  className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-white dark:text-white"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  {settings.featuredSectionTitle}
                </motion.h2>
                <motion.div 
                  className="flex-1 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
              <motion.p 
                className="text-gray-400 dark:text-gray-400 ml-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {settings.featuredSectionSubtitle}
              </motion.p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPlatforms.map((platform, index) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="h-full"
                >
                  <PlatformCard 
                    platform={platform} 
                    viewCount={viewCounts[platform.id] || 0}
                    onView={() => {
                      const newCounts = { ...viewCounts }
                      newCounts[platform.id] = (newCounts[platform.id] || 0) + 1
                      setViewCounts(newCounts)
                      localStorage.setItem('platform_views', JSON.stringify(newCounts))
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Other Platforms */}
        {otherPlatforms.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div 
                  className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-white dark:text-white"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {settings.allPlatformsSectionTitle}
                </motion.h2>
                <motion.div 
                  className="flex-1 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.9 }}
                />
              </div>
              <motion.p 
                className="text-gray-400 dark:text-gray-400 ml-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                {settings.allPlatformsSectionSubtitle}
              </motion.p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPlatforms.map((platform, index) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5 + index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="h-full"
                >
                  <PlatformCard 
                    platform={platform} 
                    viewCount={viewCounts[platform.id] || 0}
                    onView={() => {
                      const newCounts = { ...viewCounts }
                      newCounts[platform.id] = (newCounts[platform.id] || 0) + 1
                      setViewCounts(newCounts)
                      localStorage.setItem('platform_views', JSON.stringify(newCounts))
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {platforms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl">
              No platforms available yet. Add some in the admin dashboard!
            </p>
          </motion.div>
        )}

        {platforms.length > 0 && filteredAndSortedPlatforms.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/50"
          >
            <Search className="mx-auto mb-4 text-gray-500" size={48} />
            <p className="text-gray-400 text-xl mb-2">No platforms found</p>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or filter criteria
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="mt-4 px-6 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500/30 transition-all"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        )}
      </div>
      
      <Footer />
    </main>
  )
}

