import { useState } from 'react'
import { HomePage } from './components/home-page'
import { WebsiteEvaluationTool } from './components/website-evaluation-tool'
import { NavigationHeader } from './components/navigation-header'

type Page = 'home' | 'audit'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const scrollToAudit = () => {
    setCurrentPage('audit')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
      <NavigationHeader
        currentPage={currentPage === 'home' ? 'home' : 'audit'}
        onHomeClick={() => setCurrentPage('home')}
      />

      {currentPage === 'home' ? (
        <HomePage onStartAudit={scrollToAudit} />
      ) : (
        <WebsiteEvaluationTool />
      )}
    </div>
  )
}

export default App
