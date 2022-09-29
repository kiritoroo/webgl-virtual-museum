import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import tfragment from './shaders/template/fragment.fs.glsl';
import tvertex from './shaders/template/vertex.vs.glsl';

import sky from './modules/sky';

const W: number = innerWidth;
const H: number = innerHeight;

const container: HTMLCanvasElement  = document.createElement("canvas");

const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, W/H, 0.1, 1000);
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true, canvas: container });
const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

document.body.appendChild(container);

camera.position.z = 5;

scene.background = new THREE.Color(0xffffff);

renderer.setSize( W, H );
renderer.setPixelRatio( window.devicePixelRatio );

// lights
const ambientLight = new THREE.AmbientLight(0x222222);
const directlight = new THREE.DirectionalLight(0xffffff, 1);
directlight.position.set(80, 80, 80);
scene.add(ambientLight);
scene.add(directlight);
sky.scale.setScalar(10);
scene.add(sky);

type effectType = {
  turbidity: number
  rayleigh: number
  mieCoefficient: number
  mieDirectionalG: number
  inclination: number
  azimuth: number
  sun: boolean
}

const effectController: effectType = {
  turbidity: 10,
  rayleigh: 2,
  mieCoefficient: 0.005,
  mieDirectionalG: 0.8,
  inclination: 0.49,
  azimuth: 0.25,
  sun: !true,
};

const uniforms = sky.material.uniforms;
uniforms["turbidity"].value = effectController.turbidity;
uniforms["rayleigh"].value = effectController.rayleigh;
uniforms["mieCoefficient"].value = effectController.mieCoefficient;
uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;
uniforms["sunPosition"].value.set(400000, 400000, 400000);


const geometry: THREE.BufferGeometry = new THREE.BoxGeometry(1, 1, 1);
// const material: THREE.Material = new THREE.ShaderMaterial({
//   uniforms: {

//   },
//   vertexShader: tvertex,
//   fragmentShader: tfragment
// })
const material: THREE.Material = new THREE.MeshStandardMaterial({ color: 'white' })
const mesh: THREE.Mesh = new THREE.Mesh( geometry, material )
scene.add(mesh);

//const clock = new THREE.Clock()

const animate = () => {

  requestAnimationFrame(animate);

	controls.update()

  //const time = clock.getElapsedTime()
  //sky.material.uniforms.uTime.value = time 

  renderer.render(scene, camera);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
}

animate()
