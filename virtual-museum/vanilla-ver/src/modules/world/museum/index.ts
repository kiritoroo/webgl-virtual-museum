import Experience from '@/modules/core/Experience';
import * as $ from 'three';
import * as TP from 'tweakpane';

class Museum {

  public model: $.Group; //demo

  private experience: Experience = new Experience();
  private resources = this.experience.resources;
  private gui = this.experience.gui;

  constructor() {
    this.model = new $.Group(); //demo
    this.model = this.resources.items['m_vrGallery'].scene as $.Group; //demo

    this.init();
  }

  private init(): void {
    this.model.castShadow = true;
    this.model.receiveShadow = true;

    this.configDebug();
  }

  public update(): void {

  }

  private configDebug(): void {

  }
}

export default Museum;