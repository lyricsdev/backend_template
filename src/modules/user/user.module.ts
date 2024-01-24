import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from "@nestjs/jwt";

import { PrismaModule } from '../prisma/prisma.module';
import { userController } from './user.controller';
import { UserService } from './user.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
const ImportsAndExports = [
    JwtModule.register({ signOptions: { expiresIn: "10d" } }),
  ];

@Module({
  controllers: [userController],
  providers: [UserService,JwtStrategy],
  imports: [...ImportsAndExports,PrismaModule],
  exports: [...ImportsAndExports,JwtStrategy]
})
export class userModule {}