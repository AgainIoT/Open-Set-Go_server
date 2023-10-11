import { IsNotEmpty, IsString } from 'class-validator';

export class GetPRTemplateContent {
  @IsString()
  @IsNotEmpty()
  id: string;
}
