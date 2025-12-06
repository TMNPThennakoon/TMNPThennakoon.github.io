'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getPlatforms, addPlatform, updatePlatform, deletePlatform, savePlatforms, type Platform } from '@/lib/platforms'
import AdminPlatformCard from '@/components/AdminPlatformCard'
import AddPlatformModal from '@/components/AddPlatformModal'
import AdminLogin from '@/components/AdminLogin'
import BackgroundAnimation from '@/components/BackgroundAnimation'
import FloatingParticles from '@/components/FloatingParticles'
import { ArrowLeft, Plus, LogOut, Search, Filter, Download, Upload, Trash2, Star, StarOff, X, Eye, Github, CheckCircle, AlertCircle, Loader, Settings } from 'lucide-react'
import GitHubSyncModal from '@/components/GitHubSyncModal'
import AdminSettingsModal from '@/components/AdminSettingsModal'
import { getGitHubConfig, syncPlatformsToGitHub } from '@/lib/githubSync'

export default function AdminPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set())
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({})
  const [showGitHubModal, setShowGitHubModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [syncStatus, setSyncStatus] = useState<{ syncing: boolean; lastSync: string | null; error: string | null }>({
    syncing: false,
    lastSync: null,
    error: null,
  })
  const [gitHubConfig, setGitHubConfig] = useState(getGitHubConfig())
  const router = useRouter()

  useEffect(() => {
    // Check if user came from hash route (stored in sessionStorage)
    const hashAccess = sessionStorage.getItem('admin_hash_access')
    
    // Check session storage for authentication
    const storedAuth = sessionStorage.getItem('admin_authenticated')
    
    if (hashAccess === 'true' && storedAuth === 'true') {
      // User has hash access and is authenticated
      setIsAuthenticated(true)
      const loadedPlatforms = getPlatforms()
      setPlatforms(loadedPlatforms)
      
      // Load view counts
      const storedViews = localStorage.getItem('platform_views')
      if (storedViews) {
        setViewCounts(JSON.parse(storedViews))
      }
      
      // Load GitHub config
      setGitHubConfig(getGitHubConfig())
      
      setCheckingAuth(false)
    } else if (hashAccess === 'true') {
      // User has hash access but not authenticated - show login
      setCheckingAuth(false)
    } else {
      // No hash access - redirect to home
      router.push('/')
    }
  }, [router])

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = new Set(platforms.map(p => p.category))
    return Array.from(cats).sort()
  }, [platforms])

  // Filter platforms
  const filteredPlatforms = useMemo(() => {
    return platforms.filter(platform => {
      const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           platform.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           platform.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || platform.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [platforms, searchQuery, selectedCategory])

  const handleLogin = () => {
    // Clear hash access flag after successful login
    sessionStorage.removeItem('admin_hash_access')
    setIsAuthenticated(true)
    setPlatforms(getPlatforms())
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    sessionStorage.removeItem('admin_username')
    setIsAuthenticated(false)
    router.push('/')
  }

  const handleAddPlatform = async (platformData: Omit<Platform, 'id' | 'createdAt'>) => {
    addPlatform(platformData)
    const updatedPlatforms = getPlatforms()
    setPlatforms(updatedPlatforms)
    setShowAddModal(false)
    
    // Auto-sync to GitHub
    if (gitHubConfig) {
      await syncToGitHub(updatedPlatforms, 'create')
    }
  }

  const handleUpdatePlatform = async (id: string, updates: Partial<Platform>) => {
    updatePlatform(id, updates)
    const updatedPlatforms = getPlatforms()
    setPlatforms(updatedPlatforms)
    setEditingPlatform(null)
    
    // Auto-sync to GitHub
    if (gitHubConfig) {
      await syncToGitHub(updatedPlatforms, 'update')
    }
  }

  const handleDeletePlatform = async (id: string) => {
    if (confirm('Are you sure you want to delete this platform?')) {
      deletePlatform(id)
      const updatedPlatforms = getPlatforms()
      setPlatforms(updatedPlatforms)
      setSelectedPlatforms(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
      
      // Auto-sync to GitHub
      if (gitHubConfig) {
        await syncToGitHub(updatedPlatforms, 'delete')
      }
    }
  }

  const handleEditPlatform = (platform: Platform) => {
    setEditingPlatform(platform)
    setShowAddModal(true)
  }

  const handleBulkDelete = async () => {
    if (selectedPlatforms.size === 0) return
    if (confirm(`Are you sure you want to delete ${selectedPlatforms.size} platform(s)?`)) {
      selectedPlatforms.forEach(id => deletePlatform(id))
      const updatedPlatforms = getPlatforms()
      setPlatforms(updatedPlatforms)
      setSelectedPlatforms(new Set())
      
      // Auto-sync to GitHub
      if (gitHubConfig) {
        await syncToGitHub(updatedPlatforms, 'delete')
      }
    }
  }

  const handleBulkToggleFeatured = async () => {
    if (selectedPlatforms.size === 0) return
    const firstPlatform = platforms.find(p => selectedPlatforms.has(p.id))
    const newFeaturedState = !firstPlatform?.featured
    
    selectedPlatforms.forEach(id => {
      updatePlatform(id, { featured: newFeaturedState })
    })
    const updatedPlatforms = getPlatforms()
    setPlatforms(updatedPlatforms)
    setSelectedPlatforms(new Set())
    
    // Auto-sync to GitHub
    if (gitHubConfig) {
      await syncToGitHub(updatedPlatforms, 'update')
    }
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(platforms, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `platforms-export-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      
      const reader = new FileReader()
      reader.onload = async (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string)
          if (Array.isArray(imported)) {
            if (confirm(`Import ${imported.length} platform(s)? This will replace all existing platforms.`)) {
              savePlatforms(imported)
              const updatedPlatforms = getPlatforms()
              setPlatforms(updatedPlatforms)
              
              // Auto-sync to GitHub
              if (gitHubConfig) {
                await syncToGitHub(updatedPlatforms, 'update')
              }
            }
          } else {
            alert('Invalid file format')
          }
        } catch (error) {
          alert('Error reading file: ' + error)
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const togglePlatformSelection = (id: string) => {
    setSelectedPlatforms(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const selectAll = () => {
    if (selectedPlatforms.size === filteredPlatforms.length) {
      setSelectedPlatforms(new Set())
    } else {
      setSelectedPlatforms(new Set(filteredPlatforms.map(p => p.id)))
    }
  }

  // Sync to GitHub function
  const syncToGitHub = async (platformsToSync: Platform[], action: 'create' | 'update' | 'delete' = 'update') => {
    if (!gitHubConfig) return

    setSyncStatus({ syncing: true, lastSync: null, error: null })
    
    try {
      const result = await syncPlatformsToGitHub(platformsToSync, action)
      
      if (result.success) {
        setSyncStatus({
          syncing: false,
          lastSync: new Date().toLocaleTimeString(),
          error: null,
        })
      } else {
        setSyncStatus({
          syncing: false,
          lastSync: null,
          error: result.message,
        })
      }
    } catch (error: any) {
      setSyncStatus({
        syncing: false,
        lastSync: null,
        error: error.message || 'Failed to sync to GitHub',
      })
    }
  }

  const handleGitHubConfigSave = () => {
    setGitHubConfig(getGitHubConfig())
    // Sync current platforms to GitHub
    if (platforms.length > 0) {
      syncToGitHub(platforms, 'update')
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      <BackgroundAnimation />
      <FloatingParticles />
      
      <div className="relative z-20 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-400">
                Manage your platforms and applications
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 backdrop-blur-xl text-white rounded-lg hover:bg-gray-700/80 border border-gray-700/50 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Dashboard
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/80 backdrop-blur-xl text-white rounded-lg hover:bg-red-700/80 border border-red-500/50 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettingsModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600/80 backdrop-blur-xl text-white rounded-lg hover:bg-purple-700/80 border border-purple-500/50 transition-colors font-semibold"
              >
                <Settings size={18} />
                Settings
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditingPlatform(null)
                  setShowAddModal(true)
                }}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600/80 backdrop-blur-xl text-white rounded-lg hover:bg-blue-700/80 border border-blue-500/50 transition-colors shadow-lg font-semibold"
              >
                <Plus size={18} />
                Add Platform
              </motion.button>
            </div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50"
            >
              <div className="text-gray-400 text-sm mb-1">Total Platforms</div>
              <div className="text-2xl font-bold text-white">{platforms.length}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50"
            >
              <div className="text-gray-400 text-sm mb-1">Featured</div>
              <div className="text-2xl font-bold text-blue-400">{platforms.filter(p => p.featured).length}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50"
            >
              <div className="text-gray-400 text-sm mb-1">Categories</div>
              <div className="text-2xl font-bold text-purple-400">{categories.length}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50"
            >
              <div className="text-gray-400 text-sm mb-1">Total Views</div>
              <div className="text-2xl font-bold text-pink-400">
                {Object.values(viewCounts).reduce((sum, count) => sum + count, 0)}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50"
            >
              <div className="text-gray-400 text-sm mb-1">Selected</div>
              <div className="text-2xl font-bold text-yellow-400">{selectedPlatforms.size}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50"
            >
              <div className="text-gray-400 text-sm mb-1">Filtered</div>
              <div className="text-2xl font-bold text-green-400">{filteredPlatforms.length}</div>
            </motion.div>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 mb-6"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
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
            </div>

            {/* Bulk Actions */}
            {selectedPlatforms.size > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-700/50"
              >
                <span className="text-gray-400 text-sm font-semibold">
                  {selectedPlatforms.size} selected:
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={selectAll}
                  className="px-3 py-1.5 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 text-sm border border-gray-700/50"
                >
                  {selectedPlatforms.size === filteredPlatforms.length ? 'Deselect All' : 'Select All'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBulkToggleFeatured}
                  className="px-3 py-1.5 bg-yellow-600/30 text-yellow-400 rounded-lg hover:bg-yellow-600/40 text-sm border border-yellow-500/50 flex items-center gap-1"
                >
                  <Star size={14} />
                  Toggle Featured
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 bg-red-600/30 text-red-400 rounded-lg hover:bg-red-600/40 text-sm border border-red-500/50 flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  Delete Selected
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPlatforms(new Set())}
                  className="px-3 py-1.5 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 text-sm border border-gray-700/50"
                >
                  Clear Selection
                </motion.button>
              </motion.div>
            )}

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-700/50 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                className="px-4 py-2 bg-green-600/30 text-green-400 rounded-lg hover:bg-green-600/40 text-sm border border-green-500/50 flex items-center gap-2"
              >
                <Download size={16} />
                Export JSON
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleImport}
                className="px-4 py-2 bg-purple-600/30 text-purple-400 rounded-lg hover:bg-purple-600/40 text-sm border border-purple-500/50 flex items-center gap-2"
              >
                <Upload size={16} />
                Import JSON
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGitHubModal(true)}
                className={`px-4 py-2 rounded-lg text-sm border flex items-center gap-2 ${
                  gitHubConfig
                    ? 'bg-blue-600/30 text-blue-400 border-blue-500/50 hover:bg-blue-600/40'
                    : 'bg-gray-700/30 text-gray-400 border-gray-600/50 hover:bg-gray-700/40'
                }`}
              >
                <Github size={16} />
                {gitHubConfig ? 'GitHub Sync' : 'Setup GitHub'}
              </motion.button>
              {gitHubConfig && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => syncToGitHub(platforms, 'update')}
                  disabled={syncStatus.syncing}
                  className="px-4 py-2 bg-orange-600/30 text-orange-400 rounded-lg hover:bg-orange-600/40 text-sm border border-orange-500/50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {syncStatus.syncing ? (
                    <>
                      <Loader className="animate-spin" size={16} />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Sync Now
                    </>
                  )}
                </motion.button>
              )}
            </div>

            {/* GitHub Sync Status */}
            {gitHubConfig && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 pt-4 border-t border-gray-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {syncStatus.syncing ? (
                      <Loader className="animate-spin text-blue-400" size={16} />
                    ) : syncStatus.error ? (
                      <AlertCircle className="text-red-400" size={16} />
                    ) : syncStatus.lastSync ? (
                      <CheckCircle className="text-green-400" size={16} />
                    ) : (
                      <Github className="text-gray-400" size={16} />
                    )}
                    <span className="text-sm text-gray-400">GitHub Sync:</span>
                  </div>
                  {syncStatus.syncing && (
                    <span className="text-sm text-blue-400">Syncing to GitHub...</span>
                  )}
                  {syncStatus.error && (
                    <span className="text-sm text-red-400">{syncStatus.error}</span>
                  )}
                  {syncStatus.lastSync && !syncStatus.syncing && (
                    <span className="text-sm text-green-400">
                      Last synced: {syncStatus.lastSync}
                    </span>
                  )}
                  {!syncStatus.syncing && !syncStatus.error && !syncStatus.lastSync && (
                    <span className="text-sm text-gray-500">Ready to sync</span>
                  )}
                  <div className="ml-auto text-xs text-gray-500">
                    {gitHubConfig.owner}/{gitHubConfig.repo}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.header>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlatforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="h-full relative"
            >
              {/* Selection Checkbox */}
              <div className="absolute top-4 left-4 z-20">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePlatformSelection(platform.id)
                  }}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    selectedPlatforms.has(platform.id)
                      ? 'bg-blue-500 border-blue-500'
                      : 'bg-gray-900/80 backdrop-blur-xl border-gray-600'
                  }`}
                >
                  {selectedPlatforms.has(platform.id) && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </motion.button>
              </div>

              {/* View Count Badge */}
              {viewCounts[platform.id] > 0 && (
                <div className="absolute top-4 right-4 z-20 bg-gray-900/90 backdrop-blur-xl px-2 py-1 rounded-lg border border-gray-700/50 flex items-center gap-1">
                  <Eye size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-300 font-semibold">{viewCounts[platform.id]}</span>
                </div>
              )}

              <AdminPlatformCard
                platform={platform}
                onEdit={handleEditPlatform}
                onDelete={handleDeletePlatform}
                onUpdate={handleUpdatePlatform}
                isSelected={selectedPlatforms.has(platform.id)}
              />
            </motion.div>
          ))}
        </div>

        {platforms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/50"
          >
            <p className="text-gray-400 text-xl mb-4">
              No platforms yet. Add your first platform!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-blue-600/80 backdrop-blur-xl text-white rounded-lg hover:bg-blue-700/80 border border-blue-500/50 transition-colors"
            >
              Add Platform
            </motion.button>
          </motion.div>
        )}

        {platforms.length > 0 && filteredPlatforms.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/50"
          >
            <Search className="mx-auto mb-4 text-gray-500" size={48} />
            <p className="text-gray-400 text-xl mb-2">No platforms found</p>
            <p className="text-gray-500 text-sm mb-4">
              Try adjusting your search or filter criteria
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="px-6 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500/30 transition-all"
              >
                Clear Filters
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Add/Edit Modal */}
        {showAddModal && (
          <AddPlatformModal
            platform={editingPlatform}
            onClose={() => {
              setShowAddModal(false)
              setEditingPlatform(null)
            }}
            onSave={editingPlatform
              ? (data) => handleUpdatePlatform(editingPlatform.id, data)
              : handleAddPlatform
            }
          />
        )}

        {/* GitHub Sync Modal */}
        <GitHubSyncModal
          isOpen={showGitHubModal}
          onClose={() => setShowGitHubModal(false)}
          onSave={handleGitHubConfigSave}
        />

        {/* Admin Settings Modal */}
        <AdminSettingsModal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          onSave={() => {
            // Settings saved, trigger reload to apply changes
            window.location.reload()
          }}
        />
      </div>
    </main>
  )
}

