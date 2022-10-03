import * as $ from 'three';
import Experience from '@core/Experience';

class Renderer {

  public renderer!: $.WebGLRenderer;

  private experience: Experience = new Experience();
  private canvas = this.experience.canvas;
  private size = this.experience.size;
  private gui = this.experience.gui;

  private scene = this.experience.scene;
  private camera = this.experience.camera;

  constructor() {
    this.renderer = new $.WebGLRenderer({
      // screenshot
      preserveDrawingBuffer: true,
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    })

    this.init();
  }

  //---------- Config ----------
  private init(): void {
    this.configRenderer();
    this.configDebug();
  }

  private configRenderer(): void {
    // real shadows
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = $.PCFShadowMap;
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = $.sRGBEncoding;
    this.renderer.toneMapping = $.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    // this.renderer.setClearColor(new $.Color(0xffffff));
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

  private configDebug(): void {
    const PARAMS = {
      outputEncoding: $.sRGBEncoding,
      shadowMap: $.PCFShadowMap,
      toneMapping: $.ACESFilmicToneMapping
    }

    const renderFolder = this.gui.addFolder({
      title: 'Renderer',
      expanded: false
    })

    renderFolder.addInput(PARAMS, 'outputEncoding', {
      options: {
        sRGB: $.sRGBEncoding,
        Linear: $.LinearEncoding,
        BasicDepth: $.BasicDepthPacking,
        RGBADepth: $.RGBADepthPacking
      }
    }).on("change", (ev) => {
      this.renderer.outputEncoding = ev.value;
    })

    renderFolder.addInput(PARAMS, 'shadowMap', {
      options: {
        Basic: $.BasicShadowMap,
        VSM: $.VSMShadowMap,
        PCF: $.PCFShadowMap,
        PCFSoft: $.PCFSoftShadowMap,
        WebGL: $.WebGLShadowMap,
      }
    }).on("change", (ev) => {
      this.renderer.shadowMap.type = ev.value;
    })
    
    renderFolder.addInput(PARAMS, 'toneMapping', {
      options: {
        None: $.NoToneMapping,
        Linear: $.LinearToneMapping,
        Reinhard: $.ReinhardToneMapping,
        Cineon: $.CineonToneMapping,
        ACESFilm: $.ACESFilmicToneMapping,
        Custom: $.CustomToneMapping
      }
    }).on("change", (ev) => {
      this.renderer.toneMapping = ev.value;
    })
  }
}

export default Renderer;