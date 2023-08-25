import { Injectable } from '@nestjs/common';

const issueTemplate = {
  type1: 'type1',
  type2: 'type2',
  type3: 'type3',
  type4: 'type4',
};

type file = { path: string; content: string };

@Injectable()
export class IssueService {
  makeIssueTemplate = async (titles: string[]): Promise<file[]> => {
    const result = [];
    for (const title of titles) {
      result.push({
        path: '.github/ISSUE_TEMPLATE/' + title + '.yml',
        content: issueTemplate[title],
      });
    }
    return result;
  };
}
