import { useRapier, RigidBody, RapierRigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function Player({ reset }) {
  const body = useRef<RapierRigidBody>(null)
  const { rapier, world } = useRapier()

  const [subscribeKeys, getKeys] = useKeyboardControls()

  const doJump = () => {
    const origin = body.current.translation()
    origin.y -= 0.31
    const direction = { x: 0, y: -1, z: 0 }
    const ray = new rapier.Ray(origin, direction)
    const hit = world.castRay(ray, 10, true)

    if (hit.toi < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 }, true)
    }
  }

  const doReset = () => {
    body.current.setTranslation({ x: 0, y: 1, z: 0 }, true)
    body.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
    body.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
  }

  useEffect(() => {
    const unsubscribeReset = subscribeKeys(
      (state) => state.reset,
      (value) => {
        if (value) {
          doReset()
        }
      },
    )

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          doJump()
        }
      },
    )

    const unsubscribeAny = subscribeKeys(() => {
      // console.log('any key down')
    })

    return () => {
      unsubscribeReset()
      unsubscribeJump()
      unsubscribeAny()
    }
  }, [])

  useFrame((state, delta) => {
    const { forward, backward, left, right } = getKeys()

    const impulse = { x: 0, y: 0, z: 0 }
    const torque = { x: 0, y: 0, z: 0 }

    const impulseStrength = 0.6 * delta
    const torqueStrength = 0.2 * delta

    if (forward) {
      impulse.z -= impulseStrength
      torque.x -= torqueStrength
    }
    if (backward) {
      impulse.z += impulseStrength
      torque.x += torqueStrength
    }
    if (left) {
      impulse.x -= impulseStrength
      torque.z += torqueStrength
    }
    if (right) {
      impulse.x += impulseStrength
      torque.z -= torqueStrength
    }

    body.current.applyImpulse(impulse, true)
    body.current.applyTorqueImpulse(torque, true)

    /**
     * Camera
     */
    const bodyPosition = body.current.translation()
    const cameraPosition = new THREE.Vector3()
    cameraPosition.copy(bodyPosition)
    cameraPosition.z += 2.25
    cameraPosition.y += 0.65

    const cameraTarget = new THREE.Vector3()
    cameraTarget.copy(bodyPosition)
    cameraTarget.y += 0.25

    state.camera.position.copy(cameraPosition)
    state.camera.lookAt(cameraTarget)
  })

  useEffect(() => {
    if (reset) {
      doReset()
    }
  }, [reset])

  return (
    <RigidBody
      ref={body}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={[0, 1, 0]}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject.name === "collectible") {
          // Removed onCollect prop
        }
      }}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  )
}