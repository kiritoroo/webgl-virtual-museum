import * as $ from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Experience from '@core/Experience';
class Camera {

  public camera: $.PerspectiveCamera;
  public controls: OrbitControls;

  private experience: Experience = new Experience();
  private canvas = this.experience.canvas;
  private size = this.experience.size;
  private gui = this.experience.gui;

  constructor() {
    this.camera = new $.PerspectiveCamera(
      75,
      this.size.aspect,
      0.1,
      1000
    )

    this.controls = new OrbitControls(
      this.camera, 
      this.canvas
    );

    this.init();
  }

  //---------- Config ----------
  private init(): void {
    this.configCamera();
    this.configControl();
    this.configDebug();
  }

  private configCamera(): void {
    // this.camera.position.set( 0, 5, 10 );
    // this.camera.lookAt( new $.Vector3() );
  }

  private configControl(): void {
    this.controls.enabled = false;
    this.controls.enableDamping = false;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.enableRotate = true;
  }

  //---------- Event ----------
  public resize(): void {
    this.camera.aspect = this.size.aspect;
    this.camera.updateProjectionMatrix();
  }

  // ---------- Update ----------
  public update(): void {
    this.controls.update();
  }

  private configDebug(): void {

    const PARAMS = {
      sphericalTarget: { 
        x: -Math.PI / 1.7,
        y: Math.PI,
        z: 0
      }
    }

    const cameraFolder = this.gui.addFolder({
      title: 'Camera',
      expanded: false
    })

    cameraFolder.addInput(PARAMS, 'sphericalTarget', {
      expanded: false
    }).on("change", (ev) => {
      let sphTarget = new $.Spherical(
        ev.value.x,
        ev.value.y,
        ev.value.z,
      );
      let target = new $.Vector3(
        this.camera.position.x,
        this.camera.position.y,
        this.camera.position.z,
      ).setFromSpherical(sphTarget)
      this.controls.target = target;
    })
  }
}

export default Camera;