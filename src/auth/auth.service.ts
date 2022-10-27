import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcrypt';
import { loginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  private async validateUser(email: string, password: string) {
    const owner = await this.prisma.restaurantOwners.findUnique({
      where: { email },
    });
    if (!owner || !compare(password, owner.password)) {
      throw new UnauthorizedException('Email or password incorrect');
    }
    const payload = { email: email, sub: owner.id };

    const { password: _password, ...result } = owner;
    return {
      access_token: this.jwtService.sign(payload),
      ...result,
    };
  }
  async login(user: loginDto) {
    return this.validateUser(user.email, user.password);
  }
}
