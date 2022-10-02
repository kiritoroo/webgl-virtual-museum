import jQuery from 'jquery';
import '@plugin/math';

import './style.css';

class MouseMotion {

  private mouseCircle: HTMLDivElement;
  private mouseObject!: {
    el: JQuery<HTMLDivElement>,
    x: number, y: number,
    w: number, h: number,
    update(): void
  }

  private mouseCircleBig: HTMLDivElement;
  private mouseObjectBig!: {
    el: JQuery<HTMLDivElement>,
    x: number, y: number,
    w: number, h: number,
    update(): void
  }

  private mouseX: number;
  private mouseY: number;

  constructor() {
    this.mouseCircle = document.createElement('div');
    this.mouseCircleBig = document.createElement('div');

    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;

    this.init();
  }

  private init(): void {
    this.configMouseCircle();
    this.configMouseObject();
    this.bindEvent();
  }

  private bindEvent(): void {
    document.addEventListener('eResize', () => this.resize());
    document.addEventListener('eUpdate', () => this.update());
    jQuery(window).on("mousemove", (e) => this.mouseMove(e));
  }

  private configMouseCircle(): void {
    this.mouseCircle.id = 'mouse-circle-main';
    document.body.appendChild(this.mouseCircle);
    this.mouseCircleBig.id = 'mouse-circle-big';
    document.body.appendChild(this.mouseCircleBig);
  }

  private configMouseObject(): void {
    this.mouseObject = {
      el: jQuery<HTMLDivElement>('#mouse-circle-main'),
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      w: 15,
      h: 15,
      update: function() {
        const l: number = this.x - this.w / 2
        const t: number = this.y - this.h / 2
        this.el.css({
          'transform': 'translate3d(' + l + 'px, ' + t + 'px, 0)'
        })
      }
    }
    this.mouseObjectBig = {
      el: jQuery<HTMLDivElement>('#mouse-circle-big'),
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      w: 50,
      h: 50,
      update: function() {
        const l: number = this.x - this.w / 2
        const t: number = this.y - this.h / 2
        this.el.css({
          'transform': 'translate3d(' + l + 'px, ' + t + 'px, 0)'
        })
      }
    }
  }

  private mouseMove(e: JQuery.MouseMoveEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  private resize(): void { }

  private update(): void {
    this.mouseObject.x = Math.lerp(this.mouseObject.x, this.mouseX, 0.5);
    this.mouseObject.y = Math.lerp(this.mouseObject.y, this.mouseY, 0.5);
    this.mouseObject.update();

    this.mouseObjectBig.x = Math.lerp(this.mouseObjectBig.x, this.mouseX, 0.1);
    this.mouseObjectBig.y = Math.lerp(this.mouseObjectBig.y, this.mouseY, 0.1);
    this.mouseObjectBig.update();
  }
}

export default MouseMotion;