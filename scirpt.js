const scene = new THREE.Scene()
console.log(scene)
const container = document.querySelector("#webgl")
scene.background = new THREE.Color(0x00ff00)
console.log(container)

const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000)
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: container })
renderer.setSize(window.innerWidth,window.innerHeight)
camera.position.z = 5 

const geometry = new THREE.BoxGeometry(2,2,2)
const material = new THREE.MeshStandardMaterial({ color: 0xffff00 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const ambientLight = new THREE.AmbientLight(0x404040)
scene.add(ambientLight)
const directionLight = new THREE.DirectionalLight(0x404040, 1)
scene.add(directionLight)

// orbitcontrol is tool: allow the camera to orbit around a target
// roll: zoom in, zoom out; leftMouse: move camera around object; rightMouse: move camera to another space
// dom is document object model 
const orbitControl = new THREE.OrbitControls(camera, renderer.domElement)
function animate() {
    renderer.render(scene,camera)

    mesh.rotation.y +=0.01
    mesh.rotation.z +=0.01

    orbitControl.update()
    window.requestAnimationFrame(animate)
}




animate()
