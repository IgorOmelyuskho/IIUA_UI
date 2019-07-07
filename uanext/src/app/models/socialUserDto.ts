import { UserRole } from './userRole';

export interface SocialUserDto {
    provider: string;
    token: string;
    email?: string;
}
