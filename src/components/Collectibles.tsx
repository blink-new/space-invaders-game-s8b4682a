import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useMemo } from 'react'
import { Group } from 'three'

function Collectible({ position, onCollect }) {
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
    <group ref={ref} position={position}>
      <RigidBody
        type="fixed"
        colliders={false}
        name="collectible"
        onCollisionEnter={() => {
          setCollected(true)
          onCollect()
        }}
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

export function Collectibles({ onCollect }) {
  const collectibles = useMemo(() => [
    { position: [0, 3, -5] },
    { position: [5, 5, -10] },
    { position: [-5, 1, -2] },
  ], [])

  return (
    <>
      {collectibles.map((collectible, i) => (
        <Collectible key={i} position={collectible.position} onCollect={onCollect} />
      ))}
    </>
  )
}
