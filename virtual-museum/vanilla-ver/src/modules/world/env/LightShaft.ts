import Experience from '@core/Experience';
import * as $ from 'three';
import gsap from 'gsap';

class LightShaft {

  private numberOfShafts: number;
  private cusUniforms: any;
  public mesh!: $.InstancedMesh< $.PlaneGeometry, $.MeshBasicMaterial >;
  private isTrans: boolean;
  
  private experience: Experience = new Experience();
  private resources = this.experience.resources;
  private gui = this.experience.gui;
  private time = this.experience.time;

  constructor() {
    this.numberOfShafts = 25;
    this.isTrans = false;

    this.init();
  }

  private init(): void {
    this.createInstand();
    this.configInstand();
    this.configDebug();
  }

  private createInstand(): void {
    this.cusUniforms = {
      uTime: { value: 0 }
    }
    const geometry: $.PlaneGeometry = new $.PlaneGeometry(0.5, 3);
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
        diffuseColor.a *= (1.55 * sin((uTime + vRandom) * .5) - 0.25 - (vRandom * 0.005));
        `
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
      position: [(index * spacing) % 5, Math.random() * 2, Math.random() * 1],
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
    this.mesh.position.set(-2, 2, 0.2);
  }

  public update(): void {
    // this.cusUniforms.uTime.value = this.time.delta;

    if (!this.isTrans) {
      this.isTrans = true;
      gsap.to(this.cusUniforms.uTime, {
        duration: 2,
        value: this.time.delta % 3,
        ease: 'slowmo',
        onComplete: () => {
          this.isTrans = false;
        }
      }).play()
    }
  }

  private configDebug(): void {
    const PARAMS = {
      uTime: 0
    }
    
    const lightShaftFolder = this.gui.addFolder({
      title: 'Light Shaft',
      expanded: false
    })

    lightShaftFolder.addInput(PARAMS, 'uTime', {
      min: 0.0,
      max: 2,
      step: 0.001
    }).on("change", (ev) => {
      this.cusUniforms.uTime.value = ev.value;
    })
  }
}

export default LightShaft;