import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMemoryDto } from './dto/create-memory.dto';

@Injectable()
export class MemoryService {
    constructor(private readonly prisma: PrismaService) {}

    async createMemory(dto: CreateMemoryDto) {
        const created = await this.prisma.memory.create({
            data: {
                title: dto.title,
                prompt: dto.prompt,
                response: dto.response ?? '',
            },
        });

        return created;
    }

    async findAllMemories() {
        return await this.prisma.memory.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}