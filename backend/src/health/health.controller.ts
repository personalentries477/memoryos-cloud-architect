import { Controller, Get } from '@nestjs/common';
import { BedrockService } from 'src/ai/bedrock.service';

@Controller('health')
export class HealthController {
   constructor(private readonly bedrock: BedrockService) {}
   
  @Get()
  check() {
    return {
      status: 'ok',
      service: 'MemoryOS Cloud Architect',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ai')
  async checkAi() {
    const response = await this.bedrock.generate(
      'Respond exactly: MemoryOS',
    );

    return {
      status: 'ok',
      response,
    };
  }
}