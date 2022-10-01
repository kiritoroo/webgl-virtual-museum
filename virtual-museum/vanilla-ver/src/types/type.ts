import * as $ from 'three';

export type skyPARAMS = {
  turbidity: number,
  rayleigh: number,
  mieCoefficient: number,
  mieDirectionalG: number,
  elevation: number,
  azimuth: number,
}

export type skyUniforms = {
  turbidity?: $.IUniform<number>,
  rayleigh?: $.IUniform<number>,
  mieCoefficient?: $.IUniform<number>,
  mieDirectionalG?: $.IUniform<number>,
  sunPosition?: $.IUniform< $.Vector3 >,
  up?: $.IUniform< $.Vector3 >
}