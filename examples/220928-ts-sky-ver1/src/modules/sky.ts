import * as THREE from 'three';

import vertex from '../shaders/sky/vertex.vs.glsl';
import fragment from '../shaders/sky/fragment.fs.glsl';

const uniforms = {
  luminance: { value: 1 },
  turbidity: { value: 2 },
  rayleigh: { value: 1 },
  mieCoefficient: { value: 0.005 },
  mieDirectionalG: { value: 0.8 },
  sunPosition: { value: new THREE.Vector3() },
}; 

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material: THREE.ShaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    side: THREE.BackSide
});

const sky: THREE.Mesh<THREE.BoxGeometry, THREE.ShaderMaterial> = new THREE.Mesh( geometry, material );

export default sky;