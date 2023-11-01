import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetPRTemplateDto {
  @IsNumber()
  @IsNotEmpty()
  page?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;
}
