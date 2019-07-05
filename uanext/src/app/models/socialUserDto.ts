import { UserRole } from './userRole';

export interface SocialUserDto {
    provider: string;
    token?: string;
    role: UserRole;
    email?: string;
}
