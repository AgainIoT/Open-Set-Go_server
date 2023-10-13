import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class UploadFilesDto {
  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsNotEmpty()
  repoName: string;

  @IsString()
  language: string;

  @IsString()
  framework: string;

  @IsArray()
  gitignore: string[];

  @IsString()
  license: string;

  @IsString()
  PRTemplate: string;

  @IsArray()
  IssueTemplate: {
    type: string;
    content: string;
  }[];

  @IsString()
  contributingMd: string;

  @IsString()
  readmeMd: string;
}
