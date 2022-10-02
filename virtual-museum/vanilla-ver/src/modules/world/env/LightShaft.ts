import Experience from '@core/Experience';
import * as $ from 'three';

class LightShaft {

  private numberOfShafts: number;
  private cusUniforms: any;
  public mesh!: $.InstancedMesh< $.PlaneGeometry, $.MeshBasicMaterial >;

  private experience: Experience = new Experience();
  private resources = this.experience.resources;
  private time = this.experience.time;

  constructor() {
    this.numberOfShafts = 50;

    this.init();
  }

  private init(): void {
    this.createInstand();
    this.configInstand();
  }

  private createInstand(): void {
    this.cusUniforms = {
      uTime: { value: 0 }
    }
    const geometry: $.PlaneGeometry = new $.PlaneGeometry(0.5, 2);
    const texture = this.resources.items['t_lightShaft'];
    const material: $.MeshBasicMaterial = new $.MeshBasicMaterial({
      transparent: true,
      blending: $.AdditiveBlending,
      depthWrite: false,
      alphaMap: texture,
      color: new $.Color(1, 0.7, 0.5),
      side: $.DoubleSide
    })
    material.onBeforeCompile = (shader: $.Shader) => {
      shader.uniforms.uTime = this.cusUniforms.uTime;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",

        `#include <common>
        uniform float uTime;
        varying float vRandom;
        attribute float random;`
      )

      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",

        `#include <begin_vertex>
        //transformed.x += uTime;
        vRandom = random;`
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",

        `#include <common>
        uniform float uTime;
        varying float vRandom;`
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <alphamap_fragment>",
        
        `#include <alphamap_fragment>
        diffuseColor.a *= (1.25 * sin((uTime + vRandom) * .5) - 0.25 - (vRandom * 0.005));`
      )
    }

    const randoms = Array.from({ length: this.numberOfShafts }, (value, index) => {
      return Math.random() * 100
    })

    const randomBuffer = new $.InstancedBufferAttribute(new Float32Array(randoms), 1);
    geometry.setAttribute("random", randomBuffer);

    this.mesh = new $.InstancedMesh( geometry, material, this.numberOfShafts );
    this.mesh.instanceMatrix.setUsage( $.DynamicDrawUsage );
  }

  private configInstand(): void {
    const spacing = 0.4 / 2;
    const positions = Array.from({ length: this.numberOfShafts }, (value, index) => ({
      position: [(index * spacing) % 5, Math.random() * 2, Math.random() * 5],
      scale: [1.5 + Math.random(), 2 + Math.random() * 1.25, 1]
    }))

    const dummy = new $.Object3D();
    for (let i = 0; i < this.numberOfShafts; i ++) {
      dummy.position.set(
        positions[i].position[0],
        positions[i].position[1],
        positions[i].position[2]
      )

      dummy.scale.set(
        positions[i].scale[0],
        positions[i].scale[1],
        positions[i].scale[2],
      )

      dummy.updateMatrix();

      this.mesh.setMatrixAt( i++, dummy.matrix );
    }
    this.mesh.instanceMatrix.needsUpdate = true;

    this.mesh.rotation.set(-Math.PI / 8, 0, Math.PI / 8);
    this.mesh.position.set(-2, 2.5, -2);
  }

  public update(): void {
    this.cusUniforms.uTime.value = this.time.delta * 0.005;
  }
}

export default LightShaft;