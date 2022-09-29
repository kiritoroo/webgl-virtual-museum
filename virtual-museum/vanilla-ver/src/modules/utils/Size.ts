import { emitEvent } from '@helper/event';

class Size {
  private _width: number;
  private _height: number;
  private _aspect: number;
  private _pixelRatio: number;

  constructor() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._aspect = this._width / this._height;
    this._pixelRatio = Math.min(window.devicePixelRatio, 2);

    window.addEventListener('resize', () => {
      this._width = window.innerWidth;
      this._height = window.innerHeight;
      this._aspect = this._width / this._height;
      this._pixelRatio = Math.min(window.devicePixelRatio, 2);

      emitEvent('eResize');
    })
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public get aspect(): number {
    return this._aspect;
  }

  public get pixelRatio(): number {
    return this._pixelRatio;
  }
}

export default Size;