"use client"

import { useState, useEffect } from "react"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  Search, Zap, Globe, FileText, Users, TrendingUp, 
  BarChart3, Lock, Unlock, AlertTriangle, CheckCircle2, 
  XCircle, ChevronRight, Loader2, Eye, Target, 
  Activity, Shield, MessageSquare, ArrowLeft
} from "lucide-react"

// Analysis categories with weights
const ANALYSIS_CATEGORIES = {
  technical: { name: "Technical Visibility", weight: 20, icon: Zap },
  search: { name: "Search Visibility", weight: 20, icon: Search },
  content: { name: "Content Clarity", weight: 15, icon: FileText },
  ux: { name: "User Experience", weight: 15, icon: Users },
  conversion: { name: "Conversion Infrastructure", weight: 20, icon: Target },
  analytics: { name: "Analytics Setup", weight: 5, icon: BarChart3 },
  authority: { name: "Authority Signals", weight: 5, icon: Shield },
}

type AnalysisStage = "idle" | "validating" | "crawling" | "analyzing" | "calculating" | "complete"

interface CategoryResult {
  score: number
  issues: string[]
  opportunities: string[]
}

interface EvaluationResult {
  url: string
  rvs: number
  status: "critical" | "weak" | "functional" | "optimized"
  monthlyLoss: number
  annualLoss: number
  categories: Record<string, CategoryResult>
  timestamp: Date
}

// Simulated analysis engine
function analyzeWebsite(url: string): Promise<EvaluationResult> {
  return new Promise((resolve) => {
    // Simulate realistic analysis delay
    setTimeout(() => {
      // Generate deterministic but realistic scores based on URL
      const urlHash = url.split("").reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)
      const baseScore = Math.abs(urlHash % 40) + 20 // Base 20-60 range
      
      const categories: Record<string, CategoryResult> = {}
      let totalWeightedScore = 0
      
      Object.entries(ANALYSIS_CATEGORIES).forEach(([key, cat]) => {
        const variation = Math.abs((urlHash * key.length) % 30)
        const score = Math.min(10, Math.max(1, baseScore + variation - 15))
        categories[key] = {
          score,
          issues: generateIssues(key, score),
          opportunities: generateOpportunities(key, score),
        }
        totalWeightedScore += score * cat.weight
      })
      
      const rvs = Math.round(totalWeightedScore / 100 * 10) // 0-100 scale
      
      // Calculate loss based on traffic estimation and conversion potential
      const trafficEstimate = estimateTraffic(url)
      const conversionLoss = trafficEstimate * 0.03 * rvs * 12 // Monthly visitors * conversion gap * RVS factor
      
      resolve({
        url,
        rvs,
        status: getStatus(rvs),
        monthlyLoss: Math.round(conversionLoss),
        annualLoss: Math.round(conversionLoss * 12),
        categories,
        timestamp: new Date(),
      })
    }, 4000) // 4 second analysis
  })
}

function getStatus(rvs: number): "critical" | "weak" | "functional" | "optimized" {
  if (rvs < 25) return "critical"
  if (rvs < 50) return "weak"
  if (rvs < 75) return "functional"
  return "optimized"
}

function estimateTraffic(url: string): number {
  // Simulated traffic estimation
  const hash = url.split("").reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)
  const traffic = [500, 1200, 3500, 8000, 15000, 35000, 75000, 150000]
  return traffic[Math.abs(hash) % traffic.length]
}

function generateIssues(category: string, score: number): string[] {
  if (score >= 7) return []
  
  const issuesByCategory: Record<string, string[]> = {
    technical: [
      "Page load time exceeds 3 seconds",
      "No image optimization detected",
      "Missing critical render-blocking resources",
      "Inadequate caching headers",
    ],
    search: [
      "Missing meta descriptions",
      "No structured data markup",
      "Poor keyword targeting",
      "Weak internal linking structure",
    ],
    content: [
      "Weak headline optimization",
      "No clear value proposition above fold",
      "Insufficient social proof",
      "Content depth below industry average",
    ],
    ux: [
      "Navigation clarity issues",
      "Mobile experience suboptimal",
      "Form friction points detected",
      "No clear call-to-action hierarchy",
    ],
    conversion: [
      "No exit-intent mechanisms",
      "Limited trust signals",
      "Checkout flow abandonment points",
      "Missing retargeting infrastructure",
    ],
    analytics: [
      "No conversion tracking",
      "Missing goal funnel setup",
      "No UTM parameter tracking",
      "Analytics code not properly installed",
    ],
    authority: [
      "Weak backlink profile",
      "No brand mentions detected",
      "Limited industry recognition",
      "Missing expert endorsements",
    ],
  }
  
  return issuesByCategory[category]?.slice(0, 3 - Math.floor(score / 4)) || []
}

function generateOpportunities(category: string, score: number): string[] {
  if (score >= 8) return ["Already performing at elite level"]
  
  const oppByCategory: Record<string, string[]> = {
    technical: [
      "Implement lazy loading for media",
      "Enable Brotli compression",
      "Deploy CDN for global reach",
      "Optimize Critical Rendering Path",
    ],
    search: [
      "Implement Schema.org markup",
      "Optimize for featured snippets",
      "Build topic cluster content",
      "Optimize for voice search",
    ],
    content: [
      "A/B test headline variations",
      "Add video testimonials",
      "Implement social proof widgets",
      "Create interactive calculators",
    ],
    ux: [
      "Simplify navigation structure",
      "Implement progressive disclosure",
      "Add micro-interactions",
      "Optimize touch targets for mobile",
    ],
    conversion: [
      "Implement sticky header CTA",
      "Add scroll-triggered popups",
      "Create abandoned cart sequences",
      "Implement live chat support",
    ],
    analytics: [
      "Set up event tracking",
      "Configure goal conversions",
      "Implement heatmaps",
      "Set up custom dashboards",
    ],
    authority: [
      "Launch PR campaign",
      "Build industry partnerships",
      "Create proprietary research",
      "Implement guest posting strategy",
    ],
  }
  
  return oppByCategory[category]?.slice(0, 4 - Math.floor(score / 3)) || []
}

// Analysis Stages Display
const stageMessages: Record<AnalysisStage, { title: string; description: string }> = {
  idle: { title: "Ready to Analyze", description: "Enter your website URL to begin" },
  validating: { title: "Validating URL", description: "Checking URL format and accessibility" },
  crawling: { title: "Crawling Website", description: "Mapping pages and resources" },
  analyzing: { title: "Analyzing Performance", description: "Evaluating technical metrics" },
  calculating: { title: "Calculating Score", description: "Computing Revenue Visibility Score" },
  complete: { title: "Analysis Complete", description: "Generating your report" },
}

// Score Circle Component
function ScoreCircle({ score, status }: { score: number; status: string }) {
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (score / 100) * circumference
  
  const colors: Record<string, string> = {
    critical: "#ef4444",
    weak: "#f59e0b",
    functional: "#3b82f6",
    optimized: "#10b981",
  }
  
  return (
    <div className="relative w-32 h-32">
      <svg className="w-32 h-32 transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-800"
        />
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke={colors[status]}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color: colors[status] }}>
          {score}
        </span>
      </div>
    </div>
  )
}

// Category Card Component
function CategoryCard({ 
  category, 
  result, 
  isLocked = false 
}: { 
  category: string
  result: CategoryResult
  isLocked?: boolean
}) {
  const cat = ANALYSIS_CATEGORIES[category as keyof typeof ANALYSIS_CATEGORIES]
  const Icon = cat?.icon || Zap
  
  const scoreColor = result.score >= 7 ? "text-emerald-500" : 
                    result.score >= 4 ? "text-amber-500" : "text-red-500"
  
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${result.score >= 7 ? 'bg-emerald-500/20' : result.score >= 4 ? 'bg-amber-500/20' : 'bg-red-500/20'}`}>
            <Icon className={`w-5 h-5 ${scoreColor}`} />
          </div>
          <div>
            <h4 className="font-semibold text-white">{cat?.name}</h4>
            <span className="text-xs text-gray-500">{cat?.weight}% weight</span>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-bold ${scoreColor}`}>{result.score}</span>
          <span className="text-gray-500 text-sm">/10</span>
        </div>
      </div>
      
      {isLocked ? (
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <Lock className="w-5 h-5 mx-auto mb-2 text-gray-500" />
          <p className="text-sm text-gray-400">Unlock to see detailed analysis</p>
        </div>
      ) : (
        <>
          {result.issues.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium text-red-400 mb-2">ISSUES DETECTED</p>
              <ul className="space-y-1">
                {result.issues.map((issue, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                    <XCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.opportunities.length > 0 && (
            <div>
              <p className="text-xs font-medium text-emerald-400 mb-2">OPPORTUNITIES</p>
              <ul className="space-y-1">
                {result.opportunities.map((opp, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {opp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Main Component
export function WebsiteEvaluationTool() {
  const [url, setUrl] = useState("")
  const [email, setEmail] = useState("")
  const [stage, setStage] = useState<AnalysisStage>("idle")
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [emailError, setEmailError] = useState("")

  // URL validation
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
    if (stage === "idle" || stage === "complete") {
      setProgress(0)
      return
    }

    const stages: AnalysisStage[] = ["validating", "crawling", "analyzing", "calculating"]
    const stageIndex = stages.indexOf(stage)
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Speed up based on which stage we're in
        const speed = stageIndex * 15 + 15
        return Math.min(100, prev + (100 / speed))
      })
    }, 200)

    return () => clearInterval(interval)
  }, [stage])

  // Start analysis
  const startAnalysis = async () => {
    if (!isValidUrl(url)) {
      setEmailError("Please enter a valid URL (e.g., https://example.com)")
      return
    }
    
    setEmailError("")
    setResult(null)
    setShowEmailCapture(false)
    setIsPremium(false)
    
    const stages: AnalysisStage[] = ["validating", "crawling", "analyzing", "calculating", "complete"]
    
    for (const s of stages) {
      setStage(s)
      if (s !== "complete") {
        await new Promise(r => setTimeout(r, 800 + Math.random() * 400))
      }
    }
    
    const analysisResult = await analyzeWebsite(url)
    setResult(analysisResult)
    setShowEmailCapture(true)
  }

  // Capture email for full report
  const captureEmail = () => {
    if (!email || !email.includes("@")) {
      setEmailError("Please enter a valid email address")
      return
    }
    setEmailError("")
    setIsPremium(true)
    // In production, send to Formspree/vickamau20@gmail.com
    console.log("Email captured:", email, "for URL:", url)
  }

  // Reset
  const reset = () => {
    setUrl("")
    setEmail("")
    setStage("idle")
    setProgress(0)
    setResult(null)
    setShowEmailCapture(false)
    setIsPremium(false)
    setEmailError("")
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">Velox</span>
          </div>
          <Button variant="ghost" onClick={reset} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Hero Section */}
          {!result && stage === "idle" && (
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Discover How Much Revenue{" "}
                <span className="text-orange-500">Your Website Is Losing</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Our AI-powered analysis engine evaluates 7 critical dimensions to calculate 
                your Revenue Visibility Score (RVS) and identify exactly what you're missing.
              </p>
            </motion.div>
          )}

          {/* URL Input */}
          {stage === "idle" && (
            <motion.div variants={itemVariants} className="max-w-xl mx-auto">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Enter Your Website URL
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <Button 
                    onClick={startAnalysis}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                    size="lg"
                  >
                    Analyze
                  </Button>
                </div>
                {emailError && (
                  <p className="text-red-500 text-sm mt-3">{emailError}</p>
                )}
                <p className="text-gray-500 text-sm mt-3">
                  Free analysis takes ~4 seconds • No credit card required
                </p>
              </div>
            </motion.div>
          )}

          {/* Analysis Progress */}
          {stage !== "idle" && !result && (
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <Loader2 className="w-12 h-12 mx-auto mb-4 text-orange-500 animate-spin" />
                <h2 className="text-2xl font-bold mb-2">{stageMessages[stage].title}</h2>
                <p className="text-gray-400">{stageMessages[stage].description}</p>
              </div>
              
              {/* Progress Bar */}
              <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              
              {/* Stage Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {["validating", "crawling", "analyzing", "calculating"].map((s) => (
                  <div
                    key={s}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      stage === s || ["validating", "crawling", "analyzing", "calculating"].indexOf(stage) > ["validating", "crawling", "analyzing", "calculating"].indexOf(s)
                        ? "bg-orange-500"
                        : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Results Dashboard */}
          {result && (
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Score Overview */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Score Circle */}
                  <div className="flex-shrink-0">
                    <ScoreCircle score={result.rvs} status={result.status} />
                  </div>
                  
                  {/* Status */}
                  <div className="flex-1 text-center md:text-left">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                      result.status === "critical" ? "bg-red-500/20 text-red-400" :
                      result.status === "weak" ? "bg-amber-500/20 text-amber-400" :
                      result.status === "functional" ? "bg-blue-500/20 text-blue-400" :
                      "bg-emerald-500/20 text-emerald-400"
                    }`}>
                      {result.status === "critical" && <AlertTriangle className="w-4 h-4" />}
                      {result.status === "weak" && <Activity className="w-4 h-4" />}
                      {result.status === "functional" && <CheckCircle2 className="w-4 h-4" />}
                      {result.status === "optimized" && <TrendingUp className="w-4 h-4" />}
                      <span className="font-medium capitalize">{result.status} Visibility</span>
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-2">
                      Your Revenue Visibility Score: {result.rvs}/100
                    </h2>
                    <p className="text-gray-400">
                      Your website is capturing approximately {result.rvs}% of its potential revenue opportunity.
                    </p>
                  </div>
                  
                  {/* Loss Indicator */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                    <p className="text-sm text-red-400 mb-1">Estimated Annual Loss</p>
                    <p className="text-3xl font-bold text-red-500">
                      ${result.annualLoss.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Based on industry conversion benchmarks
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Capture for Full Access */}
              {showEmailCapture && !isPremium && (
                <div className="bg-gradient-to-r from-orange-500/10 to-emerald-500/10 border border-orange-500/30 rounded-2xl p-8">
                  <div className="max-w-2xl mx-auto text-center">
                    <Lock className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                    <h3 className="text-2xl font-bold mb-3">
                      Unlock Your Full Diagnostic Report
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Get detailed analysis of all 7 categories, complete issue breakdown, 
                      and personalized optimization roadmap—absolutely free.
                    </p>
                    
                    <div className="flex gap-3 max-w-md mx-auto">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                      />
                      <Button 
                        onClick={captureEmail}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6"
                      >
                        Unlock
                      </Button>
                    </div>
                    {emailError && (
                      <p className="text-red-500 text-sm mt-3">{emailError}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-3">
                      We'll send the full report to {email || "your email"} • No spam, ever.
                    </p>
                  </div>
                </div>
              )}

              {/* Premium Unlocked */}
              {isPremium && (
                <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <Unlock className="w-6 h-6 text-emerald-500" />
                    <span className="font-medium text-emerald-400">
                      Full Report Unlocked! Check your email for detailed analysis.
                    </span>
                  </div>
                </div>
              )}

              {/* Category Grid */}
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-500" />
                  Analysis by Category
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(result.categories).map(([key, catResult]) => (
                    <CategoryCard
                      key={key}
                      category={key}
                      result={catResult}
                      isLocked={!isPremium}
                    />
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Stop Leaving Money on the Table?
                </h3>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                  Our team of conversion experts can help you implement the optimizations 
                  identified in this analysis and start capturing your lost revenue.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Talk to a Specialist
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-gray-700 hover:bg-gray-800 gap-2">
                    <Target className="w-4 h-4" />
                    Request Proposal
                  </Button>
                </div>
              </div>

              {/* Another Analysis */}
              <div className="text-center">
                <Button variant="ghost" onClick={reset} className="text-gray-400 hover:text-white">
                  Analyze Another Website
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 Velox Web Systems. All rights reserved.</p>
          <p className="mt-2">Turning websites into revenue machines since 2019</p>
        </div>
      </footer>
    </div>
  )
}
