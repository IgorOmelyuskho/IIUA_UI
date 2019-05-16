import { VendorProject } from './vendorProject';

export interface GeoObject {
  geoObjectId: string;
  coords: { x: number, y: number };
  projectName: string;
  pathToZip: string;
  project: VendorProject;

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
}
