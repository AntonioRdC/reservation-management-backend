import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ValidateDtoUserMiddleware } from './users/middleware/validate-dto-user.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateDtoUserMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
  }
}
