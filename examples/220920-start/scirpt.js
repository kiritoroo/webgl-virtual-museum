const vertices = [] 
const scene = new THREE.Scene()
console.log(scene)
const container = document.querySelector("#webgl")
scene.background = new THREE.Color(0x000000)
console.log(container)

const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000)
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: container })
renderer.setSize(window.innerWidth,window.innerHeight)
camera.position.z = 100

// const geometry = new THREE.BoxGeometry(2,2,2, 12, 20, 20)
const geometry = new THREE.BufferGeometry()

const numberPoints = 500
for(i =0 ; i<numberPoints;i++){
    const x = THREE.MathUtils.randFloatSpread(100)
    const y = THREE.MathUtils.randFloatSpread(100)
    const z = THREE.MathUtils.randFloatSpread(00)
    vertices.push(x,y,z) 
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3))


const material = new THREE.PointsMaterial({ 
    size: 1,
    color: 0xffffff,
    wireframe: true,
})
const mesh = new THREE.Points(geometry, material)
scene.add(mesh)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)
const directionLight = new THREE.DirectionalLight(0x404040, 1)
scene.add(directionLight)

// orbitcontrol is tool: allow the camera to orbit around a target
// roll: zoom in, zoom out; leftMouse: move camera around object; rightMouse: move camera to another space
// dom is document object model 
const orbitControl = new THREE.OrbitControls(camera, renderer.domElement)




function animate() {
    renderer.render(scene,camera)

    // mesh.rotation.y +=0.01
    // mesh.rotation.z +=0.01

    orbitControl.update()
    window.requestAnimationFrame(animate)
}


animate()
