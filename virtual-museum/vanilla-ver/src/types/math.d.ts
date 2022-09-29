declare interface Math {
  clamp(value: number, min: number, max: number): number;
  lerp(start: number, end: number, amt: number): number;
}