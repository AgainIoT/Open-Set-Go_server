import { Octokit } from "@octokit/rest";

export class OctoClient {
  constructor(userName, token) {
    this._userName = userName;
    this._token = token;
    this.octokit = new Octokit({
      auth: token,
    });
  }

  get userName() {
    return this._userName;
  }

  set userName(newName) {
    if (newName) {
      this._userName = newName;
    }
  }

  get token() {
    return this._token;
  }

  set token(newToken) {
    if (newToken) {
      this._token = newToken;
    }
  }

  // create repository
  createRepo = async (repoName, readme) => {
    try {
      const response = await this.octokit.repos.createForAuthenticatedUser({
        name: repoName,
        auto_init: readme,
      });
      console.log(response);
      console.log(`Repository '${repoName}' has been created successfully.`);
    } catch (error) {
      console.error(`Failed to create repository. Error: ${error.message}`);
    }
  };

  // add files to the repository
  addFilestoRepo = async (repoName, files, commit, branch = "main") => {
    try {
      for (const file of files) {
        const response = await this.octokit.repos.createOrUpdateFileContents({
          owner: this.userName,
          repo: repoName,
          path: file.path,
          branch: branch,
          message: commit,
          content: Buffer.from(file.content).toString("base64"),
        });
        console.log(response);
      }
      console.log(
        `Files has been added successfully to the repository ${repoName}`,
      );
    } catch (error) {
      console.error(
        `Failed to add files to the repository. Error: ${error.message}`,
      );
    }
  };

  // set admin branch protection of the repository
  setAdminBranchProtection = async (repoName, branch) => {
    try {
      const response = await this.octokit.repos.setAdminBranchProtection({
        owner: this.username,
        repo: repoName,
        branch: branch,
      });
      console.log(response);
      console.log(
        `Admin branch protection for ${repoName} has been set successfully.`,
      );
    } catch (error) {
      console.log(
        `Faild to set admin branch protection. Error: ${error.message}`,
      );
    }
  };

  // update branch protection of the repository
  updateBranchProtection = async (repoName, branch, users) => {
    try {
      const response = await this.octokit.repos.updateBranchProtection({
        owner: this.username,
        repo: repoName,
        branch: branch,
        required_status_checks: {
          strict: true,
          checks: [{ context: "success" }],
        },
        enforce_admins: true,
        required_pull_request_reviews: {
          dismissal_restrictions: {
            users: users,
            teams: [""],
          },
          dismiss_stale_reviews: true,
          require_code_owner_reviews: true,
          required_approving_review_count: 2,
          require_last_push_approval: true,
          bypass_pull_request_allowances: {
            users: users,
            teams: [""],
          },
        },
        restrictions: {
          users: users,
          teams: [""],
        },
        required_linear_history: true,
        allow_force_pushes: true,
        allow_deletions: true,
        block_creations: true,
        required_conversation_resolution: true,
        lock_branch: true,
        allow_fork_syncing: true,
      });
      console.log(response);
      console.log(`Branch protection for ${branch} has been updated successfully.`);
    } catch (error) {
      console.log(`Faild to update branch protection. Error: ${error.message}`);
    }
  };
}
