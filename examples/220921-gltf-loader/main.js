import * as THREE           from 'three'
import { GLTFLoader }       from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls }    from 'three/examples/jsm/controls/OrbitControls'

const container = document.createElement('canvas')
document.body.appendChild(container)

const scene       = new THREE.Scene()
const camera      = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000)
const renderer    = new THREE.WebGLRenderer({ antialias: true, canvas: container })
const control     = new OrbitControls(camera, renderer.domElement)

let mesh

// Khởi tạo trình tải ( Instantiate a loader )
const loader      = new GLTFLoader()

// Tải một object 3D có đuôi mở rộng là .glb
loader.load('./models/parrot.glb',
  // Hàm gọi khi tài nguyên tải thành công 
  (file) => {
    console.log(file)

    // Sau khi object được tải, thêm vào cảnh
    mesh = file.scene.children[0]
    // scene.add(file.scene)
    scene.add(mesh)
  },

  // Hàm gọi khi đang trong quá trình tải
  ( xhr ) => {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
  },

  // Hàm gọi khi tải bị thất bại
  ( error ) => {
    console.log( 'An error happened' + error )
  }
)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)
const directionLight = new THREE.DirectionalLight(0x404040, 1)
scene.add(directionLight)

// config
scene.background = new THREE.Color(0x00ff00)
camera.position.z = 2
renderer.setSize( innerWidth, innerHeight )
renderer.setPixelRatio( devicePixelRatio )


// animate
const animate = () => {
  renderer.render( scene, camera )

  control.update()
  if (mesh) {
    mesh.rotation.z += 0.005
  }

  requestAnimationFrame(animate)
}

animate()
