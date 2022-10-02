import { emitEvent } from '@plugin/event';

class Time {

  private start: number;
  public current: number;
  public elapsed: number;
  public delta: number;

  constructor() {
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    this.update();
  }

  update() {
    const currentTime: number = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    if (this.delta > 60) {
      this.delta = 60;
    }
    
    emitEvent('eUpdate');

    window.requestAnimationFrame(() => this.update());
  }
}

export default Time;