import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky, OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Game from './components/Game'
import UI from './components/UI'
import DebugInfo from './components/DebugInfo'

function App() {
  const [error, setError] = useState<Error | null>(null)
  const [errorInfo, setErrorInfo] = useState<React.ErrorInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('App component mounted')
    setIsLoading(false)
  }, [])

  if (error) {
    return (
      <div className="error-display p-4 bg-red-100 text-red-900">
        <h1 className="text-2xl font-bold mb-4">An error occurred:</h1>
        <pre className="whitespace-pre-wrap">{error.toString()}</pre>
        {errorInfo && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Component Stack:</h2>
            <pre className="whitespace-pre-wrap">{errorInfo.componentStack}</pre>
          </div>
        )}
      </div>
    )
  }

  if (isLoading) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <ErrorBoundary onError={(error, errorInfo) => {
      setError(error)
      setErrorInfo(errorInfo)
      console.error("Caught error:", error, errorInfo)
    }}>
      <div className="w-full h-screen relative">
        <div className="text-white absolute top-0 left-0 z-10 p-4">
          3D Dungeon Crawler Game
        </div>
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.3} />
          <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
          <Physics>
            <Suspense fallback={<Fallback />}>
              <Game />
            </Suspense>
          </Physics>
          <OrbitControls />
          <DebugInfo />
        </Canvas>
        <UI />
      </div>
    </ErrorBoundary>
  )
}

function Fallback() {
  return <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="hotpink" />
  </mesh>
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode, onError: (error: Error, errorInfo: React.ErrorInfo) => void },
  { hasError: boolean }
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.props.onError(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return null // The parent will handle the error display
    }

    return this.props.children
  }
}

export default App