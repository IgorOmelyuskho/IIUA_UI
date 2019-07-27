import { VendorProject } from './vendorProject';

export class GeoObject {
  geoObjectId: string;
  coords: { x: number, y: number };
  projectName?: string;
  pathToZip: string;
  canMove?: boolean;

  project?: VendorProject;

  object3D?: any;
  prevCoords?: any;
  speedX?: number;
  speedY?: number;
  rotationZ?: number;
  objectDivLabel?: HTMLElement;
  pointForMove?: any;
  marker?: any;
  mouseUnder?: boolean;
  box3?: any;
  boxHelper?: any;
}
