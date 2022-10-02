import * as $ from 'three';
import Experience from '@core/Experience';

import Sky from '@world/env/Sky';
import LightShaft from '@world/env/LightShaft';
import Environment from '@world/env/Environment';
import Floor from '@world/floor/Floor';
import Museum from '@world/museum';

class World {

  public world: $.Group;

  private experience: Experience = new Experience();
  private scene = this.experience.scene;

  private sky: Sky;
  private lightShaft: LightShaft;
  private environment: Environment;
  private floor: Floor;
  private museum: Museum; 

  constructor() {
    this.world = new $.Group();

    this.sky = new Sky();
    this.lightShaft = new LightShaft();
    this.environment = new Environment();
    this.floor = new Floor();

    this.museum = new Museum();

    this.init();
  }

  private init(): void {
    // thêm environment here
    this.world.add(this.environment.ambientLight);
    this.world.add(this.environment.directionalLight);
    // this.world.add(this.environment.hemisphereLight);
    // this.world.add(this.environment.pointLight);
    // this.world.add(this.environment.rectAreaLight);
    // this.world.add(this.environment.spotLight);

    this.world.add(this.sky);
    this.world.add(this.lightShaft.mesh);
    // this.world.add(this.floor.mesh);
    
    // this.world.add(this.museum.mesh);
    this.world.add(this.museum.museum);

    this.scene.add(this.world);
  }

  public resize(): void {

  }

  public update(): void {
    this.museum.update();
    // cập nhật environment here
    this.environment.update();
    this.lightShaft.update();
  }
}

export default World;