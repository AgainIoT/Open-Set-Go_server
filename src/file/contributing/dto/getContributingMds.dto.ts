import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetContributingMdDto {
  @IsNumber()
  @IsNotEmpty()
  page?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;
}
