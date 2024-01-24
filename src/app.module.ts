import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { userModule } from './modules/user/user.module';

@Module({
  imports: [PrismaModule,userModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
