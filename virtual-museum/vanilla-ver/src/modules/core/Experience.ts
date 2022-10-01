import * as $ from 'three';

import Camera from '@core/Camera';
import Renderer from '@core/Renderer';

import Size from '@util/Size';
import Time from '@util/Time';
import GUI from '@util/GUI';

import World from '@world/World';

class Experience {

  private static instance: Experience | undefined = undefined;

  public readonly scene!: $.Scene;

  public readonly size!: Size;
  public readonly time!: Time;
  public readonly gui!: GUI;

  public readonly camera!: Camera; 
  public readonly renderer!: Renderer;

  public world!: World;

  constructor(readonly canvas?: HTMLCanvasElement) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;

    this.scene = new $.Scene();

    //---------- Utils
    this.size = new Size();
    this.time = new Time();
    this.gui = new GUI();

    //---------- Core
    this.camera = new Camera();
    this.renderer = new Renderer();
    
    //---------- World
    this.world = new World();

    this.init();
  }

  private init(): void {
    this.configScene();
    this.bindEvent();
  }

  private configScene(): void {
    this.scene.fog = new $.FogExp2(0xececec, 0.05);
    // this.scene.background = new $.Color(0x272727);
  }

  private bindEvent(): void {
    document.addEventListener('eResize', () => this.resize());
    document.addEventListener('eUpdate', () => this.update());
  }

  private resize(): void {
    this.camera.resize();
    this.world.resize();
    this.renderer.resize();
  }

  private update(): void {
    this.gui.fpsGraph.begin();

    this.camera.update();
    this.world.update();
    this.renderer.update();

    this.gui.fpsGraph.end();
  }
}

export default Experience;