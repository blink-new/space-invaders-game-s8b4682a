import { Canvas } from '@react-three/fiber'
import { Sky, KeyboardControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { Level } from './components/Level'
import { Player } from './components/Player'
import { Collectibles } from './components/Collectibles'
import { useState } from 'react'

function App() {
  const [score, setScore] = useState(0)

  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
        { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
        { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
        { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
        { name: 'jump', keys: ['Space'] },
        { name: 'reset', keys: ['r', 'R'] },
      ]}
    >
      <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 1, 10] }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={1.5} />
        <pointLight castShadow intensity={1.5} position={[100, 100, 100]} />
        <Physics gravity={[0, -30, 0]}>
          <Level />
          <Player onCollect={() => setScore(s => s + 1)} />
          <Collectibles />
        </Physics>
      </Canvas>
    </KeyboardControls>
  )
}

export default App