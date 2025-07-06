import { Canvas } from '@react-three/fiber'
import { Sky, KeyboardControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { Level } from './components/Level'
import { Player } from './components/Player'
import { Collectibles } from './components/Collectibles'
import { useState, useEffect } from 'react'

const App = () => {
  const [score, setScore] = useState(0)
  const [reset, setReset] = useState(false)
  const numCollectibles = 3

  const handleReset = () => {
    setScore(0)
    setReset(true)
  }

  useEffect(() => {
    if (reset) {
      setScore(0)
      setReset(false)
    }
  }, [reset])

  return (
    <>
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white', zIndex: 1 }}>
        Score: {score}
      </div>
      {score === numCollectibles && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '3rem',
            zIndex: 1,
          }}
        >
          You Win!
          <button onClick={handleReset} style={{ fontSize: '1rem', display: 'block', margin: '1rem auto' }}>
            Play Again
          </button>
        </div>
      )}
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
            <Player reset={reset} />
            <Collectibles onCollect={() => setScore((s) => s + 1)} reset={reset} />
          </Physics>
        </Canvas>
      </KeyboardControls>
    </>
  )
}

export default App