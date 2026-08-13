import { Body, Controller, Post } from '@nestjs/common';
import { ArchitectService } from './architect.service';
import { CreateArchitectureDto } from './dto/create-architecture.dto';

@Controller('architect')
export class ArchitectController {
  constructor(private readonly architect: ArchitectService) {}

  @Post()
  design(@Body() body: CreateArchitectureDto) {
    return this.architect.design(body);
  }
}