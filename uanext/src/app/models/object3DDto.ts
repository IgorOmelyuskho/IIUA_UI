export interface Object3DDto {
  id?: string; // geoObject id
  name: string; // originalName - file API
  path: string; // url - file API
  projectId: string;
  staticPositionX?: number;
  staticPositionY?: number;
  scale?: number;
  rotate?: number;
}
