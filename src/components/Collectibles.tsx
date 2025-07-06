import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Group } from 'three'

export function Collectibles() {
  const ref = useRef<Group>(null)
  const [collected, setCollected] = useState(false)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta
    }
  })

  if (collected) {
    return null
  }

  return (
    <group ref={ref}>
      <RigidBody
        type="fixed"
        colliders={false}
        position={[0, 3, -5]}
        name="collectible"
        onCollisionEnter={() => setCollected(true)}
      >
        <CuboidCollider args={[0.25, 0.25, 0.25]} sensor />
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="gold" />
        </mesh>
      </RigidBody>
    </group>
  )
}