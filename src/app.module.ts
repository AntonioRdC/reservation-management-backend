import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ValidateDtoUserMiddleware } from 'src/users/middleware/validate-dto-user.middleware';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
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
