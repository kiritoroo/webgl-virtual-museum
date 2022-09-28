import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { RGBE, RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const W: int = innerWidth;
const H: int = innerHeight;

const container: HTMLCanvasElement  = document.createElement("canvas");

const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, W/H, 0.1, 1000);
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true, canvas: container });
const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

document.body.appendChild(container);

camera.rotation.set(-0.39660414415517486, -0.0011477275326946669, -0.0004806636298296369);
camera.position.set(0.059808862042431715, 2.797591993046862, 4.3180226078926296);

scene.background = new THREE.Color(0x00ff00);

renderer.setSize( W, H );
renderer.setPixelRatio( window.devicePixelRatio );


// ----- load json model
const objloader: THREE.ObjectLoader = new THREE.ObjectLoader();
// objloader.load(
// 	// resource URL
// 	"models/Entry.json",

// 	// onLoad callback
// 	// Here the loaded data is assumed to be an object
// 	function ( obj ) {
//     console.log(obj);
// 		// Add the loaded object to the scene
// 	},

// 	// onProgress callback
// 	function ( xhr ) {
// 		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
// 	},

// 	// onError callback
// 	function ( err ) {
// 		console.error( 'An error happened ' + err );
// 	}
// );

// Alternatively, to parse a previously loaded JSON structure
// const object = loader.parse(  );
// console.log(object);

// ----- load json model
const dracoLoader: DRACOLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader: GLTFLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load(
	// resource URL
	"models/vr_round_art_gallery.glb",
	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obj: GLTF ) {
    console.log(obj);
		scene.add(obj.scene)
		// Add the loaded object to the scene
	},

	// onProgress callback
	function ( xhr: ProgressEvent<EventTarget> ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err: ErrorEvent ) {
		console.error( 'An error happened ' + err );
	}
);

// ---- load hdr
const rgbeLoader: RGBELoader = new RGBELoader()
rgbeLoader.load('lebombo_1k.hdr',
	function ( texture, textureData ) {

		const material = new THREE.MeshBasicMaterial( { map: texture } );

		const quad = new THREE.PlaneGeometry( 1.5 * textureData.width / textureData.height, 1.5 );

		const mesh = new THREE.Mesh( quad, material );

		scene.add( mesh );

	} 
)

const geometry: THREE.BufferGeometry = new THREE.BoxGeometry(1, 1, 1);
const material: THREE.Material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mesh: THREE.Mesh = new THREE.Mesh( geometry, material )
mesh.position.y += 2;
scene.add(mesh);

const animate = () => {

  requestAnimationFrame(animate);

	controls.update()
  renderer.render(scene, camera);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
}

animate()
