import { UserRole } from '@prisma/client';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  role?: UserRole;
}
