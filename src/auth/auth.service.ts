import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const student = await this.prisma.students.findUnique({ where: { email } });

    if (!student || compare(password, student.password)) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const { password: _password, ...result } = student;
    return result;
  }
  async login(user) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
