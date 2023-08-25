import { Injectable } from '@nestjs/common';

const prTemplates = {
  preset1: 'lsakjfldskfj',
  preset2: 'adsfdsaf',
};

type file = { path: string; content: string };

@Injectable()
export class PrService {
  makePRTemplate = async (title: string): Promise<file> => {
    return {
      path: '.github/pull_request_template.md',
      content: prTemplates[title],
    };
  };
}
