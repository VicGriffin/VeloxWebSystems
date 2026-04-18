import { useState, useCallback } from 'react'
import { HomePage } from './components/home-page'
import { WebsiteEvaluationTool } from './components/website-evaluation-tool'
import { NavigationHeader } from './components/navigation-header'
import { ErrorBoundary } from './components/error-boundary'

type Page = 'home' | 'audit'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const goToAudit = useCallback(() => {
    setCurrentPage('audit')
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const goToHome = useCallback(() => {
    setCurrentPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
        <NavigationHeader
          currentPage={currentPage}
          onHomeClick={goToHome}
          onAuditClick={goToAudit}
        />

        {currentPage === 'home' ? (
          <HomePage onStartAudit={goToAudit} />
        ) : (
          <WebsiteEvaluationTool onBack={goToHome} />
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App
