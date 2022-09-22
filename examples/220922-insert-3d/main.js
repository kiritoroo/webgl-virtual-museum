import * as THREE from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from "three/examples/jsm/loaders/gltfloader"
import { DRACOLoader } from "three/examples/jsm/loaders/dracoloader"



const {innerWidth, innerHeight} = window
const W = innerWidth
const H= innerHeight
const ASPECT = W/H
// creat scene
const scene = new THREE.Scene()
// use canvas which has id = "stage"
const container = document.getElementById("stage")
document.body.appendChild(container)
// create camera
const camera = new THREE.PerspectiveCamera(75,ASPECT,0.1,100)
// create renderer with antilias, canvas
const renderer = new THREE.WebGLRenderer({antialias: true, canvas: container})
// create controller
const control = new OrbitControls(camera,renderer.domElement)
control.enableDamping = true

// create mesh with geometry and material
const geometry = new THREE.BoxGeometry(5,5,5)
const material = new THREE.MeshStandardMaterial({
  wireframe: false 
})
//const mesh = new THREE.Mesh(geometry,material)
// create light: ambientLight and directionLight
const ambientLight = new THREE.AmbientLight("lightblue")
const directionLight = new THREE.DirectionalLight("lightyellow",1)
co

scene.background = new THREE.Color("skyblue")
camera.position.z =10
renderer.setSize(W,H)
renderer.setPixelRatio(devicePixelRatio)
// add mesh, ambientLight, dicrectionLight into scene
scene.add(ambientLight,directionLight)


// let mesh2
// // array to store 3d models
// đòi dracoLoader
// const loader2 = new GLTFLoader()
// loader2.load('./models/dna.glb',
//   (file) => {
//     console.log(file)
//     mesh2 = file.scene.children[0]
//     mesh2.position.set(5,6,2)
//     scene.add(mesh2)
//   },

//   (xhr) =>{
//     console.log((xhr.loaded / xhr.total * 100) + '% loaded')
//   },

//   (error) => {
//     console.log('Have problem' + error)
//   }
// )

// let mesh1

// const loader1 = new GLTFLoader()
// loader1.load('./models/xss.glb',
//   (file) => {
//     console.log(file)
//     mesh1 = file.scene.children[0]
//     mesh1.position.set(0.1,4,2)
//     scene.add(mesh1)
//   },

//   (xhr) =>{
//     console.log((xhr.loaded / xhr.total * 100) + '% loaded')
//   },

//   (error) => {
//     console.log('Have problem' + error)
//   }
// )

// let mesh
// const loader = new GLTFLoader()

// loader.load('./models/parrot.glb',
//   (file) =>{
//     console.log(file)
//     mesh = file.scene.children[0]
//     mesh.position.set(0.5,0.1,0.1)
//     scene.add(mesh)   
//   },
//   (xhr) => {
//     console.log((xhr.loaded / xhr.total *100) + '% loaded')
//   },

//   (error) => {
//     console.log('Have a problem')
//   }
// )


function setupModel(data) {
  const model = data.scene.children[0]
  //scene.add(model)
  return model
}

async function loadModels() {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath("/public/draco/")
  loader.setDRACOLoader(dracoLoader)

  const [parrotData, xssData, dnaData, roomData ] = await Promise.all([
    loader.loadAsync('/public/models/parrot.glb'),
    loader.loadAsync('/public/models/xss.glb'),
    loader.loadAsync('/public/models/dna.glb'),
    loader.loadAsync('/public/models/final-room-v2.glb'),
  ]); 

  const parrot = setupModel(parrotData);
  parrot.position.set(0, 0, 2.5);

  const xss = setupModel(xssData);
  xss.position.set(7.5, 0, -10);

  const dna = setupModel(dnaData);
  dna.position.set(0, -2.5, -10);

  const room = setupModel(roomData)
  room.position.set(5,6,7)

  return {
    parrot,
    xss,
    dna,
    room,
  };
}

let meshs

loadModels()
  .then(res => {
    meshs = res
    console.log(meshs);

    scene.add(meshs.parrot)
    scene.add(meshs.xss)
    scene.add(meshs.dna)
    scene.add(meshs.room)
  })




const animate = () => {
  renderer.render(scene,camera)
  control.update()


  if (meshs) {
    meshs.parrot.rotation.z += 0.04
  }

  window.requestAnimationFrame(animate)

}
animate()
