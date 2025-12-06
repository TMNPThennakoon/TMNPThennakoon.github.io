'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Settings, Palette, Type, Image as ImageIcon, Zap, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { getSettingsSync, saveSettings, type DashboardSettings } from '@/lib/settings'

interface AdminSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export default function AdminSettingsModal({ isOpen, onClose, onSave }: AdminSettingsModalProps) {
  const [settings, setSettings] = useState<DashboardSettings>(getSettings())
  const [activeTab, setActiveTab] = useState<'branding' | 'sections' | 'background' | 'animations'>('branding')

  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ success: boolean; message: string } | null>(null)

  useEffect(() => {
    if (isOpen) {
      setSettings(getSettingsSync())
      setSaveMessage(null)
    }
  }, [isOpen])

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage(null)
    
    try {
      const result = await saveSettings(settings, true)
      setSaveMessage(result)
      
      if (result.success) {
        setTimeout(() => {
          onSave()
          onClose()
        }, 1000)
      }
    } catch (error: any) {
      setSaveMessage({
        success: false,
        message: `Error: ${error.message}`
      })
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'branding' as const, label: 'Branding', icon: Type },
    { id: 'sections' as const, label: 'Sections', icon: ImageIcon },
    { id: 'background' as const, label: '3D Background', icon: Palette },
    { id: 'animations' as const, label: 'Animations', icon: Zap },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700/50 flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Settings className="text-blue-400" size={24} />
                <h2 className="text-2xl font-bold text-white">
                  Dashboard Settings
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700/50 bg-gray-800/30">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800/50'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Branding Tab */}
              {activeTab === 'branding' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Dashboard Name (First Part)
                    </label>
                    <input
                      type="text"
                      value={settings.dashboardName}
                      onChange={(e) => setSettings({ ...settings, dashboardName: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="Platform"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Dashboard Name (Second Part)
                    </label>
                    <input
                      type="text"
                      value={settings.dashboardSubtitle}
                      onChange={(e) => setSettings({ ...settings, dashboardSubtitle: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      placeholder="hub"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Main Description
                    </label>
                    <textarea
                      value={settings.dashboardDescription}
                      onChange={(e) => setSettings({ ...settings, dashboardDescription: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                      placeholder="Your Gateway to Powerful Tools & Platforms"
                    />
                  </div>
                </div>
              )}

              {/* Sections Tab */}
              {activeTab === 'sections' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Featured Section Title
                    </label>
                    <input
                      type="text"
                      value={settings.featuredSectionTitle}
                      onChange={(e) => setSettings({ ...settings, featuredSectionTitle: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Featured Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={settings.featuredSectionSubtitle}
                      onChange={(e) => setSettings({ ...settings, featuredSectionSubtitle: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      All Platforms Section Title
                    </label>
                    <input
                      type="text"
                      value={settings.allPlatformsSectionTitle}
                      onChange={(e) => setSettings({ ...settings, allPlatformsSectionTitle: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      All Platforms Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={settings.allPlatformsSectionSubtitle}
                      onChange={(e) => setSettings({ ...settings, allPlatformsSectionSubtitle: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Background Tab */}
              {activeTab === 'background' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      3D Background Style
                    </label>
                    <select
                      value={settings.backgroundStyle}
                      onChange={(e) => setSettings({ ...settings, backgroundStyle: e.target.value as DashboardSettings['backgroundStyle'] })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    >
                      <option value="grid-dots">Grid & Dots (Current)</option>
                      <option value="particles">Floating Particles</option>
                      <option value="waves">Animated Waves</option>
                      <option value="geometric">Geometric Shapes</option>
                      <option value="minimal">Minimal</option>
                    </select>
                    <p className="mt-2 text-xs text-gray-400">
                      Select a 3D background style. Changes will apply after saving and refreshing.
                    </p>
                  </div>
                </div>
              )}

              {/* Animations Tab */}
              {activeTab === 'animations' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Animation Speed
                    </label>
                    <select
                      value={settings.animationSpeed}
                      onChange={(e) => setSettings({ ...settings, animationSpeed: e.target.value as DashboardSettings['animationSpeed'] })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    >
                      <option value="slow">Slow</option>
                      <option value="normal">Normal</option>
                      <option value="fast">Fast</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Animation Intensity
                    </label>
                    <select
                      value={settings.animationIntensity}
                      onChange={(e) => setSettings({ ...settings, animationIntensity: e.target.value as DashboardSettings['animationIntensity'] })}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    >
                      <option value="subtle">Subtle</option>
                      <option value="moderate">Moderate</option>
                      <option value="intense">Intense</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div>
                      <label className="text-sm font-semibold text-gray-300">Enable Floating Particles</label>
                      <p className="text-xs text-gray-400 mt-1">Show animated particles in background</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, enableParticles: !settings.enableParticles })}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        settings.enableParticles ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.enableParticles ? 'translate-x-7' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div>
                      <label className="text-sm font-semibold text-gray-300">Enable Floating Elements</label>
                      <p className="text-xs text-gray-400 mt-1">Show floating geometric elements</p>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, enableFloatingElements: !settings.enableFloatingElements })}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        settings.enableFloatingElements ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.enableFloatingElements ? 'translate-x-7' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/50 px-6 py-4 flex gap-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-800/70 border border-gray-700/50 transition-colors font-semibold"
              >
                Cancel
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-blue-600/80 backdrop-blur-xl text-white rounded-lg hover:bg-blue-700/80 border border-blue-500/50 transition-colors font-semibold"
              >
                Save Settings
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

