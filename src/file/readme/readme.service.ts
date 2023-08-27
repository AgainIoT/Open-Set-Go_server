import { Injectable } from '@nestjs/common';

type file = { path: string; content: string };

@Injectable()
export class ReadmeService {
  makeReadmeMd = async (content: string): Promise<file> => {
    return { path: 'README.md', content: content };
  };
}
