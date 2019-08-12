import { VendorProject } from './vendorProject';

export class GeoObjectEdit {
  geoObjectId: string;
  coords: { x: number, y: number };
  projectName: string;
  pathToZip: string;
  pathToZipLP: string;
  canMove: boolean;

  project?: VendorProject;

  object3DLP?: any;
  object3DLPStartLoaded?: boolean;
  object3DHP?: any;
  object3DHPStartLoaded?: boolean;
  prevCoords?: any;
  speedX?: number;
  speedY?: number;
  rotationZ?: number;
  objectDivLabel?: HTMLElement;
  pointForMove?: any; // todo remove
  marker?: any;
  mouseUnder?: boolean;
  box3?: any;
  boxHelper?: any; // todo remove

  // for edit mode
  zCoords: number;
  editModeScale: number;
  speed?: number;
  movedTo?: { x: number, y: number };
  coordsArr?: { x: number, y: number }[];
  coordsArrIndex?: number;
  rotateSpeed?: number;
}
