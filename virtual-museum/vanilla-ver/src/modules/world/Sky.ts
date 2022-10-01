import * as $ from 'three';

import { skyPARAMS, skyUniforms } from '@type/type';
import Experience from '@core/Experience';

import vertex from '@shader/sky/vertex.vs.glsl';
import fragment from '@shader/sky/fragment.fs.glsl';


class Sky extends $.Mesh< $.BoxGeometry, $.ShaderMaterial > {

  private skyPARAMS: skyPARAMS;

  private experience: Experience = new Experience();
  private gui = this.experience.gui;

  constructor() {
    const uniforms: skyUniforms = {
      turbidity: { value: 2 },
      rayleigh: { value: 1 },
      mieCoefficient: { value: 0.005 },
      mieDirectionalG: { value: 0.8 },
      sunPosition: { value: new $.Vector3() },
      up: { value: new $.Vector3( 0, 1, 0 ) }
    }
    const geometry: $.BoxGeometry = new $.BoxGeometry( 1, 1, 1 );
    const material: $.ShaderMaterial = new $.ShaderMaterial({
      name: 'SkyShader',
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      side: $.BackSide,
      depthWrite: false
    })

    super( geometry, material );

    this.skyPARAMS = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 2,
      azimuth: 180
    }

    this.init();
  }

  private init(): void {
    this.material.uniformsNeedUpdate = true;
    
    this.configSky();
    this.configDebug();
  }

  private configSky(): void {
    this.scale.setScalar( 450000 );
  }

  private configDebug(): void {
    const skyFolder = this.gui.addFolder({
      title: 'Sky',
      expanded: false
    })

    skyFolder.addInput(this.skyPARAMS, 'turbidity', { min: 0.0, max: 20.0, step: 0.1 }).on("change", () => this.onGuiChange());
    skyFolder.addInput(this.skyPARAMS, 'rayleigh', { min: 0.0, max: 4, step: 0.001 }).on("change", () => this.onGuiChange());
    skyFolder.addInput(this.skyPARAMS, 'mieCoefficient', { min: 0.0, max: 0.1, step: 0.001 }).on("change", () => this.onGuiChange());
    skyFolder.addInput(this.skyPARAMS, 'mieDirectionalG', { min: 0.0, max: 1, step: 0.001 }).on("change", () => this.onGuiChange());
    skyFolder.addInput(this.skyPARAMS, 'elevation', { min: -90, max: 90, step: 0.01 }).on("change", () => this.onGuiChange());
    skyFolder.addInput(this.skyPARAMS, 'azimuth', { min: -180, max: 180, step: 0.1 }).on("change", () => this.onGuiChange());

    this.onGuiChange();
  }

  private onGuiChange(): void {
    const uniforms: skyUniforms = this.material.uniforms;
    uniforms['turbidity']!.value = this.skyPARAMS.turbidity;
    uniforms['rayleigh']!.value = this.skyPARAMS.rayleigh;
    uniforms['mieCoefficient']!.value = this.skyPARAMS.mieCoefficient;
    uniforms['mieDirectionalG']!.value = this.skyPARAMS.mieDirectionalG;

    const phi = $.MathUtils.degToRad( 90 - this.skyPARAMS.elevation);
    const theta = $.MathUtils.degToRad( this.skyPARAMS.azimuth );
    const sun = new $.Vector3();
    sun.setFromSphericalCoords( 1, phi, theta );

    uniforms['sunPosition']!.value.copy( sun );
  }
}

export default Sky;