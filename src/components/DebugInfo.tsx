import React from 'react'
import { useFrame } from '@react-three/fiber'

const DebugInfo: React.FC = () => {
  const [fps, setFps] = React.useState(0)
  const [memory, setMemory] = React.useState(0)

  useFrame((state, delta) => {
    setFps(Math.round(1 / delta))
    setMemory(Math.round(performance.memory?.usedJSHeapSize / 1048576) || 0)
  })

  return (
    <div className="absolute bottom-0 left-0 p-4 text-white bg-black bg-opacity-50">
      <p>FPS: {fps}</p>
      <p>Memory: {memory} MB</p>
    </div>
  )
}

export default DebugInfo