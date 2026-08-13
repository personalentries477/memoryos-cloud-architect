import { IsString, IsOptional } from 'class-validator';

export class CreateMemoryDto {
	@IsString()
	title!: string;

	@IsString()
	prompt!: string;

	@IsString()
	project!: string;

	@IsString()
	memoryType!: string;

	@IsOptional()
	@IsString()
	response?: string;
}
