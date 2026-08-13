import { Module } from '@nestjs/common';
import { ArchitectController } from './architect.controller';
import { ArchitectService } from './architect.service';
import { MemoryModule } from 'src/memory/memory.module';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [MemoryModule, AiModule],
  controllers: [ArchitectController],
  providers: [ArchitectService],
})
export class ArchitectModule {}