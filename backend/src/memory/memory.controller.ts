import { Controller, Post, Body, Get } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { CreateMemoryDto } from './dto/create-memory.dto';

@Controller('memory')
export class MemoryController {
  constructor(private readonly memoryService: MemoryService) {}

  @Post()
  async create(@Body() dto: CreateMemoryDto) {
    const memory = await this.memoryService.createMemory(dto);
    return {
      status: 'ok',
      service: 'MemoryOS Cloud Architect',
      timestamp: new Date().toISOString(),
      data: memory,
    };
  }

  @Get()
  async findAll() {
    const memories = await this.memoryService.findAllMemories();
    return {
      status: 'ok',
      service: 'MemoryOS Cloud Architect',
      timestamp: new Date().toISOString(),
      data: memories,
    };
  }
}
