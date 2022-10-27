import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
