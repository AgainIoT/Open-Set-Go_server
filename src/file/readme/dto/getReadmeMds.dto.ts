import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetReadmeMdDto {
  @IsNumber()
  @IsNotEmpty()
  page?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;
}
