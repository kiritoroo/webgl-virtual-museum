import * as THREE from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from "three/examples/jsm/loaders/gltfloader"
import { DRACOLoader } from "three/examples/jsm/loaders/dracoloader"
//import { GodRaysFakeSunShader, GodRaysDepthMaskShader, GodRaysCombineShader, GodRaysGenerateShader } from 'three/addons/shaders/GodRayShader.js';
//import Stats from 'three/addons/libs/stats.module.js'
import { Camera } from "three";
import { GodRaysFakeSunShader, GodRaysDepthMaskShader, GodRaysCombineShader, GodRaysGenerateShader } from 'three/examples/jsm/shaders/GodRaysShader';
import Stats from 'three/examples/jsm/libs/stats.module'

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


scene.background = new THREE.Color("skyblue")
camera.position.z =10
renderer.setSize(W,H)
renderer.setPixelRatio(devicePixelRatio)
// add mesh, ambientLight, dicrectionLight into scene
scene.add(ambientLight,directionLight)


//
let mesh, stats
const loader = new GLTFLoader()

loader.load('./models/parrot.glb',
  (file) =>{
    console.log(file)
    mesh = file.scene.children[0]
    mesh.position.set(0.5,0.1,0.1)
    scene.add(mesh)   
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total *100) + '% loaded')
  },

  (error) => {
    console.log('Have a problem')
  }
)

// -----------------------------

let sphereMesh, materialDepth

const sunPosition = new THREE.Vector3(0,1000,-1000)
const clipPosition = new THREE.Vector4();
const screenSpacePosition = new THREE.Vector3()

const postProcessing = { enabled: true}

const orbitRadius = 200

const bgColor = 0x000511
const sunColor = 0xffee00

const godrayRenderTargetResolutionMultiplier = 1.0/4.0

materialDepth = new THREE.MeshDepthMaterial()

const materialScene = new THREE.MeshBasicMaterial({color: 0x000000})


// sphere
const geo = new THREE.SphereGeometry(1,20,10)
sphereMesh = new THREE.Mesh(geo, materialScene)
sphereMesh.scale.multiplyScalar(20)
scene.add(sphereMesh)


stats = new Stats()
container.appendChild(stats.dom)



window.addEventListener('resize', onWindowResize)
initPostprocessing(W,H)



function onWindowResize() {

  camera.updateProjectionMatrix();

  renderer.setSize(W,H)
  postProcessing.rtTextureColors.setSize(W,H)
  postProcessing.rtTextureDepth.setSize(W,H)
  postProcessing.rtTextureDepthMask.setSize(W,H)
  
  const adjustedWidth = W * godrayRenderTargetResolutionMultiplier
  const adjustedHeight = H * godrayRenderTargetResolutionMultiplier
  postProcessing.rtTextureGodRays1.setSize(adjustedWidth,adjustedHeight)
  postProcessing.rtTextureGodRays2.setSize(adjustedWidth,adjustedHeight)

}

function initPostprocessing(renderTargetWidth, renderTargetHeight) {
  postProcessing.scene = new THREE.Scene()

  postProcessing.camera = new THREE.OrthographicCamera(-0.5,0.5,0.5,-0.5,-10000,10000)
  postProcessing.camera.position.z = 100

  postProcessing.scene.add(postProcessing.camera)

  postProcessing.rtTextureColors = new THREE.WebGLRenderTarget(renderTargetWidth, renderTargetHeight)
  postProcessing.rtTextureDepth = new THREE.WebGLRenderTarget(renderTargetWidth,renderTargetHeight)

  const adjustedWidth = renderTargetWidth * godrayRenderTargetResolutionMultiplier
  const adjustedHeight = renderTargetHeight *godrayRenderTargetResolutionMultiplier

  postProcessing.rtTextureGodRays1 = new THREE.WebGLRenderTarget(adjustedWidth,adjustedHeight)
  postProcessing.rtTextureGodRays2 = new THREE.WebGLRenderTarget(adjustedWidth,adjustedHeight)


  // god ray shaders
  const godRaysDepthMaskShader = GodRaysDepthMaskShader
  postProcessing.godrayMaskUniforms = THREE.UniformsUtils.clone(godraysMaskShader.uniforms)
  postProcessing.materialGodraysDepthMask = new THREE.ShaderMaterial({
    
    uniforms: postProcessing.godrayMaskUniforms,
    vertexShader: godraysMaskShader.vertexShader,
    fragmentShader: godraysMaskShader.fragmentShader
  })

  const godraysGenShader = GodRaysGenerateShader;
  postProcessing.godrayGenUniforms = THREE.UniformsUtils.clone(godraysGenShader.uniforms)
  postProcessing.materialGodraysGenerate = new THREE.ShaderMaterial ({
    
    uniforms: postProcessing.godrayGenUniforms,
    vertexShader: godraysGenShader.vertexShader,
    fragmentShader: godraysGenShader.fragmentShader
  })

  const godRaysCombineShader = GodRaysCombineShader
  postProcessing.godrayCombineUniforms = THREE.UniformsUtils.clone(godRaysCombineShader.uniforms)
  postProcessing.materialGodraysCombine = new THREE.ShaderMaterial({
    uniforms: postProcessing.godrayCombineUniforms,
    vertexShader: godRaysCombineShader.vertexShader,
    fragmentShader: godRaysCombineShader.fragmentShader
  })

  const godRaysFakeSunShader = GodRaysFakeSunShader
  postProcessing.godrayFakeSunUniforms = THREE.UniformsUtils.clone(godRaysFakeSunShader.uniforms)
  postProcessing.materialGodraysFakeSun = new THREE.ShaderMaterial({
    uniforms: postProcessing.godrayFakeSunUniforms,
    vertexShader: godRaysFakeSunShader.vertexShader,
    fragmentShader: godrayFakeSunUniforms.fragmentShader
  })
  
  postProcessing.godrayFakeSunUniforms.bgColor.value.setHex(bgColor)
  postProcessing.godrayFakeSunUniforms.sunColor.value.setHex(sunColor)

  postProcessing.godrayCombineUniforms.fGodRayIntensity.value = 0.75

  postProcessing.quad = new THREE.Mesh(
    new THREE.PlaneGeometry(1.0, 1.0),
    postProcessing.materialGodraysGenerate
  )

  postProcessing.quad.position.z = -9900
  postProcessing.scene.add(postProcessing.quad)
}

function getStepSize (filterLen, tapsPerPass, pass) {
  return filterLen * Math.pow(tapsPerPass, - pass)
}

function filterGodRays(inputTex, renderTarget, stepSize) {
  postProcessing.scene.overrideMaterial = postProcessing.materialGodraysGenerate

  postProcessing.godrayGenUniforms[ 'fStepSize'].value = stepSize
  postProcessing.godrayGenUniforms[ 'tInput' ].value = inputTex

  renderer.setRenderTarget(renderTarget)
  renderer.render(postProcessing.scene, postProcessing.camera)
  postProcessing.scene.overrideMaterial = null
}

function render() {
  const time = Date.now() / 4000

  sphereMesh.position.x = orbitRadius * Math.cos(time)
  sphereMesh.position.z = orbitRadius * Math.sin(time) -100
  
  if (postProcessing.enabled){
    clipPosition.x = sunPosition.x
    clipPosition.y = sunPosition.y
    clipPosition.z = sunPosition.z
    clipPosition.w = 1

    clipPosition.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix)

    clipPosition.x /= clipPosition.w
    clipPosition.y /= clipPosition.w

    screenSpacePosition.x = ( clipPosition.x + 1) /2
    screenSpacePosition.y = ( clipPosition.y + 1) /2
    screenSpacePosition.z = clipPosition.z

    postProcessing.godrayGenUniforms[ 'vSunPositionScreenSpace'].value.copy(screenSpacePosition)
    postProcessing.godrayFakeSunUniforms[ 'vSunPositionScreenSpace'].value.copy(screenSpacePosition)


    renderer.setRenderTarget(postProcessing.rtTextureColors)
    renderer.clear(true, true, true)

    const sunsqH = 0.74 *H
    const sunsqW = 0.74 *H

    screenSpacePosition.x *=W
    screenSpacePosition.y *=H

    renderer.setScissor(screenSpacePosition.x-sunsqW/2,screenSpacePosition.y - sunsqH/2, sunsqW, sunsqH)
    renderer.setScissorTest(true)

    postProcessing.godrayFakeSunUniforms[ 'fAspect'].value = W/H
    postProcessing.scene.overrideMaterial = postProcessing.materialGodraysFakeSun
    renderer.setRenderTarget(postProcessing.rtTextureColors)
    renderer.render(postProcessing.scene, postProcessing.camera)

    renderer.setScissorTest(false)

    // --- draw scene objects ----
    // colors

    scene.overrideMaterial = null
    renderer.setRenderTarget(postProcessing.rtTextureColors)
    renderer.render(scene, camera)

    // depth

    scene.overrideMaterial = materialDepth
    renderer.setRenderTarget(postProcessing.rtTextureDepth)
    renderer.clear()
    renderer.render(scene,camera)
    //
    postProcessing.godrayMaskUniforms['tInput'].value = postProcessing.rtTextureDepth.texture

    postProcessing.scene.overrideMaterial = postProcessing.materialGodraysDepthMask
    renderer.setRenderTarget(postProcessing.rtTextureDepthMask)
    renderer.render(postProcessing.scene, postProcessing.camera)
    //---render godrays

    const filterLen = 1.0
    const TAPS_PER_PASS = 6.0

    // pass 1 - render into first ping-pong targer 
    filterGodRays(postProcessing.rtTextureDepthMask.texture, postProcessing.rtTextureGodRays2,getStepSize(filterLen,TAPS_PER_PASS,1.0))
    // pass 2 - render into second ping-pong target
    filterGodRays(postProcessing.rtTextureGodRays2.texture, postProcessing.rtTextureGodRays1,getStepSize(filterLen, TAPS_PER_PASS,2.0))
    // pass 3 - 1st RT
    filterGodRays(postProcessing.rtTextureGodRays1.texture, postProcessing.rtTextureGodRays2,getStepSize(filterLen, TAPS_PER_PASS,3.0))
    // final pass - composite god-rays onto colors
    postProcessing.godrayCombineUniforms['tColors'].value = postProcessing.rtTextureColors.texture
    postProcessing.godrayCombineUniforms['tGodRays'].value = postProcessing.rtTextureGodRays2.texture

    postProcessing.scene.overrideMaterial = postProcessing.materialGodraysCombine
    renderer.setRenderTarget(null)
    renderer.render(postProcessing.scene, postProcessing.camera)
    postProcessing.scene.overrideMaterial = null

  }else {
    renderer.setRenderTarget(null)
    renderer.clear()
    renderer.render(scene,camera)  
  }
}


function animate() {
  render()
  renderer.render(scene,camera)
  control.update()
  

  // if (mesh) {
  //   // mesh.parrot.rotation.z += 0.04
  //   mesh.rotation.z += 0.04
  // }

  window.requestAnimationFrame(animate)

}

animate()