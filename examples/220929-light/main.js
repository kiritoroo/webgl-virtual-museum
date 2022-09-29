import * as THREE from 'three'
import { Sphere } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols'
import { GLTFLoader } from 'three/examples/jsm/loaders/gltfloader'

const {innerWidth, innerHeight} = window
const W = innerWidth
const H = innerHeight
const ASPECT = W/H
// create sence
const scene = new THREE.Scene()
scene.background = new THREE.Color("grey")
// use canvans which has id = "stage"
const container = document.getElementById("stage")
document.body.appendChild(container)
// create Camera
const camera = new THREE.PerspectiveCamera(75,ASPECT,0.1,10000)
camera.position.z = 10
camera.aspect = ASPECT
// create renderer with antilias, cavans
const renderer = new THREE.WebGLRenderer({antialias: true, canvas: container})
renderer.setSize(W,H)
renderer.setPixelRatio(devicePixelRatio)
// create controller
const control = new OrbitControls(camera,renderer.domElement)
control.enableDamping = true

// create mesh with geometry and material
// const geometry = new THREE.BoxGeometry(5,5,5)
// const material = new THREE.MeshStandardMaterial({
//   wireframe: false 
// })
// const mesh = new THREE.Mesh(geometry,material)

// upload models
let object
const loader = new GLTFLoader()
loader.load('./models/vr_gallery.glb',
    (file) => {
      console.log(file)
      object = file.scene.children[0]
      object.scale.multiplyScalar(0.8)
      object.position.y = -2
      scene.add(object)
    },

    (xhr) => {
      console.log(xhr.loaded / xhr.total *100 + '% loaded')
    },

    (error) => {
      console.log('Have a problem ' + error)
    }
)

const sphere = new THREE.SphereGeometry(0.5,16,8)

//create light:

// hầu như chiếu sáng tất cả
const ambientLight = new THREE.AmbientLight('yellow', 1.3)
      ambientLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 'yellow' } ) ) );
      ambientLight.position.set(5,6,3)
//scene.add(ambientLight)


// ánh sáng chỉ chiếu theo đường thẳng mặt 
const directionLight = new THREE.DirectionalLight("yellow",1.3)
      directionLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 'yellow' } ) ) ); 
      directionLight.position.set(-5,6,3)
//scene.add(directionLight)



const pointLight = new THREE.PointLight( 0xff0040, 2, 150 );
pointLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
pointLight.position.z = 0
pointLight.position.y = 0
pointLight.position.x = 0
pointLight.rotation.set(0,0,0)
        //scene.add( pointLight );

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
//scene.add( pointLightHelper );

const rectAreaLight = new THREE.RectAreaLight('lightblue',150, 0.5, 0.5 )
rectAreaLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 'lightblue' } ) ) )
rectAreaLight.position.x = 1
      //scene.add(rectAreaLight)


// mặt nằm phía sau sẽ không thấy được ánh sáng
const spotLight = new THREE.SpotLight('yellow',1.3, 20)
      spotLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 'yellow' } ) ) )
      spotLight.position.set(-5,6,3)
      //scene.add(spotLight)


const hemisphereLight = new THREE.HemisphereLight('black','black', 500)
hemisphereLight.position.set(0,0,0)
//light1.add(new THREE.Mesh(sphere, new THREE.Mesh( { color:0xff0040 })))
scene.add(hemisphereLight)

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight,1,'black')
scene.add(hemisphereLightHelper)

const animate = () => {
  renderer.render(scene,camera)
  control.update()
  
  // if (object){
  //   object.rotation.z += 0.04
  // }
  window.requestAnimationFrame(animate)
}
animate()

