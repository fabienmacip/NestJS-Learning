/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';
import { UserService } from 'src/user/user.service';


export type AuthBody = { email: string; password: string };

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ){}

  @Post('login')
  async login(@Body() authBody: AuthBody) {
    return this.authService.login({authBody});
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAuthenticatedUser(@Request() request: RequestWithUser) {
    return await this.userService.getUser({
      userId: request.user.userId,
    });
  }
}
