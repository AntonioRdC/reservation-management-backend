import { Module } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/module/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  async configureFastify(fastify: FastifyAdapter) {
    fastify.setErrorHandler((error, request, reply) => {
      reply.status(500).send({ error: 'Internal Server Error' });
    });
  }
}
