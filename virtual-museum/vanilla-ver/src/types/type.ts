import * as $ from 'three';

export type TSkyPARAMS = {
  turbidity: number,
  rayleigh: number,
  mieCoefficient: number,
  mieDirectionalG: number,
  elevation: number,
  azimuth: number,
}

export type TSkyUniforms = {
  turbidity?: $.IUniform<number>,
  rayleigh?: $.IUniform<number>,
  mieCoefficient?: $.IUniform<number>,
  mieDirectionalG?: $.IUniform<number>,
  sunPosition?: $.IUniform< $.Vector3 >,
  up?: $.IUniform< $.Vector3 >
}

export type TAsset = {
  name: string,
  type: 'model' | 'texture' | 'hdr' | 'image' | 'video',
  path: string
}