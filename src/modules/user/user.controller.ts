import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { User as UserModel } from '@prisma/client';
import { userAuthDto } from './dto/auth.dto';
import { authGuard } from '../guard/auth.guard';
import CheckRoleGuard from '../guard/role.guard';
  
  @Controller("users")
  export class userController {
    constructor(private readonly userService: UserService) {}
    @Get('user/:id')
    async getPostById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user( {id} );
  }
  @Post("signing")
  async signing(@Body() body: userAuthDto): Promise<Object> {
    return await this.userService.signIn(body);
  }
  
  @UseGuards(CheckRoleGuard(["admin.dashboard.auth"])) 
  @UseGuards(authGuard(false))
  @Post("test2")
  async test2(): Promise<Object> {
    return await {
      test: "true"
    }
  }
}