import { TAsset } from "@type/type";

const MODELURL = './static/models/';
const IMAGEURL = './static/images/';

const m_vrGallerySource = MODELURL + 'm_gallery.glb';
const t_lightShaftSource = IMAGEURL + 't_lightShaft.png';

const assets: Array<TAsset> = [
  { name: "m_vrGallery", type: "model", path: m_vrGallerySource },
  { name: "t_lightShaft", type: "texture", path: t_lightShaftSource },
]

export default assets;