import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/module/users/users.module';
import { AuthModule } from 'src/module/auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
})
export class AppModule {}
