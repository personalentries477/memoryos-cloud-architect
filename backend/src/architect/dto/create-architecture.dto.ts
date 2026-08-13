import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateArchitectureDto {
  @IsString()
  @IsNotEmpty()
  project!: string;

  @IsNumber()
  @Min(1)
  users!: number;

  @IsNumber()
  @Min(1)
  budget!: number;

  @IsArray()
  @IsString({ each: true })
  requirements!: string[];
}