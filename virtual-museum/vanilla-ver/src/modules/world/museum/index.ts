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
    this.geometry = new $.BoxGeometry(5, 5, 5);
    this.material = new $.MeshStandardMaterial({
      color: new $.Color('tomato')
    })
    this.mesh = new $.Mesh( this.geometry, this.material );

    this.init();
  }

  private init(): void {
    this.configDebug();
  }

  private configDebug(): void {
    const params = {
      color: '#FF6347'
    }

    const boxFolder = this.gui.pane.addFolder({
      title: 'Box',
      expanded: true
    });

    boxFolder
      .addInput(params, 'color', {
        label: 'color',
        picker: 'inline',
        expanded: true
      })
      .on('change', (ev: TP.TpChangeEvent<string>) => {
        this.mesh.material.color = new $.Color(ev.value);
      })
  }

  public update(): void {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}

export default Museum;