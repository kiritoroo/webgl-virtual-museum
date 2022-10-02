import { TAsset } from "@type/type";

const MODELURL = './static/models/';
const IMAGEURL = './static/images/';

const m_museumSource = MODELURL + 'm_museum.glb';
const m_galleryVintageSource = MODELURL + 'm_gallery-vintage.glb';
const m_vrGallerySource = MODELURL + 'm_gallery.glb';
const m_ancientGreekSource = MODELURL + 'm_ancient-greek.glb';
const m_entranceSource = MODELURL + 'm_entrance.glb';
const m_roundGallerySource = MODELURL + 'm_roudGallery.glb';

const hdr_skieFire4kSource = IMAGEURL + 'hdr_skie-fire-4k.hdr';
const hdr_modernBuildingSource = IMAGEURL + 'hdr_modern-building.hdr';

const t_lightShaftSource = IMAGEURL + 't_lightShaft.png';

const assets: Array<TAsset> = [
  { name: "m_museum", type: "model", path: m_museumSource },
  { name: "m_galleryVintage", type: "model", path: m_galleryVintageSource },
  { name: "m_vrGallery", type: "model", path: m_vrGallerySource },
  { name: "m_ancientGreek", type: "model", path: m_ancientGreekSource },
  { name: "m_entrance", type: "model", path: m_entranceSource },
  { name: "m_roundGallery", type: "model", path: m_roundGallerySource },
  { name: "hdr_skieFire", type: "hdr", path: hdr_skieFire4kSource },
  { name: "hdr_modernBuilding", type: "hdr", path: hdr_modernBuildingSource },
  { name: "t_lightShaft", type: "texture", path: t_lightShaftSource }
]

export default assets;