import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Octokit } from '@octokit/rest';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import { readdir } from 'fs/promises';

export type file = { path: string; content: string };

export type envTemplateType = {
  language: string;
  frameworks: { framework: string; path: string }[];
}[];

@Injectable()
export class FilesService {
  constructor(private readonly httpService: HttpService) {}
  files = [];
  uploadFiles = async (
    GHtoken: string,
    userName: string,
    repoName: string,
    files: { path: string; content: string }[],
  ): Promise<void> => {
    const octokit = new Octokit({ auth: GHtoken });
    try {
      // get the branch data including current commit hash
      const { data: branchData } = await octokit.rest.repos.getBranch({
        owner: userName,
        repo: repoName,
        branch: 'main',
      });

      const baseTree = branchData.commit.commit.tree.sha;

      // add files into the tree
      const tree = await octokit.rest.git.createTree({
        owner: userName,
        repo: repoName,
        base_tree: baseTree,
        tree: files.map((file) => ({
          path: file.path,
          content: file.content,
          mode: '100644',
        })),
      });

      console.log(`[${tree.status}] Tree has been created successfully`);

      // create a new commit
      const newCommit = await octokit.rest.git.createCommit({
        owner: userName,
        repo: repoName,
        message: 'Initial commit',
        tree: tree.data.sha,
        parents: [branchData.commit.sha],
      });

      console.log(`[${newCommit.status}] Commit has been created successfully`);

      // update the branch
      const response = await octokit.rest.git.updateRef({
        owner: userName,
        repo: repoName,
        ref: 'heads/main',
        sha: newCommit.data.sha,
      });

      console.log(`[${response.status}] Branch has been updated succesfully`);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  makeGitignore = async (ignoreList: string[]): Promise<boolean> => {
    const ignorestr = ignoreList.join();
    const GITIGNOREIO_URL =
      `https://www.toptal.com/developers/gitignore/api/` + ignorestr;
    let result = (await this.httpService.get(GITIGNOREIO_URL).toPromise()).data;
    result += await this.getFileContent('.gitignore');
    Logger.debug(result);
    return await this.setFileContent('.gitignore', result);
  };

  getFileList = async (dirName) => {
    let files = [];
    const items = await readdir(dirName, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        files = [
          ...files,
          ...(await this.getFileList(`${dirName}/${item.name}`)),
        ];
      } else {
        files.push(`${dirName}/${item.name}`);
      }
    }

    return files;
  };

  makeFramework = async (
    language: string,
    framework: string,
  ): Promise<file[]> => {
    if (framework === null) {
      console.log('err');
      return;
    }

    const supportedEnv = await this.getEnvTemplate();

    const filePath = supportedEnv
      .find((languages) => {
        return languages.language == language;
      })
      .frameworks.find((frameworks) => {
        return frameworks.framework == framework;
      }).path;

    const filePaths: string[] = (await this.getFileList(
      `./src/file/env-template${filePath}`,
    )) as string[];

    const files = filePaths.map((path) => {
      const content = readFileSync(path, 'utf-8');
      path = path.replace(`./src/file/env-template${filePath}/`, '');
      const file: file = { path, content };
      return file;
    });

    return files;
  };

  getEnvTemplate = async (): Promise<envTemplateType> => {
    const supportedEnv = (await load(
      readFileSync('./src/file/env-template/supportedEnv.yml', {
        encoding: 'utf-8',
      }),
    )) as envTemplateType;
    Logger.debug(supportedEnv);
    return supportedEnv;
  };

  getFile = async (filePath: string): Promise<file> => {
    for (let i = 0; i < this.files.length; i++) {
      if (filePath === this.files[i].path) {
        return this.files[i];
      }
    }
  };

  getFileContent = async (filePath: string): Promise<string> => {
    try {
      const file = await this.getFile(filePath);
      console.log(file);
      return file.content;
    } catch {
      return null;
    }
  };

  setFile = async (
    file: file,
    path: string,
    content: string,
  ): Promise<boolean> => {
    try {
      file.path = path;
      file.content = content;
      return true;
    } catch {
      return false;
    }
  };

  setFileContent = async (
    filePath: string,
    fileContent: string,
  ): Promise<boolean> => {
    try {
      const file: file = await this.getFile(filePath);
      return this.setFile(file, filePath, fileContent);
    } catch {
      return false;
    }
  };

  // makePRTemplate = async (title: string): Promise<file> => {
  //   return {
  //     path: '.github/pull_request_template.md',
  //     content: prTemplates[title],
  //   };
  // };

  // makeIssueTemplate = async (titles: string[]): Promise<file[]> => {
  //   const result = [];
  //   for (const title of titles) {
  //     result.push({
  //       path: '.github/ISSUE_TEMPLATE/' + title + '.yml',
  //       content: issueTemplate[title],
  //     });
  //   }
  //   return result;
  // };

  // makeReadmeMd = async (content: string): Promise<file> => {
  //   return { path: 'README.md', content: content };
  // };

  // makeContributingMd = async (content: string): Promise<file> => {
  //   return { path: 'CONTRIBUTING.md', content: content };
  // };
}
