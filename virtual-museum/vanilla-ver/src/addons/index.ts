import MouseAddon from '@addon/mouse-motion/index';

class Addon {

  private readonly mouseAddon: MouseAddon;

  constructor() {
    this.mouseAddon = new MouseAddon();  
  }
}

export default Addon;