import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  BedrockRuntimeClient,
  ConverseCommand,
} from '@aws-sdk/client-bedrock-runtime';

@Injectable()
export class BedrockService {
  private readonly client: BedrockRuntimeClient;

  constructor() {
    this.client = new BedrockRuntimeClient({
      region: process.env.AWS_REGION,
    });
  }

  async generate(prompt: string): Promise<string> {
    try {
      const command = new ConverseCommand({
        modelId: process.env.BEDROCK_MODEL_ID,
        messages: [
          {
            role: 'user',
            content: [
              {
                text: prompt,
              },
            ],
          },
        ],
      });

      const response = await this.client.send(command);

      const text = response.output?.message?.content
        ?.map(item => item.text)
        .filter(Boolean)
        .join('');

      if (!text) {
        throw new Error('Bedrock returned an empty response');
      }

      return text;
    } catch (error) {
      console.error('Bedrock request failed:', error);
      throw new InternalServerErrorException(
        'Unable to generate an architecture recommendation',
      );
    }
  }
}