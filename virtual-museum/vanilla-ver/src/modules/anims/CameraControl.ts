import * as $ from 'three';
import Experience from "@core/Experience";
import gsap from "gsap";
import { Vector3 } from 'three';

class CameraControl {

  private experience: Experience = new Experience();
  private camera = this.experience.camera;
  private motionIntroPARAMS: any;

  constructor() {
    this.motionIntroPARAMS = {
      firstMotion: {
        position: new Vector3(0, 15, 5),
        rotation: new Vector3(0, 0, 0),
        duration: 0
      },
      secondMotion: {
        position: new Vector3(0, 1, 3),
        rotation: new Vector3(Math.PI / 12, 0, 0),
        duration: 3
      }
    }

    this.initCamera();
  }

  private initCamera(): void {
    const { position, rotation } = this.motionIntroPARAMS['firstMotion'];
    this.camera.camera.position.set( position.x, position.y, position.z );
    this.camera.camera.rotation.set( rotation.x, rotation.y, rotation.z );
  }
  
  public motionIntro(): void {
    let timeline = gsap.timeline();
    timeline
    .addLabel("timeline1")
    .to(this.camera.camera.position, {
      x: () => this.motionIntroPARAMS['secondMotion'].position.x,
      y: () => this.motionIntroPARAMS['secondMotion'].position.y,
      z: () => this.motionIntroPARAMS['secondMotion'].position.z,
      ease: 'slowmo',
      duration: this.motionIntroPARAMS['secondMotion'].duration as number,
    })
    .to(this.camera.camera.rotation, {
      x: () => this.motionIntroPARAMS['secondMotion'].rotation.x,
      y: () => this.motionIntroPARAMS['secondMotion'].rotation.y,
      z: () => this.motionIntroPARAMS['secondMotion'].rotation.z,
      ease: 'slowmo',
      duration: this.motionIntroPARAMS['secondMotion'].duration as number
    }, "<")

    timeline.play();
  }

  public update(): void {
    
  }
}

export default CameraControl;