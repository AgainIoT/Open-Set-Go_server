import { IsNotEmpty, IsString } from 'class-validator';

export class GetReadmeMdContentDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
