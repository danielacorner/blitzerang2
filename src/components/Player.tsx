import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import * as THREE from 'three'

const Player: React.FC = () => {
  const characterRef = useRef<THREE.Group>(null)
  const rigidBodyRef = useRef<any>(null)
  const { scene } = useGLTF('https://models.readyplayer.me/64f1a3b9c0c5e5c9c9f9b9f5.glb')

  useFrame((state) => {
    if (rigidBodyRef.current) {
      const position = rigidBodyRef.current.translation()
      state.camera.position.set(
        position.x,
        position.y + 5,
        position.z + 10
      )
      state.camera.lookAt(position.x, position.y, position.z)
    }
  })

  useEffect(() => {
    if (characterRef.current) {
      characterRef.current.position.set(0, 1, 0)
    }
  }, [])

  return (
    <RigidBody ref={rigidBodyRef} colliders={false} mass={1} type="dynamic" position={[0, 5, 0]}>
      <CapsuleCollider args={[0.5, 0.5]} />
      <primitive object={scene} ref={characterRef} />
    </RigidBody>
  )
}

export default Player