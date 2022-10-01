import Experience from '@/modules/core/Experience';
import * as $ from 'three';
import * as TP from 'tweakpane';

class Floor {

  private geometry: $.PlaneGeometry;
  private material: $.MeshStandardMaterial;
  public mesh: $.Mesh< $.PlaneGeometry, $.MeshStandardMaterial >;

  private experience: Experience = new Experience();
  private gui = this.experience.gui;

  constructor() {
    this.geometry = new $.PlaneGeometry(10, 10);
    this.material = new $.MeshStandardMaterial({
      color: new $.Color(0xffffff),
      side: $.DoubleSide
    })
    this.mesh = new $.Mesh( this.geometry, this.material );

    this.init();
  }

  private init(): void {
    this.mesh.receiveShadow = true;
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.y = -2;

    this.configDebug();
  }

  public update(): void {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }

  private configDebug(): void {

  }
}

export default Floor;