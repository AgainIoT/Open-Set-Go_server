import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class UploadFilesDto {
  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsNotEmpty()
  repoName: string;

  @IsString()
  @IsOptional()
  language: string;

  @IsString()
  @IsOptional()
  framework: string;

  @IsArray()
  @IsOptional()
  gitignore: string[];

  @IsString()
  @IsOptional()
  license: string;

  @IsString()
  @IsOptional()
  PRTemplate: string;

  @IsArray()
  @IsOptional()
  IssueTemplate: {
    type: string;
    content: string;
  }[];

  @IsString()
  @IsOptional()
  contributingMd: string;

  @IsString()
  @IsOptional()
  readmeMd: string;
}
