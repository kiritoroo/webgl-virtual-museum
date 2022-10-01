import Experience from '@/modules/core/Experience';
import * as $ from 'three';
import * as TP from 'tweakpane';

class Museum {

  private geometry: $.BoxGeometry;
  private material: $.MeshStandardMaterial;
  public mesh: $.Mesh< $.BoxGeometry, $.MeshStandardMaterial >;

  private experience: Experience = new Experience();
  private gui = this.experience.gui;

  constructor() {
    this.geometry = new $.BoxGeometry(1, 1, 1);
    this.material = new $.MeshStandardMaterial({
      color: new $.Color(0xd6ffa6),
      roughness: 1,
    })
    this.mesh = new $.Mesh( this.geometry, this.material );

    this.init();
  }

  private init(): void {
    this.mesh.castShadow = true;

    this.configDebug();
  }

  public update(): void {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }

  private configDebug(): void {
    const PARAMS = {
      color: '#d6ffa6'
    }

    const boxFolder = this.gui.addFolder({
      title: 'Box',
      expanded: false
    });

    boxFolder
      .addInput(PARAMS, 'color', {
        label: 'color',
        picker: 'inline',
        expanded: true
      })
      .on('change', (ev: TP.TpChangeEvent<string>) => {
        this.mesh.material.color = new $.Color(ev.value);
      })
  }
}

export default Museum;