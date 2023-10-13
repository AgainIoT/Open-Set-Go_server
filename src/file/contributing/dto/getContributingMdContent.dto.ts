import { IsNotEmpty, IsString } from 'class-validator';

export class GetContributingMdContentDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
