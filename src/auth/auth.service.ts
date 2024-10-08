/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthBody } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';
type CreateUser = { email: string; firstname: string; password: string; };

@Injectable()
export class AuthService {
    
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ){}

  async login({ authBody } : { authBody: AuthBody }) {

    const { email, password } = authBody;
    
    const existingUser = await this.prisma.user.findUnique({
        where: {
            email,
        }
    });
    
    if(!existingUser) {
        throw new Error('L\'utilisateur n\'existe pas.');
    }

    const isPasswordValid = await this.isPasswordValid({
      password, 
      hashedPassword: existingUser.password
    });

    if(!isPasswordValid){
        throw new Error('Le mot de passe est invalide.');
    }

    return this.authenticateUser({
      userId: existingUser.id,
    });

  }

  private async hashPassword({ password } : { password: string }) {
    const hashedPassword = await hash(password,10);
    return hashedPassword;
  }

  private async isPasswordValid(
    { password, hashedPassword } : { password: string, hashedPassword: string }
  ) {
    const isPasswordValid = await compare(password, hashedPassword);
    return isPasswordValid;
  }

  async register({ registerBody }: { registerBody: CreateUser }) {
    try {
      const { email, firstname, password } = registerBody;

      const existingUser = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        throw new Error('Un compte existe déjà à cette adresse email.');
      }

      const hashedPassword = await this.hashPassword({ password });

      const createdUser = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstname,
        },
      });

      /*await this.mailerService.sendCreatedAccountEmail({
        firstName,
        recipient: email,
      });*/

      return this.authenticateUser({
        userId: createdUser.id,
      });
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  private async authenticateUser({userId} : UserPayload) {
    const payload: UserPayload = { userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
