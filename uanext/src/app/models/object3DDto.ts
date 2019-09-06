export interface Object3DDto {
  id: string; // file response id
  name: string;
  path: string;
  projectId: number;
  staticPositionX?: number;
  staticPositionY?: number;
  scale?: number;
  rotate?: number;
}
