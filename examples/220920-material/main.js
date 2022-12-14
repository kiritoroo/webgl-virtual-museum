import * as THREE from "three"

// loader texture
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./res/diamond.jpg')
texture.minFilter = THREE.NearestFilter
texture.magFilter = THREE.NearestFilter

const { innerWidth, innerHeight } = window
const W = innerWidth
const H = innerHeight
const ASPECT = W/H
const scene = new THREE.Scene()
const canvas = document.getElementById("stage")
const camera = new THREE.PerspectiveCamera(75,ASPECT,0.1,100)
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas})
const geometry = new THREE.BoxGeometry(5,5,5)
const material = new THREE.MeshStandardMaterial({
  wireframe: false,
  map: texture
})
const mesh = new THREE.Mesh(geometry,material)
const ambientLight = new THREE.AmbientLight(0xffffff)
const directionLight = new THREE.DirectionalLight(0xfffff,1 )


scene.background = new THREE.Color("white")
camera.position.z = 10
renderer.setSize(W,H)

scene.add(mesh,ambientLight,directionLight)


const animate = () => {
  renderer.render(scene,camera)
  window.requestAnimationFrame(animate)

  mesh.rotation.z += 0.005
  mesh.rotation.y += 0.005
}

animate()





