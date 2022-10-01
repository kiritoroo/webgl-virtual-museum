Math.clamp = (value: number, min: number, max: number): number => {
  if (value < min) {
    return min
  } else if (value > max) {
    return max;
  }

  return value;
}

Math.lerp = (start: number, end: number, amt: number): number => {
  return (1 - amt) * start + amt * end;
}

export {};