import { VendorProject } from './vendorProject';

export interface FilteredProjects {
  pages: number;
  projectsCount: number;
  projectsList: VendorProject[];
}
