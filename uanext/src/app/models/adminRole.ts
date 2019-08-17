import { UserRole } from './userRole';

export interface AdminRole {
  fullName: string;
  email: string;
  emailVerified?: boolean;
  phone?: string;
  phoneVerified?: boolean;
  created?: string;
  lastEdited?: string;
  userRole?: UserRole;
  id?: string;
  userId?: string;
  isSocial?: boolean;
}
