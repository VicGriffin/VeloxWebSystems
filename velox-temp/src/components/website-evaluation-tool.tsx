import { useState, useEffect, useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  Zap, Globe, Lock, Unlock, Loader2, Target, MessageSquare, ArrowLeft
} from 'lucide-react'
import { analyzeWebsiteRealTime, type WebsiteAnalysisResult } from '@/lib/api-client'
import { RecommendationCard } from './recommendation-card'
import { ResultsDashboard } from './results-dashboard'

type AnalysisStage = 'idle' | 'validating' | 'crawling' | 'analyzing' | 'calculating' | 'complete'

const stageMessages: Record<AnalysisStage, { title: string; description: string }> = {
  idle: { title: 'Ready to Analyze', description: 'Enter your website URL to begin' },
  validating: { title: 'Validating URL', description: 'Checking URL format and accessibility' },
  crawling: { title: 'Analyzing Website', description: 'Fetching real-time performance data' },
  analyzing: { title: 'Processing Metrics', description: 'Evaluating technical and SEO metrics' },
  calculating: { title: 'Generating Insights', description: 'Computing Revenue Visibility Score' },
  complete: { title: 'Analysis Complete', description: 'Generating your comprehensive report' },
}

export function WebsiteEvaluationTool() {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [stage, setStage] = useState<AnalysisStage>('idle')
  const [progress, setProgress] = useState(0)
  const shouldResetProgress = useRef(false)
  const [result, setResult] = useState<WebsiteAnalysisResult | null>(null)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [emailError, setEmailError] = useState('')

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  // Progress simulation
  useEffect(() => {
    const stages: AnalysisStage[] = ['validating', 'crawling', 'analyzing', 'calculating']
    
    if (stage === 'idle' || stage === 'complete') {
      if (shouldResetProgress.current) {
        setProgress(0)
        shouldResetProgress.current = false
      }
      return
    }

    shouldResetProgress.current = true
    const stageIndex = stages.indexOf(stage)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          return 95
        }
        const speed = stageIndex * 12 + 12
        return Math.min(95, prev + 100 / speed)
      })
    }, 150)

    return () => {
      clearInterval(interval)
    }
  }, [stage])

  const startAnalysis = async () => {
    if (!isValidUrl(url)) {
      setEmailError('Please enter a valid URL (e.g., https://example.com)')
      return
    }

    setEmailError('')
    setResult(null)
    setShowEmailCapture(false)
    setIsPremium(false)

    const stages: AnalysisStage[] = ['validating', 'crawling', 'analyzing', 'calculating', 'complete']

    for (const s of stages) {
      setStage(s)
      if (s !== 'complete') {
        await new Promise((r) => setTimeout(r, 600 + Math.random() * 300))
      }
    }

    // Fetch real-time analysis data
    const analysisResult = await analyzeWebsiteRealTime(url)
    setResult(analysisResult)
    setProgress(100)
    setShowEmailCapture(true)
  }

  const captureEmail = () => {
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address')
      return
    }
    setEmailError('')
    setIsPremium(true)
  }

  const reset = () => {
    setUrl('')
    setEmail('')
    setStage('idle')
    setProgress(0)
    setResult(null)
    setShowEmailCapture(false)
    setIsPremium(false)
    setEmailError('')
  }

  const handleExport = () => {
    if (!result) return

    const reportData = {
      url: result.url,
      rvs: result.rvs,
      status: result.status,
      monthlyLoss: result.monthlyLoss,
      annualLoss: result.annualLoss,
      timestamp: new Date(result.timestamp).toISOString(),
      metrics: {
        technical: result.technical,
        seo: result.seo,
        ux: result.ux,
        conversion: result.conversion,
        analytics: result.analytics,
        authority: result.authority,
      },
      recommendations: result.recommendations,
    }

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(reportData, null, 2)))
    element.setAttribute('download', `velox-audit-${new Date().getTime()}.json`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleShare = () => {
    if (!result) return
    const shareUrl = `${window.location.origin}?audit=${btoa(result.url)}`
    navigator.clipboard.writeText(shareUrl)
    alert('Report link copied to clipboard!')
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] text-white">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Hero Section */}
          {!result && stage === 'idle' && (
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Uncover How Much Revenue{' '}
                <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                  Your Website Is Losing
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Our AI-powered analysis evaluates technical performance, SEO, UX, conversions, and authority
                to calculate your Revenue Visibility Score and identify exactly what's holding you back.
              </p>
            </motion.div>
          )}

          {/* URL Input */}
          {stage === 'idle' && !result && (
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
              <div className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-border-light)] transition-all">
                <label className="block text-sm font-medium text-gray-300 mb-3">Website URL</label>
                <div className="flex gap-3 flex-col sm:flex-row">
                  <div className="flex-1 relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-primary)]" />
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && startAnalysis()}
                      placeholder="https://yourwebsite.com"
                      className="w-full bg-[var(--color-bg-tertiary)] border-2 border-[var(--color-border)] rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] focus:bg-[var(--color-bg-tertiary)] transition-all"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startAnalysis}
                    className="px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[var(--color-accent)]/50 transition-all whitespace-nowrap"
                  >
                    Analyze Free
                  </motion.button>
                </div>
                {emailError && <p className="text-red-400 text-sm mt-3">{emailError}</p>}
                <p className="text-gray-500 text-sm mt-3">Analysis takes ~5 seconds • No credit card required</p>
              </div>
            </motion.div>
          )}

          {/* Analysis Progress */}
          {stage !== 'idle' && !result && (
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-8"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{stageMessages[stage].title}</h2>
                <p className="text-gray-400">{stageMessages[stage].description}</p>
              </motion.div>

              {/* Progress Bar */}
              <div className="bg-[var(--color-bg-tertiary)] rounded-full h-3 overflow-hidden mb-6">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Stage Indicators */}
              <div className="flex justify-center gap-2">
                {['validating', 'crawling', 'analyzing', 'calculating'].map((s) => (
                  <motion.div
                    key={s}
                    animate={{
                      scale: stage === (s as AnalysisStage) ? 1.2 : 1,
                      opacity: ['validating', 'crawling', 'analyzing', 'calculating'].indexOf(s) <= ['validating', 'crawling', 'analyzing', 'calculating'].indexOf(stage) ? 1 : 0.3,
                    }}
                    className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Results Dashboard */}
          {result && (
            <motion.div variants={itemVariants} className="space-y-8">
              {/* New Audit Button */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={reset}
                  className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  New Audit
                </motion.button>
              </div>

              {/* Main Dashboard */}
              <ResultsDashboard result={result} onExport={handleExport} onShare={handleShare} />

              {/* Email Capture */}
              {showEmailCapture && !isPremium && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 border-2 border-[var(--color-accent)] rounded-2xl p-8"
                >
                  <div className="max-w-2xl mx-auto text-center">
                    <Lock className="w-12 h-12 mx-auto mb-4 text-[var(--color-accent)]" />
                    <h3 className="text-2xl font-bold mb-3">Get Your Detailed Audit Report</h3>
                    <p className="text-gray-400 mb-6">
                      Enter your email to receive actionable insights, step-by-step implementation guides,
                      and resource recommendations tailored to your website.
                    </p>

                    <div className="flex gap-3 max-w-md mx-auto flex-col sm:flex-row">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && captureEmail()}
                        placeholder="your@email.com"
                        className="flex-1 bg-[var(--color-bg-tertiary)] border-2 border-[var(--color-border)] rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={captureEmail}
                        className="px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-lg font-semibold hover:shadow-lg transition-all whitespace-nowrap"
                      >
                        Unlock Report
                      </motion.button>
                    </div>
                    {emailError && <p className="text-red-400 text-sm mt-3">{emailError}</p>}
                  </div>
                </motion.div>
              )}

              {/* Premium Unlocked */}
              {isPremium && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-emerald-500/20 border-2 border-emerald-500 rounded-lg p-4 flex items-center gap-3"
                >
                  <Unlock className="w-6 h-6 text-emerald-400" />
                  <span className="font-medium text-emerald-400">
                    Full Report Unlocked! Check {email} for detailed analysis.
                  </span>
                </motion.div>
              )}

              {/* Recommendations */}
              {isPremium && result.recommendations.length > 0 && (
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                      Actionable Recommendations
                    </span>
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {result.recommendations.length} targeted improvements to maximize your revenue visibility
                  </p>
                  <div className="grid gap-4">
                    {result.recommendations.map((rec, index) => (
                      <RecommendationCard key={rec.id} recommendation={rec} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] border-2 border-[var(--color-border)] rounded-2xl p-8 text-center"
              >
                <h3 className="text-2xl font-bold mb-4">Ready to Capture Your Lost Revenue?</h3>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                  Our conversion optimization experts can help you implement these recommendations
                  and start seeing real results within weeks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Get Expert Consultation
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 border-2 border-[var(--color-border)] text-white rounded-lg font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Target className="w-4 h-4" />
                    View Implementation Guides
                  </motion.button>
                </div>
              </motion.div>

              {/* Another Analysis Button */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={reset}
                  className="px-6 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all font-medium"
                >
                  Analyze Another Website
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] mt-20 py-8 bg-gradient-to-t from-[var(--color-bg-secondary)] to-transparent">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            Velox Website Audit Tool • Powered by Real-Time Analytics • 
            <a href="#" className="text-gray-400 hover:text-white transition-colors ml-1">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
