'use client'

import { motion } from 'framer-motion'
import {
  Zap, TrendingUp, Target, Shield, BarChart3, Eye, ArrowRight,
  CheckCircle2, Users, Lightbulb, Rocket
} from 'lucide-react'

interface HomePageProps {
  onStartAudit?: () => void
}

export function HomePage({ onStartAudit }: HomePageProps) {
  const features = [
    {
      icon: Zap,
      title: 'Real-Time Analysis',
      description: 'Fetches live metrics from multiple sources for accurate, up-to-date insights',
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
    },
    {
      icon: Target,
      title: 'Actionable Insights',
      description: 'Get specific, implementable recommendations with ROI estimates and priority levels',
      color: 'text-orange-400',
      bg: 'bg-orange-500/20',
    },
    {
      icon: TrendingUp,
      title: 'Revenue Impact',
      description: "Understand exactly how much revenue you're losing and what you can gain",
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
    },
    {
      icon: Shield,
      title: 'Comprehensive Audit',
      description: 'Evaluate technical, SEO, UX, conversion, analytics, and authority metrics',
      color: 'text-purple-400',
      bg: 'bg-purple-500/20',
    },
  ]

  const benefits = [
    'Identify revenue-blocking issues',
    'Get prioritized improvement roadmap',
    'Estimate revenue recovery potential',
    'Access implementation guides',
    'Share reports with your team',
    'Export detailed analysis',
  ]

  const stats = [
    { label: 'Websites Analyzed', value: '10,000+' },
    { label: 'Revenue Identified', value: '$50M+' },
    { label: 'Avg. ROI', value: '320%' },
    { label: 'Customer Satisfaction', value: '4.9/5' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/50 rounded-full text-[var(--color-primary)] text-sm font-medium mb-4"
                >
                  <Rocket className="w-4 h-4" />
                  AI-Powered Website Analysis
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              >
                Stop Leaving{' '}
                <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                  Revenue on the Table
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-400 mb-8 leading-relaxed"
              >
                Velox analyzes your website across 6 critical dimensions to calculate your Revenue Visibility Score and identify exactly what's holding you back from capturing customer opportunities.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onStartAudit}
                  className="px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[var(--color-accent)]/50 transition-all flex items-center justify-center gap-2"
                >
                  Start Free Audit
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-[var(--color-border)] text-white rounded-xl font-semibold text-lg hover:bg-white/5 transition-all"
                >
                  Watch Demo
                </motion.button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-500 text-sm mt-6"
              >
                ✓ Free • ✓ No credit card • ✓ Takes ~5 seconds • ✓ Instant results
              </motion.p>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl opacity-20 blur-2xl" />
                <div className="relative bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-2xl p-8 backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="h-3 bg-[var(--color-primary)]/50 rounded-full w-3/4" />
                    <div className="h-3 bg-[var(--color-primary)]/30 rounded-full w-full" />
                    <div className="h-3 bg-[var(--color-primary)]/30 rounded-full w-5/6" />
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="bg-[var(--color-bg-tertiary)] rounded-lg p-4"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] mb-2" />
                        <div className="h-2 bg-[var(--color-primary)]/50 rounded-full w-3/4" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-[var(--color-bg-secondary)]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Comprehensive Website <span className="text-gradient">Analysis</span>
            </h2>
            <p className="text-xl text-gray-400">
              We analyze 100+ data points across 6 key dimensions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-2xl p-8 hover:border-[var(--color-border-light)] transition-all hover:shadow-lg hover:shadow-[var(--color-accent)]/20"
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-[var(--color-bg-secondary)]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                Get the Insights You Need to{' '}
                <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                  Grow Your Business
                </span>
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-lg text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-border)] rounded-2xl p-8">
                <div className="space-y-6">
                  {['Technical', 'SEO', 'UX', 'Conversion'].map((category, i) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{category}</span>
                        <span className="text-emerald-400 font-bold">
                          {Math.round(50 + Math.random() * 50)}/100
                        </span>
                      </div>
                      <div className="h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.round(50 + Math.random() * 50)}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 border-2 border-[var(--color-accent)] rounded-3xl p-12 text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Unlock Your Revenue Potential?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Get your free website audit in just 5 seconds. No credit card required.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartAudit}
              className="px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[var(--color-accent)]/50 transition-all inline-flex items-center gap-2"
            >
              Start Your Free Audit
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 px-4 bg-[var(--color-bg-secondary)]/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">Velox</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2026 Velox. Helping websites capture their revenue potential.
            </p>
            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
