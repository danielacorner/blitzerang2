import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary'

// Override console methods to capture output
const consoleOutput: string[] = []
const originalConsole = { ...console }

;['log', 'error', 'warn', 'info'].forEach((method) => {
  console[method as keyof Console] = (...args: any[]) => {
    consoleOutput.push(`[${method.toUpperCase()}] ${args.join(' ')}`)
    originalConsole[method as keyof Console](...args)
    updateConsoleOutput()
  }
})

function updateConsoleOutput() {
  const consoleOutputElement = document.getElementById('console-output')
  if (consoleOutputElement) {
    consoleOutputElement.textContent = consoleOutput.join('\n')
  }
}

// Capture unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason)
})

// Capture global errors
window.addEventListener('error', (event) => {
  console.error('Global Error:', event.error)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)