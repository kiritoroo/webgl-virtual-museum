import { TAsset } from "@type/type";

const MODELSURL = './static/models/';

const m_vrGallerySource = MODELSURL + 'm_gallery.glb';

const assets: Array<TAsset> = [
  { name: "m_vrGallery", type: "model", path: m_vrGallerySource },
]

export default assets;