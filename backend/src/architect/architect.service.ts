import { Injectable } from '@nestjs/common';
import { BedrockService } from '../ai/bedrock.service';
import { CreateArchitectureDto } from './dto/create-architecture.dto';
import { MemoryService } from 'src/memory/memory.service';

@Injectable()
export class ArchitectService {
    constructor(
        private readonly bedrock: BedrockService,
        private readonly memory: MemoryService
    ) { }

    async design(request: CreateArchitectureDto) {
        // const prompt = this.buildPrompt(request);

        // const response = await this.bedrock.generate(prompt);

        // return {
        //   project: request.project,
        //   recommendation: response,
        // };

        const memories = await this.memory.findRelevant(request);

        const prompt = this.buildPrompt(request, memories);

        const architecture = await this.bedrock.generate(prompt);

        await this.memory.createMemory({
            title: `Architecture recommendation for ${request.project}`,
            prompt: prompt,
            response: architecture,
            project: request.project,
            memoryType: 'architecture-recommendation',
        });

        return architecture;
    }

    private buildPrompt(request: CreateArchitectureDto, memories: any[]) {
        return `
You are a senior cloud infrastructure architect.

Design a production-ready AWS architecture based on the following requirements.

Project:
${request.project}

Expected users:
${request.users}

Monthly budget:
$${request.budget}

Requirements:
${request.requirements.map((item) => `- ${item}`).join('\n')}

Relevant architectural memories:
${memories}

Provide:

1. Architecture summary
2. Recommended AWS services
3. Reason for each major service
4. Scalability considerations
5. Availability considerations
6. Security considerations
7. Main risks
8. Important trade-offs
9. Estimated monthly cost range

Do not claim that cost or performance estimates are guaranteed.
Clearly state assumptions where necessary.

Use previous memories as experience, not as absolute truth.

Identify when an older decision is no longer appropriate.

Explain which previous decisions you reused,
which ones you changed, and why.
`;
    }
}