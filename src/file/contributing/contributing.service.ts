import { Injectable } from '@nestjs/common';

type file = { path: string; content: string };

@Injectable()
export class ContributingService {
  makeContributingMd = async (content: string): Promise<file> => {
    return { path: 'CONTRIBUTING.md', content: content };
  };
}
