import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateMemoryDto } from './dto/create-memory.dto';
import type { CreateArchitectureDto } from 'src/architect/dto/create-architecture.dto';

@Injectable()
export class MemoryService {
    constructor(private readonly prisma: PrismaService) {}

    async createMemory(dto: CreateMemoryDto) {
        const created = await this.prisma.memory.create({
            data: {
                title: dto.title,
                prompt: dto.prompt,
                response: dto.response ?? '',
                project: dto.project,
                memoryType: dto.memoryType,
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

        // Find memories relevant to an architecture request.
        // Tries a full-text search (Postgres / CockroachDB) and falls back to
        // simple `contains` matching if the DB doesn't support the text functions.
        async findRelevant(request: CreateArchitectureDto) {
            const searchText = [request.project, ...(request.requirements || [])].join(' ');

            try {
                const results = await this.prisma.$queryRaw`
                    SELECT id, title, prompt, response, project, memoryType, "createdAt"
                    FROM "Memory"
                    WHERE to_tsvector(coalesce(title,'') || ' ' || coalesce(prompt,'') || ' ' || coalesce(response,''))
                      @@ plainto_tsquery(${searchText})
                      AND project = ${request.project}
                    ORDER BY ts_rank_cd(
                      to_tsvector(coalesce(title,'') || ' ' || coalesce(prompt,'') || ' ' || coalesce(response,'')),
                      plainto_tsquery(${searchText})
                    ) DESC
                    LIMIT 5
                `;

                // If the raw query returns rows, return them; otherwise fall back.
                if (Array.isArray(results) && results.length > 0) return results;
            } catch (e) {
                // ignore and fallback to Prisma-based contains matching
            }

            // Fallback: match any requirement terms in title/prompt/response (case-insensitive)
            const terms = request.requirements || [];
            const orConditions: Prisma.MemoryWhereInput[] = terms.flatMap((term) => [
                { title: { contains: term, mode: Prisma.QueryMode.insensitive } },
                { prompt: { contains: term, mode: Prisma.QueryMode.insensitive } },
                { response: { contains: term, mode: Prisma.QueryMode.insensitive } },
            ]);

            const memories = await this.prisma.memory.findMany({
                where: {
                    project: request.project,
                    OR: orConditions.length ? orConditions : undefined,
                },
                take: 5,
                orderBy: { createdAt: 'desc' },
            });

            return memories;
        }
}