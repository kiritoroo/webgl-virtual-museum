import * as $ from 'three'

class Environment {

  public ambientLight: $.AmbientLight;
  public directionalLight: $.DirectionalLight;
  public spotLight: $.SpotLight
  public pointLight:$.PointLight
  public hemisphereLight:$.HemisphereLight
  public rectAreaLight :$.RectAreaLight
  constructor() {
    // khởi tạo here

    this.ambientLight = new $.AmbientLight('white', 0.6)
    this.directionalLight = new $.DirectionalLight('lightblue',2)
    this.spotLight = new $.SpotLight('red',20,10)
    this.pointLight = new $.PointLight('lightyellow',12)
    this.hemisphereLight = new $.HemisphereLight('blue', 'grey',10)
    this.rectAreaLight = new $.RectAreaLight('green',15,2.5,3)

    this.init()

  }

  public update(): void {
    // cập nhật here
    
  }

  //---------Config----------
  private init() {
    this.configLight()
  }
  private configLight(): void {
    this.ambientLight.position.set(0,0,6)
    this.directionalLight.position.set(1,6,7)
    this.spotLight.position.set(-1,-6,-7)
    this.pointLight.position.set(0,0,-6)
    this.rectAreaLight.position.set(0,0,0)
    this.hemisphereLight.position.set(0,9,0)
    
  }
}

export default Environment;