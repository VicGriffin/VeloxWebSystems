import { useState } from 'react'
import { HomePage } from './components/home-page'
import { WebsiteEvaluationTool } from './components/website-evaluation-tool'
import { NavigationHeader } from './components/navigation-header'
import { ErrorBoundary } from './components/error-boundary'

type Page = 'home' | 'audit'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const handleHomeClick = () => {
    setCurrentPage('home')
  }

  const handleAuditClick = () => {
    setCurrentPage('audit')
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
        <NavigationHeader
          currentPage={currentPage === 'home' ? 'home' : 'audit'}
          onHomeClick={handleHomeClick}
          onAuditClick={handleAuditClick}
        />

        {currentPage === 'home' ? (
          <HomePage onStartAudit={handleAuditClick} />
        ) : (
          <WebsiteEvaluationTool />
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App
