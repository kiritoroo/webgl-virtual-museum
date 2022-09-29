import { emitEvent } from "@/helpers/event";

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
    this.delta = this.current - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    emitEvent('eUpdate');

    window.requestAnimationFrame(() => this.update());
  }
}

export default Time;