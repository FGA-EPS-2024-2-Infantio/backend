import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { ClassMicroserviceController } from './class.controller';
import { ClassesPrismaService } from './class.prisma';
import { ClassesService } from './class.service';

@Module({
  imports: [NatsClientModule, PrismaModule],
  controllers: [ClassMicroserviceController],
  providers: [ClassesPrismaService, ClassesService],
})
export class ClassModule {}
