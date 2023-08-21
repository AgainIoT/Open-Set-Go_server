import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Octokit } from '@octokit/rest';

@Injectable()
export class FilesService {
  constructor(private readonly httpService: HttpService) {}
  uploadFiles = async (
    GHtoken: string,
    userName: string,
    repoName: string,
    files: { path: string; content: string }[],
  ) => {
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

      // create a new commit
      const newCommit = await octokit.rest.git.createCommit({
        owner: userName,
        repo: repoName,
        message: 'Initial commit',
        tree: tree.data.sha,
        parents: [branchData.commit.sha],
      });

      // update the branch
      await octokit.rest.git.updateRef({
        owner: userName,
        repo: repoName,
        ref: 'heads/main',
        sha: newCommit.data.sha,
      });

      console.log('Files uploaded and committed successfully.');
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };
  makeGitignore = async (
    content: string,
  ): Promise<{ path: string; content: string }> => {
    return await { path: '.gitignore', content: content };
  };

  makeReadmeMd = async (
    content: string,
  ): Promise<{ path: string; content: string }> => {
    return { path: 'README.md', content: content };
  };

  makeContributingMd = async (
    content: string,
  ): Promise<{ path: string; content: string }> => {
    return { path: 'CONTRIBUTING.md', content: content };
  };
}
