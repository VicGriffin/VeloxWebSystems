import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Menu, X } from 'lucide-react'
import { useState, useCallback } from 'react'

interface NavigationHeaderProps {
  onHomeClick?: () => void
  onAuditClick?: () => void
  currentPage?: 'home' | 'audit' | 'results'
}

export function NavigationHeader({ onHomeClick, onAuditClick, currentPage = 'home' }: NavigationHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = useCallback((id: string) => {
    setIsMenuOpen(false)
    if (id === 'home' && onHomeClick) {
      onHomeClick()
    } else if (id === 'audit' && onAuditClick) {
      onAuditClick()
    }
  }, [onHomeClick, onAuditClick])

  const navItems = [
    { label: 'Home', id: 'home', action: onHomeClick },
    { label: 'Audit Tool', id: 'audit', action: onAuditClick },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg-primary)]/95 border-b border-[var(--color-border)] backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onHomeClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="Go to home page"
        >
          <div className="relative w-8 h-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" aria-hidden="true" />
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
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === item.id
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-tertiary)]'
              }`}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block"
        >
          <button
            onClick={onAuditClick}
            className="px-6 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[var(--color-accent)]/50 transition-all transform hover:scale-105"
          >
            Start Audit
          </button>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-tertiary)] transition-all"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('audit')}
                className="block w-full px-4 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-lg font-semibold text-sm text-center hover:shadow-lg transition-all"
              >
                Start Audit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
