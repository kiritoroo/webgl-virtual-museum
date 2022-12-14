import React, { Suspense, useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as TWEEN from "@tweenjs/tween.js";

export function Model(props) {
  const group = useRef();
  const mesh = useRef();
  const { nodes, materials } = useGLTF("model/rhetorician_3.glb");

  const upAndDown = new TWEEN.Tween({ y: -2.8, rot: 0 })
    .to({ y: -3, rot: 1 }, 2000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .repeat(Infinity)
    .yoyo(true);

  useEffect(() => {
    requestAnimationFrame(animate);
    upAndDown.start();
    if (window.innerWidth > 768) {
      document.addEventListener("mousemove", moveModel);
    }
    upAndDown.onUpdate(({ y, rot }, elapsed) => {
      mesh.current.position.y = y;
      if (window.innerWidth < 768) {
        mesh.current.rotation.y = -0.5 + rot;
      }
    });
    return () => {
      upAndDown.stop()
      document.removeEventListener("mousemove", moveModel);}
  }, []);

  function animate(time) {
    TWEEN.update(time);
  }

  const moveModel = (e) => {
    mesh.current.rotation.y = -0.5 + e.clientX / window.innerWidth;
  };

  return (
    <group
      ref={mesh}
      rotation={[0, -0.5, 0]}
      position={[0.5, -2.8, -2]}
      {...props}
      dispose={null}
    >
      <group>
        <group 
          ref={group}
          position={[2.2, 5.8, 1.2]}
          rotation={[-Math.PI, -2.0, 0]}
          scale={[0.2, 0.2, 0.2]}
        >
          <mesh
            geometry={nodes.Object_3.geometry}
            material={materials.Material_0}
          />
          <mesh
            geometry={nodes.Object_4.geometry}
            material={materials.Material_0}
          />
          <mesh
            geometry={nodes.Object_5.geometry}
            material={materials.Material_0}
          />
          <mesh
            geometry={nodes.Object_6.geometry}
            material={materials.Material_0}
          />
          <mesh
            geometry={nodes.Object_7.geometry}
            material={materials.Material_0}
          />
          <mesh
            geometry={nodes.Object_8.geometry}
            material={materials.Material_0}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("model/rhetorician_3.glb");

export default function HomeModel2({ setLoading }) {
  return (
    <Canvas>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={0.5} />
      <Suspense fallback={null}>
        <Model
          onLoad={setTimeout(() => {
            setLoading(false);
          }, 3000)}
        />
      </Suspense>
    </Canvas>
  );
}