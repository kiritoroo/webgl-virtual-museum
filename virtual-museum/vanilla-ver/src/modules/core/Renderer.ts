import * as $ from 'three';
import Experience from '@core/Experience';

class Renderer {

  public renderer!: $.WebGLRenderer;

  private experience: Experience = new Experience();
  private canvas = this.experience.canvas;
  private size = this.experience.size;

  private scene = this.experience.scene;
  private camera = this.experience.camera;

  constructor() {
    this.renderer = new $.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    })

    this.init();
  }

  //---------- Config ----------
  private init(): void {
    this.configRenderer();
  }

  private configRenderer(): void {
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = $.sRGBEncoding;
    this.renderer.toneMapping = $.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.renderer.shadowMap.enabled = true;

    this.renderer.setClearColor(new $.Color(0xffffff));
    this.renderer.setSize(this.size.width, this.size.height);
    this.renderer.setPixelRatio(this.size.pixelRatio);
  }

  //---------- Event ----------
  public resize(): void {
    this.renderer.setSize(this.size.width, this.size.height);
    this.renderer.setPixelRatio(this.size.pixelRatio);
  }

  // ---------- Update ----------
  public update(): void {
    this.renderer.render(this.scene, this.camera.camera);
  }
}

export default Renderer;