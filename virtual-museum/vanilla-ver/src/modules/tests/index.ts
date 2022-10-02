import Experience from "@core/Experience"
import TestShadow from "@test/TestShadow"

class Test {
  private experience: Experience = new Experience;
  private scene = this.experience.scene;

  private testShadow: TestShadow = new TestShadow();

  constructor() {
    
  }

  public update(): void {
    this.testShadow.update();
  }
}

export default Test