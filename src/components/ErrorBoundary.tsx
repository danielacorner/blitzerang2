import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
          <details className="whitespace-pre-wrap">
            <summary className="cursor-pointer mb-2">Error Details</summary>
            <pre className="bg-red-50 p-4 rounded overflow-auto max-h-96">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <h2 className="text-xl font-semibold mt-4 mb-2">Console Output:</h2>
          <pre id="console-output" className="bg-gray-100 p-4 rounded overflow-auto max-h-96"></pre>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary