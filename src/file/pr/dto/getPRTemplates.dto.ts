import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetPRTemplateDto {
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  amount: number;
}
