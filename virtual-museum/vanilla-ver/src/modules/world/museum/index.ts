import * as $ from 'three';

class Museum {

  private geometry: $.BoxGeometry;
  private material: $.MeshStandardMaterial;
  public mesh: $.Mesh< $.BoxGeometry, $.MeshStandardMaterial >;

  constructor() {
    this.geometry = new $.BoxGeometry(5, 5, 5);
    this.material = new $.MeshStandardMaterial({
      color: new $.Color('tomato')
    })
    this.mesh = new $.Mesh( this.geometry, this.material );
  }

  public update(): void {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}

export default Museum;