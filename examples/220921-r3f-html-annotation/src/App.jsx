import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'

function Dodecahedron({ ...props }) {
  return (
    <mesh {...props}>
      <dodecahedronGeometry/>
      <meshStandardMaterial roughness={0.75} emissive="#404057"/>
      <Html 
        distanceFactor={10} 
        // transform 
        // occlude 
        rotation={[0, Math.PI, 0 ]}
        // position={[1, 1, 2]}
      >
        <div className='content'>
          hello <br/> world
        </div>
      </Html>
    </mesh>
  )
}

function Content() {
  const ref = useRef()

  useFrame(() => (
    ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01
  ))

  return (
    <group ref={ref}>
      <Dodecahedron position={[-2, 0, 0]} />
      <Dodecahedron position={[0, -2, -3]} />
      <Dodecahedron position={[2, 0, 0]} />
    </group>
  )
}

function App() {

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7.5] }}>
      <pointLight color="indianred" />
      <pointLight position={[10, 10, -10]} color="orange" />
      <pointLight position={[-10, -10, 10]} color="lightblue" />
      <Content />
      <OrbitControls/>
    </Canvas>
  )
}

export default App
