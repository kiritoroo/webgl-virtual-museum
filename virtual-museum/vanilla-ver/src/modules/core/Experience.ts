import * as $ from 'three';
import jQuery from 'jquery';
import { emitEvent } from '@plugin/event';

import Camera from '@core/Camera';
import Renderer from '@core/Renderer';

import Size from '@util/Size';
import Time from '@util/Time';
import GUI from '@util/GUI';

import Sky from '../world/env/Sky';
import World from '@world/World';

import assets from '@util/assets';
import Resources from '@util/Resources';
import Test from '@test/index';

import CameraControl from '@anim/CameraControl';

class Experience {

  private static instance: Experience | undefined = undefined;

  public readonly scene!: $.Scene;

  public readonly size!: Size;
  public readonly time!: Time;
  public readonly gui!: GUI;

  public readonly camera!: Camera; 
  public readonly renderer!: Renderer;

  public readonly resources!: Resources;

  private sky!: Sky;
  public world!: World;

  private test!: Test;

  private cameraControl!: CameraControl;

  public isDiscover!: boolean;

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
    
    //---------- Resources
    this.resources = new Resources(assets)

    this.sky = new Sky();

    this.cameraControl = new CameraControl();

    this.isDiscover = false;
    
    this.init();
  }

  private init(): void {
    this.configScene();
    this.bindEvent();

    this.resources
      .on('e_res_ready', () => {
        jQuery<HTMLElement>( ".p_index" ).addClass( 'inView' );
        jQuery<HTMLElement>( ".p_index__btn" ).on("click", () => {
          jQuery(".contents.p_index").removeClass( 'inView' );
          jQuery(".contents.p_index,  .contents.p_index *").remove();
          this.cameraControl.motionIntro()
          this.cameraControl.on('e_motion_done', () => {
            this.isDiscover = true;
            // set target for controls
            let sphericalTarget = new $.Spherical(-1.7943024895, 3.1415926536, 0);
            let target = new $.Vector3(
              this.camera.camera.position.x,
              this.camera.camera.position.y,
              this.camera.camera.position.z,
            ).setFromSpherical(sphericalTarget)

            this.camera.controls.target = target;
            this.camera.controls.enabled = true;
            this.camera.controls.enableDamping = true;
          })
          emitEvent('eDiscover');
        })
        // this.scene.remove( this.sky );

        //---------- World
        this.world = new World();
        // this.test = new Test();
      })
  }

  private configScene(): void {
    this.scene.fog = new $.FogExp2(0xececec, 0.005);
    // this.scene.background = new $.Color(0x272727);
    this.scene.background = this.resources.items['hdr_modernBuilding'];
    this.scene.environment = this.resources.items['hdr_modernBuilding'];
    this.scene.add( this.sky );
  }

  private bindEvent(): void {
    document.addEventListener('eResize', () => this.resize());
    document.addEventListener('eUpdate', () => this.update());
  }

  private resize(): void {
    this.camera.resize();
    if ( this.world )  this.world.resize();
    this.renderer.resize();
  }

  private update(): void {
    this.gui.fpsGraph.begin();

    if (this.isDiscover) this.camera.update();
    
    if ( this.world ) this.world.update();
    if ( this.test ) this.test.update();

    this.renderer.update();

    this.gui.fpsGraph.end();
  }
}

export default Experience;