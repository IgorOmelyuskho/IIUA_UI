import { UserRole } from './userRole';

export interface InvestorRole {
  fullName: string;
  email: string;
  emailVerified?: boolean;
  phone?: string;
  phoneVerified?: boolean;
  creditCardNumber?: string;
  creditCardNumberVerified?: boolean;
  created?: string;
  lastEdited?: string;
  userRole?: UserRole;
  id?: string;
  userId?: string;
  isSocial: boolean;
}
