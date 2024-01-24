import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {

    this.$extends({
      query: {
          user: {
              async findFirst({ model, operation, args, query }) {
                  args.include = {
                      roles: {
                          include: {
                              permissions: true
                          }
                      }
                  }
                  return query( args )
              }
          }
      }
  })
    await this.$connect();
  }
}