import React from 'react'
import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import Player from './Player'
import DungeonLevel from './DungeonLevel'

const Game: React.FC = () => {
  const { camera } = useThree()

  return (
    <>
      <Player />
      <DungeonLevel />
      <Html>
        <div style={{ position: 'absolute', top: 10, left: 10, color: 'white' }}>
          <p>Game Info</p>
        </div>
      </Html>
    </>
  )
}

export default Game