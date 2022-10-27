import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    RestaurantsModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [PrismaModule],
})
export class AppModule {}
