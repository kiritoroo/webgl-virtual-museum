import * as $ from 'three';
import Experience from '@core/Experience';

import Museum from '@world/museum';
import Environment from '@world/Environment';

class World {

  public world: $.Group;

  private experience: Experience = new Experience();
  private scene = this.experience.scene;

  private environment: Environment;
  private museum: Museum; 

  constructor() {
    this.world = new $.Group();

    this.museum = new Museum();

    this.environment = new Environment();

    this.init();
  }

  private init(): void {
    this.world.add(this.museum.mesh);
    // thêm environment here
    this.world.add(this.environment.ambientLight);
    // this.world.add(this.environment.directionalLight);
    // this.world.add(this.environment.hemisphereLight);
    // this.world.add(this.environment.pointLight);
    // this.world.add(this.environment.rectAreaLight);
    // this.world.add(this.environment.spotLight);
    
    this.scene.add(this.world);
  }

  public resize(): void {

  }

  public update(): void {
    this.museum.update();
    // cập nhật environment here
    this.environment.update();
  }
}

export default World;