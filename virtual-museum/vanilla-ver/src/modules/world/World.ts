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

    this.init();
  }

  private init(): void {
    this.world.add(this.museum.mesh);
    // thêm environment here
    this.scene.add(this.world);
  }

  public resize(): void {

  }

  public update(): void {
    this.museum.update();
    // cập nhật environment here
  }
}

export default World;