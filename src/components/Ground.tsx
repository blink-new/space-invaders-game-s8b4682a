import { CuboidCollider, RigidBody } from '@react-three/rapier'

export function Ground(props) {
  return (
    <RigidBody {...props} type="fixed" colliders={false}>
      <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial color="springgreen" />
      </mesh>
      <CuboidCollider args={[500, 2, 500]} position={[0, -2, 0]} />
    </RigidBody>
  )
}
