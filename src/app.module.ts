import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ValidateDtoUserMiddleware } from './users/middleware/validate-dto-user.middleware';

@Module({
  imports: [UsersModule],
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
