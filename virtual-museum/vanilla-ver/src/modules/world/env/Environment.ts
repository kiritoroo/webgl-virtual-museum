import * as $ from 'three'
import Experience from '@core/Experience';
import * as TP from 'tweakpane'

class Environment {

  public ambientLight: $.AmbientLight;
  public hemiLight: $.HemisphereLight;
  public dirlLight: $.DirectionalLight;

  private experience: Experience = new Experience();
  private scene = this.experience.scene;
  private gui = this.experience.gui;

  constructor() {

    this.ambientLight = new $.AmbientLight( 0xffffff, 0.5 );
    this.hemiLight = new $.HemisphereLight( 0xffffff, 0.5 );
    this.dirlLight = new $.DirectionalLight( 0xffffff, 1 );

    this.init()

  }

  //---------Config----------
  private init() {
    this.configLight();
    this.configDebug();
  }

  private configLight(): void {
    this.ambientLight.position.set(0, 2, 5);
		this.hemiLight.position.set( 0, 1, 0 );

    const dirlLight_helper = new $.DirectionalLightHelper(  this.dirlLight, 5 );
    // this.scene.add(dirlLight_helper);

    this.dirlLight.position.set(1, 10, 2);
    this.dirlLight.castShadow = true;
    this.dirlLight.shadow.camera.top = 10;
    this.dirlLight.shadow.camera.bottom = -10;
    this.dirlLight.shadow.camera.left = -10;
    this.dirlLight.shadow.camera.right = 10;
    this.dirlLight.shadow.camera.near = 0.1;
    this.dirlLight.shadow.camera.far = 10
    this.dirlLight.shadow.normalBias = 0.05;
    this.dirlLight.shadow.mapSize.set( 2048, 2048 );
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