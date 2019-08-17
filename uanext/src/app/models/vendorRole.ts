import { UserRole } from './userRole';

export interface VendorRole {
  fullName: string;
  email: string;
  emailVerified?: boolean;
  phone?: string;
  phoneVerified?: boolean;
  created?: string;
  lastEdited?: string;
  itn?: string;
  itnVerified?: boolean;
  userRole?: UserRole;
  id?: string;
  userId?: string;
  isSocial?: boolean;
}
