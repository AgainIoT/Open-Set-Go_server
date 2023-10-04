import { IsNotEmpty, IsNumber } from 'class-validator';

export class UploadFilesDto {
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  amount: number;
}
