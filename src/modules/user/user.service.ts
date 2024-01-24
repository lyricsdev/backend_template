import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { userAuthDto } from "./dto/auth.dto";
import * as bcrypt from "bcrypt";
import { userJwtI } from "src/types/user.type";


@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwtService : JwtService
    ) {}
    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
      ): Promise<User | null> {
        return this.prisma.user.findUnique({
          where: userWhereUniqueInput,
        });
    }
    findUser = async( username: string ) => {

        const user = await this.prisma.user.findFirst({
            where: {
                username: username
            },
            include: {
                roles: {
                    include: {
                        permissions: true
                    }
                }
            }
        })
        
        return user
    }
    private jwtSignUserId(userId: userJwtI): string {
        return this.jwtService.sign(
          { userId },
          {
            secret: "YOURSECRETKEY",
          }
        );
    }
    async signIn(user: userAuthDto) {
        try {
          const userExist = await this.findUser(
            user.username
          );
          if (!userExist) throw new UnauthorizedException("invalid credentials");
    
          const passwordIsMatch = await bcrypt.compare(
            user.password,
            userExist.password
          );
          if (!passwordIsMatch)
            throw new UnauthorizedException("invalid credentials");
            const jwtModel : userJwtI = {
                id: userExist.id,
                username: userExist.username,
                roles: userExist.roles
            }
          return {
            token: this.jwtSignUserId(jwtModel)
          }
        } catch (error) {
          throw error;
        }
      }
}