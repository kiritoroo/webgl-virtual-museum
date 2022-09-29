import * as $ from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Experience from '@core/Experience';
class Camera {

  public camera: $.PerspectiveCamera;
  public controls: OrbitControls;

  private experience: Experience = new Experience();
  private canvas = this.experience.canvas;
  private size = this.experience.size;

  constructor() {
    this.camera = new $.PegrspectiveCamera(
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
  }

  private configCamera(): void {
    this.camera.position.set( 0, 0, 10 );
    this.camera.lookAt( new $.Vector3() );
  }

  private configControl(): void {
    this.controls.enableDamping = true;
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
}

export default Camera;