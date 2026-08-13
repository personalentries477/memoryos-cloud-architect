import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { MemoryModule } from './memory/memory.module';
import { PrismaModule } from 'prisma/prisma.module';
import 'dotenv/config';
import { AiModule } from './ai/ai.module';
import { ArchitectModule } from './architect/architect.module';

@Module({
  imports: [
    PrismaModule, 
    HealthModule,
    MemoryModule,
    AiModule,
    ArchitectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
