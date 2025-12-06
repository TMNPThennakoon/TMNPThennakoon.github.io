'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { getGitHubConfig, saveGitHubConfig, testGitHubConnection, type GitHubConfig } from '@/lib/githubSync'

interface GitHubSyncModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export default function GitHubSyncModal({ isOpen, onClose, onSave }: GitHubSyncModalProps) {
  const [formData, setFormData] = useState<GitHubConfig>({
    token: '',
    owner: '',
    repo: '',
    branch: 'main',
    filePath: 'data/platforms.json',
  })
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const config = getGitHubConfig()
      if (config) {
        setFormData(config)
      }
    }
  }, [isOpen])

  const handleTest = async () => {
    setTesting(true)
    setTestResult(null)
    
    try {
      const result = await testGitHubConnection(formData)
      setTestResult(result)
    } catch (error: any) {
      setTestResult({
        success: false,
        message: `Error: ${error.message}`
      })
    } finally {
      setTesting(false)
    }
  }

  const handleSave = async () => {
    if (!formData.token || !formData.owner || !formData.repo) {
      setTestResult({
        success: false,
        message: 'Please fill in all required fields'
      })
      return
    }

    setSaving(true)
    try {
      saveGitHubConfig(formData)
      onSave()
      onClose()
    } catch (error: any) {
      setTestResult({
        success: false,
        message: `Error saving configuration: ${error.message}`
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Github className="text-blue-400" size={24} />
                <h2 className="text-2xl font-bold text-white">
                  GitHub Sync Configuration
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Info Box */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-300">
                  <strong className="text-blue-400">How to get a GitHub Token:</strong>
                  <br />
                  1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
                  <br />
                  2. Generate new token with <code className="bg-gray-800 px-1 rounded">repo</code> permissions
                  <br />
                  3. Copy the token and paste it below
                </p>
              </div>

              {/* Token */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  GitHub Personal Access Token *
                </label>
                <input
                  type="password"
                  value={formData.token}
                  onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  required
                />
              </div>

              {/* Owner */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Repository Owner (Username/Organization) *
                </label>
                <input
                  type="text"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder="your-username"
                  required
                />
              </div>

              {/* Repo */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Repository Name *
                </label>
                <input
                  type="text"
                  value={formData.repo}
                  onChange={(e) => setFormData({ ...formData, repo: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder="platform-dashboard"
                  required
                />
              </div>

              {/* Branch */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Branch Name
                </label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder="main"
                />
              </div>

              {/* File Path */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  File Path (in repository)
                </label>
                <input
                  type="text"
                  value={formData.filePath}
                  onChange={(e) => setFormData({ ...formData, filePath: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder="data/platforms.json"
                />
                <p className="mt-2 text-xs text-gray-400">
                  The file will be created automatically if it doesn't exist
                </p>
              </div>

              {/* Test Result */}
              {testResult && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border flex items-start gap-3 ${
                    testResult.success
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                  ) : (
                    <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                  )}
                  <p className={`text-sm ${testResult.success ? 'text-green-300' : 'text-red-300'}`}>
                    {testResult.message}
                  </p>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTest}
                  disabled={testing || !formData.token || !formData.owner || !formData.repo}
                  className="flex-1 px-6 py-3 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-800/70 border border-gray-700/50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {testing ? (
                    <>
                      <Loader className="animate-spin" size={18} />
                      Testing...
                    </>
                  ) : (
                    <>
                      <Github size={18} />
                      Test Connection
                    </>
                  )}
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-blue-600/80 backdrop-blur-xl text-white rounded-lg hover:bg-blue-700/80 border border-blue-500/50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader className="animate-spin" size={18} />
                      Saving...
                    </>
                  ) : (
                    'Save Configuration'
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

