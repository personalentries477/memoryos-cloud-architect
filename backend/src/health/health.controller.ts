import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      service: 'MemoryOS Cloud Architect',
      timestamp: new Date().toISOString(),
    };
  }
}
