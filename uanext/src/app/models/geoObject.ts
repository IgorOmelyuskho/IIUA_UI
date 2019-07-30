import { VendorProject } from './vendorProject';

export class GeoObject {
  geoObjectId: string;
  coords: { x: number, y: number };
  projectName?: string;
  pathToZip: string;
  pathToZip2: string;
  canMove?: boolean;

  project?: VendorProject;

  object3DLP?: any;
  object3DHP?: any;
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
}
