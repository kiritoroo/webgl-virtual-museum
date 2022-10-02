import Experience from '@/modules/core/Experience';
import * as $ from 'three';

class TestShadow {

  public model!: $.Group;
  public floor!: $.Mesh;
  public ambientLight: $.AmbientLight;
  public hemiLight: $.HemisphereLight;
  public dirlLight: $.DirectionalLight;

  private experience: Experience = new Experience();
  private resources = this.experience.resources;
  private scene = this.experience.scene;

  constructor() {
    this.model = new $.Group();
    this.model = this.resources.items['m_ancientGreek'].scene as $.Group;
    
    this.ambientLight = new $.AmbientLight( 0xffffff, 0.5 );
    this.hemiLight = new $.HemisphereLight( 0xffffff, 0.5 );
    this.dirlLight = new $.DirectionalLight( 0xffffff, 1 );

    this.init();
  }

  private init(): void {
    this.model.castShadow = true;

    this.configLight();
    this.configModel();
    this.createFloor();
    this.configDebug();

    this.scene.add( this.model );
    this.scene.add( this.floor );
    this.scene.add( this.ambientLight );
    this.scene.add( this.hemiLight );
    this.scene.add( this.dirlLight );
  }

  private configLight(): void {
    this.ambientLight.position.set(0, 2, 5);
		this.hemiLight.position.set( 0, 1, 0 );

    const dirlLight_helper = new $.DirectionalLightHelper(  this.dirlLight, 5 );
    this.scene.add(dirlLight_helper);

    this.dirlLight.position.set(1, 6, 2);
    this.dirlLight.castShadow = true;
    this.dirlLight.shadow.camera.top = 10;
    this.dirlLight.shadow.camera.bottom = -10;
    this.dirlLight.shadow.camera.left = -10;
    this.dirlLight.shadow.camera.right = 10;
    this.dirlLight.shadow.camera.near = 0.1;
    this.dirlLight.shadow.camera.far = 10
    this.dirlLight.shadow.normalBias = 0.05;
    this.dirlLight.shadow.mapSize.set( 2048, 2048 );
  }

  private configModel(): void {
    this.model.traverse((node) => {
      if (node.isObject3D) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    })
    this.model.receiveShadow = true;
    this.model.castShadow = true;
    this.model.scale.set( 5, 5, 5 );
  }

  private createFloor(): void {
    const geometry = new $.PlaneGeometry(20, 20);
    const material = new $.MeshStandardMaterial({
      color: new $.Color(0xffffff),
      side: $.DoubleSide
    })
    this.floor = new $.Mesh( geometry, material );

    this.model.castShadow = true;
    this.floor.receiveShadow = true;
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.y = -2;
  }

  public update(): void {
    this.model.rotation.y += 0.01;
  }

  private configDebug(): void {

  }
}

export default TestShadow;