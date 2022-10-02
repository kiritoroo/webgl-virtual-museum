import * as $ from 'three'
import Experience from '@core/Experience';
import * as TP from 'tweakpane'

class Environment {

  public ambientLight: $.AmbientLight;
  public directionalLight: $.DirectionalLight;
  // public spotLight: $.SpotLight;
  // public pointLight:$.PointLight;
  // public hemisphereLight:$.HemisphereLight;
  // public rectAreaLight :$.RectAreaLight;

  private experience: Experience = new Experience(); 
  private gui = this.experience.gui;

  constructor() {
    // khởi tạo here

    this.ambientLight = new $.AmbientLight(0xffffff, 0.5);
    this.directionalLight = new $.DirectionalLight(0xffffff, 1);
    // this.spotLight = new $.SpotLight('red',20,10);
    // this.pointLight = new $.PointLight('lightyellow',12);
    // this.hemisphereLight = new $.HemisphereLight('blue', 'grey',10);
    // this.rectAreaLight = new $.RectAreaLight('green',15,2.5,3);

    this.init()

  }

  //---------Config----------
  private init() {
    this.configLight();
    this.configDebug();
  }

  private configLight(): void {
    this.ambientLight.position.set(0, 0, 0);

    // config directional light
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.set( 2048, 2048 );
    this.directionalLight.shadow.camera.far = 15;
    this.directionalLight.shadow.normalBias = 0.05;
    this.directionalLight.position.set(0.25, 2, 1.5);

    // this.spotLight.position.set(-1,-6,-7);
    // this.pointLight.position.set(0,0,-6);
    // this.rectAreaLight.position.set(0,0,0);
    // this.hemisphereLight.position.set(0,9,0);
  }

  public update(): void {
    // cập nhật here
    
  }

  private configDebug(): void {
    // config gui debug here, each light is one folder :) 
    const PARAMS = {
      color: '#d6ffa6',
      intensity: 0.5
    }

    const ambientLightFolder = this.gui.addFolder({
      title: 'Ambient Light',
      expanded: false
    });

    ambientLightFolder
      .addInput(PARAMS, 'color', {
        label: 'color',
        picker: 'inline',
        expanded: true
      })
      .on('change', (ev: TP.TpChangeEvent<string>) => {
        this.ambientLight.color = new $.Color(ev.value)
      })

    ambientLightFolder
      .addInput(PARAMS, 'intensity', {
        label: 'intensity',
        picker: 'inline',
        expanded: true,
        step: 0.01,
        min: -1,
        max: 1,
      })
      .on('change', (ev : TP.TpChangeEvent<number>) => {
        this.ambientLight.intensity = ev.value
      })
  }
}




export default Environment;