import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CurrentUserMiddleware } from './users/middleware/current-user.middleware';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './database/data-source';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,

    // Enable .env Globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () =>
        ({
          ...dataSourceOptions,
          autoLoadEntities: true,
        }) as TypeOrmModuleOptions,
    }),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*'); // Apply to all routes
  }
}
