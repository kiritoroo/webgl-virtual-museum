import MousePlugin from '@plugin/mouse-motion/index';

class Plugin {

  private readonly mousePlugin: MousePlugin;

  constructor() {
    this.mousePlugin = new MousePlugin();  
  }
}

export default Plugin;