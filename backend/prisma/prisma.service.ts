import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * Prisma Service
 * 
 * Manages database connection lifecycle for the application.
 * This service can be extended by other modules to provide custom database logic.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    super({ adapter });
  }

  /**
   * Connects to the database when the module initializes
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  /**
   * Gracefully disconnects from the database when the module is destroyed
   */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
