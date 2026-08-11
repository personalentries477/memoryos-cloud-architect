import { IsString, IsOptional } from 'class-validator';

export class CreateMemoryDto {
	@IsString()
	title!: string;

	@IsString()
	prompt!: string;

	@IsOptional()
	@IsString()
	response?: string;
}
