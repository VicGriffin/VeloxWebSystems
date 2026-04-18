import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { AlertCircle, RotateCcw } from 'lucide-react'

declare const process: { env: { NODE_ENV: string } }

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * Error Boundary Component
 * Catches errors in child components and displays a fallback UI
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    console.error('Error caught in error boundary:', error)
    return { hasError: true }
  }

  componentDidCatch(_error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', _error, errorInfo)
    this.setState({
      error: _error,
      errorInfo: errorInfo,
    })
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-accent)] rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-2">
                Oops! Something went wrong
              </h1>
              
              <p className="text-gray-400 mb-6">
                We encountered an unexpected error. Please try refreshing the page.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 text-left bg-[var(--color-bg-tertiary)] p-4 rounded-lg max-h-32 overflow-auto">
                  <summary className="text-xs text-gray-500 cursor-pointer font-mono">
                    Error Details (Development Only)
                  </summary>
                  <pre className="text-xs text-red-400 mt-2 whitespace-pre-wrap break-words font-mono">
                    {this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex gap-3">
                <button
                  onClick={this.resetError}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[var(--color-accent)]/50 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
