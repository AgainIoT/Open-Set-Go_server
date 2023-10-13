import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetGenerateContributingMdDto {
  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsNotEmpty()
  repoName: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  license: string;
}
