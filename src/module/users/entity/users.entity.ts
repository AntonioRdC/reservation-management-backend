import { UserRole } from '@prisma/client';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: Date | string;
  image?: string;
  password?: string;
  role?: UserRole;
  googleProvider?: Date | string;
  googleProviderId?: string;
}
