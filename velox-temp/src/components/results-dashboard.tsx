import { motion } from 'framer-motion'
import {
  Download, Share2, Zap, Target, Shield, Users, Search
} from 'lucide-react'
import type { WebsiteAnalysisResult } from '@/lib/api-client'

interface ResultsDashboardProps {
  result: WebsiteAnalysisResult
  onExport?: () => void
  onShare?: () => void
}

export function ResultsDashboard({ result, onExport, onShare }: ResultsDashboardProps) {
  const statusColors = {
    critical: { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400' },
    weak: { bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-400' },
    functional: { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400' },
    optimized: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/50', text: 'text-emerald-400' },
  }

  const colors = statusColors[result.status]

  const categoryMetrics = [
    {
      name: 'Technical',
      value: Math.round(Object.values(result.technical).reduce((a, b) => a + b) / Object.keys(result.technical).length),
      icon: Zap,
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
    },
    {
      name: 'SEO',
      value: Math.round(Object.values(result.seo).reduce((a, b) => a + b) / Object.keys(result.seo).length),
      icon: Search,
      color: 'text-purple-400',
      bg: 'bg-purple-500/20',
    },
    {
      name: 'UX',
      value: Math.round(Object.values(result.ux).reduce((a, b) => a + b) / Object.keys(result.ux).length),
      icon: Users,
      color: 'text-pink-400',
      bg: 'bg-pink-500/20',
    },
    {
      name: 'Conversion',
      value: Math.round(Object.values(result.conversion).reduce((a, b) => a + b) / Object.keys(result.conversion).length),
      icon: Target,
      color: 'text-orange-400',
      bg: 'bg-orange-500/20',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Analysis Results</h2>
          <p className="text-gray-400">{result.url}</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={onExport}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white font-medium"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={onShare}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-500/50 rounded-lg transition-all text-white font-medium"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Main Score Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-8 mb-6`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Score Circle */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-white/10"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(result.rvs / 100) * 2 * Math.PI * 90} ${2 * Math.PI * 90}`}
                  className={colors.text}
                  style={{
                    transition: 'stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`text-6xl font-bold ${colors.text}`}>{result.rvs}</div>
                <div className="text-sm text-gray-400 mt-2">Revenue Score</div>
              </div>
            </div>
            <p className="text-lg font-semibold mt-6 capitalize text-white">
              Status: <span className={colors.text}>{result.status.toUpperCase()}</span>
            </p>
          </div>

          {/* Key Metrics */}
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Monthly Revenue Loss</p>
              <p className="text-3xl font-bold text-red-400">${result.monthlyLoss.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Due to optimization gaps</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Annual Revenue Loss</p>
              <p className="text-3xl font-bold text-red-400">${result.annualLoss.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Potential revenue recovery</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Analysis Date</p>
              <p className="text-lg font-semibold text-white">
                {new Date(result.timestamp).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Scores */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Category Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryMetrics.map((category, index) => {
            const Icon = category.icon
            const scoreStatus =
              category.value >= 75 ? 'text-emerald-400' :
              category.value >= 50 ? 'text-blue-400' :
              category.value >= 25 ? 'text-orange-400' : 'text-red-400'

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${category.bg}`}>
                    <Icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <span className={`text-2xl font-bold ${scoreStatus}`}>{category.value}</span>
                </div>
                <h4 className="font-semibold text-white mb-2">{category.name}</h4>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.value}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    className={`h-full ${
                      category.value >= 75 ? 'bg-emerald-500' :
                      category.value >= 50 ? 'bg-blue-500' :
                      category.value >= 25 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Detailed Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technical Metrics */}
        <div className="border border-white/10 rounded-xl p-6 bg-white/5">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" />
            Technical Metrics
          </h3>
          <div className="space-y-3">
            {Object.entries(result.technical).slice(0, 5).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${Math.min(100, value)}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-blue-400 w-10 text-right">
                    {Math.round(value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authority Metrics */}
        <div className="border border-white/10 rounded-xl p-6 bg-white/5">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            Authority Metrics
          </h3>
          <div className="space-y-3">
            {Object.entries(result.authority).slice(0, 5).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500"
                      style={{ width: `${Math.min(100, value)}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-emerald-400 w-10 text-right">
                    {Math.round(value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-lg p-4"
        >
          <p className="text-xs text-gray-500 mb-2">CRITICAL ISSUES</p>
          <p className="text-3xl font-bold text-red-400">
            {result.recommendations.filter(r => r.urgency === 'critical').length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/5 border border-white/10 rounded-lg p-4"
        >
          <p className="text-xs text-gray-500 mb-2">HIGH PRIORITY</p>
          <p className="text-3xl font-bold text-orange-400">
            {result.recommendations.filter(r => r.urgency === 'high').length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-lg p-4"
        >
          <p className="text-xs text-gray-500 mb-2">AVG. ROI POTENTIAL</p>
          <p className="text-3xl font-bold text-emerald-400">
            ${Math.round(result.recommendations.reduce((a, b) => a + b.roi, 0) / result.recommendations.length)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/5 border border-white/10 rounded-lg p-4"
        >
          <p className="text-xs text-gray-500 mb-2">TOTAL RECOMMENDATIONS</p>
          <p className="text-3xl font-bold text-blue-400">{result.recommendations.length}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
