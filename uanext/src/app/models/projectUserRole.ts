import { UserRole } from './userRole';

export interface ProjectUserRole { // todo fields
  fullName: string;
  email: string;
  emailVerified?: boolean;
  phone?: string;
  phoneVerified?: boolean;
  created?: string;
  lastEdited?: string;
  projectId?: string;
  userRole?: UserRole;
  id?: string;
  userId?: string;
  iisSocial?: boolean;
}


