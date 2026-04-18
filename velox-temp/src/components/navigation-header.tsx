import { motion } from 'framer-motion'
import { Zap, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface NavigationHeaderProps {
  onHomeClick?: () => void
  currentPage?: 'home' | 'audit' | 'results'
}

export function NavigationHeader({ onHomeClick, currentPage = 'home' }: NavigationHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Audit Tool', id: 'audit' },
    { label: 'Features', id: 'features' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] border-b border-[var(--color-border)] backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onHomeClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="relative w-8 h-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:inline text-white">
            Velox
          </span>
        </motion.button>

        {/* Desktop Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-1"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === item.id
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block"
        >
          <a
            href="#audit"
            className="px-6 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[var(--color-accent)]/50 transition-all transform hover:scale-105"
          >
            Start Audit
          </a>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          className="md:hidden p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-tertiary)] transition-all"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#audit"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full px-4 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-lg font-semibold text-sm text-center hover:shadow-lg transition-all"
            >
              Start Audit
            </a>
          </div>
        </motion.div>
      )}
    </header>
  )
}
