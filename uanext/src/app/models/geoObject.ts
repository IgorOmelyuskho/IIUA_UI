import { VendorProject } from './vendorProject';

export class GeoObject {
  geoObjectId: string;
  coords: { x: number, y: number };
  projectName?: string;
  pathToZip: string;
  pathToZipLP: string;
  canMove?: boolean;

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
  editBtnLabel?: HTMLElement;
  pointForMove?: any; // todo remove
  marker?: any;
  mouseUnder?: boolean;
  box3?: any;
  boxHelper?: any; // todo remove
  currentUser?: boolean;
  scale?: number;
}
