import { motion } from 'framer-motion'
import { ChevronRight, Zap, AlertTriangle, TrendingUp, Clock, Target, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import type { Recommendation } from '@/lib/api-client'

interface RecommendationCardProps {
  recommendation: Recommendation
  index: number
}

export function RecommendationCard({ recommendation, index }: RecommendationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const urgencyColors = {
    critical: { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400' },
    high: { bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-400' },
    medium: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400' },
    low: { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400' },
  }

  const colors = urgencyColors[recommendation.urgency]



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}>
              <Zap className={`w-5 h-5 ${colors.text}`} />
            </div>
            <span className={`text-xs font-bold uppercase ${colors.text}`}>
              {recommendation.urgency} Priority
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">{recommendation.title}</h3>
          <p className="text-sm text-gray-400">{recommendation.description}</p>
        </div>
        <motion.button
          animate={{ rotate: isExpanded ? 90 : 0 }}
          className="ml-4 p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </motion.button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {/* Impact */}
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-gray-500 uppercase">Impact</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">{recommendation.impact}%</div>
          <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${recommendation.impact}%` }} />
          </div>
        </div>

        {/* Effort */}
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-500 uppercase">Effort</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">{recommendation.effort}%</div>
          <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${recommendation.effort}%` }} />
          </div>
        </div>

        {/* ROI */}
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-gray-500 uppercase">Est. ROI</span>
          </div>
          <div className="text-2xl font-bold text-orange-400">${recommendation.roi}</div>
          <div className="text-xs text-gray-500 mt-2">per month</div>
        </div>
      </div>

      {/* Implementation Time */}
      <div className="mb-4 text-sm text-gray-400">
        <span className="font-semibold">Estimated time:</span> {recommendation.estimatedTimeToImplement}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-white/10 pt-4 space-y-4"
        >
          {/* Implementation Steps */}
          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              Implementation Steps
            </h4>
            <ol className="space-y-2">
              {recommendation.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-300 mt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-3">Helpful Resources</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recommendation.resources.map((resource, i) => (
                <a
                  key={i}
                  href="#"
                  className="group/resource flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-sm text-gray-300 group-hover/resource:text-white transition-colors">
                    {resource}
                  </span>
                  <ExternalLink className="w-3 h-3 text-gray-600 group-hover/resource:text-gray-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              // In a real app, this would navigate to implementation guide
            }}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all text-center"
          >
            View Implementation Guide
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
