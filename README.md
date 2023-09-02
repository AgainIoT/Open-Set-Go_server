# Open-Set-Go_server

<p align="center">
<a href="https://open-set-go.netlify.app/" target="blank"><img src="https://github.com/AgainIoT/Open-Set-Go/raw/main/.github/images/Open-Set-Go.png" width="200" alt="Open-Set-Go Logo" /></a>
</p>

<p align="center">
  Start Open-Source Projects easily, quickly and conveniently with <a href="https://open-set-go.netlify.app/" target="blank">Open-Set-Go</a>!
</p>

<p align="center">
  <a href="https://github/AgainIoT/Open-Set-Go_server"><img src="https://img.shields.io/node/v-lts/%40octokit%2Frest" alt="node Version" /></a>
  <a href="/LICENSE"><img src="https://img.shields.io/github/license/AgainIoT/Open-Set-Go_server" alt="License" /></a>
  <a href="https://sonarcloud.io/summary/new_code?id=AgainIoT_Open-Set-Go_server" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=AgainIoT_Open-Set-Go_server&metric=alert_status" alt="Sonar Cloud Scan" /></a>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FAgainIoT%2FOpen-Set-Go_server?ref=badge_shield" target="_blank"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FAgainIoT%2FOpen-Set-Go_server.svg?type=shield&issueType=license" alt="Fossa License Scan" /></a>
  <a href="https://join.slack.com/t/open-set-go/shared_invite/zt-21jwlzs9g-qrajfUblcCtmCqAy0Xxj8w" target="_blank"><img src="https://img.shields.io/badge/Slack-online-brightgreen.svg" alt="Slack"/></a>
  <a href="https://github.com/AgainIoT/Open-Set-Go_server/graphs/contributors" target="_blank"><img src="https://img.shields.io/github/contributors-anon/AgainIoT/Open-Set-Go_server" alt="contributors" /></a>
  <a href="https://github/AgainIoT/Open-Set-Go_server"><img src="https://img.shields.io/github/last-commit/AgainIoT/Open-Set-Go_server" alt="Open-Set-Go_server stars" /></a>
  <a href="https://github/AgainIoT/Open-Set-Go_server"><img src="https://img.shields.io/github/stars/AgainIoT/Open-Set-Go_server" alt="Open-Set-Go_server stars" /></a>
</p>

<br>

## What is the **Open-Set-Go**?

**Open-Set-Go** is the `Open-Source Project Starting toolkit` for Open-Source Developers.

0. Log in with your GitHub ID(GitHub OAuth2)! <br>
   This project is subordinate to GitHub and is being developed on the basis of launching an Open-Source project on GitHub. Therefore, you can log-in to Open-Set-Go with your GitHub ID.

1. Create Repository <br>
   Create a repository to start a new open-source project. You can choose the environment(_e.g., programming language, framework, gitignore, etc._) for your project. Then, your project's environment will be set!

2. Add License <br>
   Allows you to determine and select a license based on the information provided about it.

3. Add Pull-Request Template <br>
   Provides PR templates of several famous open-source projects so that users can create meaningful PR templates.

4. Add Issue Templates <br>
   Provides Issue Template references for several well-known open-source projects for different situations, making it easy for users to create an Issue Template.

5. Create CONTRIBUTING.md <br>
   Provides references to Contributing.md for several well-known open-source projects, while also making it easy to create CONTRIBUTING.md through markdown previewer.

6. Create README.md <br>
   Provides references to README.md for several well-known open-source projects, while also making it easy to create README.md through markdown previewer.

## Why **Open-Set-Go**?

It is not just to create a Source-Open Project, but to create a contribution-friendly environment and create an environment where communication between developers and contributors is smooth to create sustainable open source projects. <br>
In addition, **Open-Set-Go** makes it easy, fast, and simple to build a contribution-friendly environment at the start of an open-source project.

## Vision of **Open-Set-Go**

Can see our vision for the foreseeable future at our project's milestone. <br>

- <a href="https://github.com/AgainIoT/Open-Set-Go/milestones">Open-Set-Go</a>
- <a href="https://github.com/AgainIoT/Open-Set-Go_client/milestones">Open-Set-Go client</a>
- <a href="https://github.com/AgainIoT/Open-Set-Go_server/milestones">Open-Set-Go server</a>

### Final Vision of Open-Set-Go

Open-Set-Go makes it easy, fast and simple to start an Open-Source project, while also sharing your own contribution environment and becoming a community driving the Open-Source trend. _Like GitHub._

## Installation & Development Environment

| Supported Environment | Version          | Description                                          |
| --------------------- | ---------------- | ---------------------------------------------------- |
| Ubuntu OS             | Ubuntu 22.04 LTS | Open-Set-Go_server was developed by Ubuntu OS        |
| Node.js               | >= 18.x          | @ocotokit/rest & styled-reset require >= node v18.x  |
| @nestjs/cli           | 9.5.0            | Open-Set-Go_server is configured by NestJS           |
| yarn                  | 1.22.19          | Open-Set-Go server & client manage package with yarn |


1. Clone our Repository!
    ```bash
    git clone --recursive https://github.com/AgainIoT/Open-Set-Go_server.git

    ######################################
    # Open-Set-Go Repository Dependencies
    #
    # Open-Set-Go_server
    #  ┗ environment-template
    #
    ######################################
    ```

2. Install the Development Environment

3. Install Node Dependencies
    ```bash
    yarn install
    ```
4. Create your own github-oauth app

    Follow the [GitHub Docs](https://docs.github.com/ko/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) to get Client ID & Client Secret.<br>
    If your Authorization URL should be `localhost:3000` !

5. Create `.env` file at root to use secret environment
    ```bash
    touch .env
    ```

6. Fill in the `.env` file as follows.
    ```bash
    MONGODB_URI="<Your-MongoDB-URI-start-with-mongodb://>"
    CLIENT_ID="<Your-GitHub-OAuth-Client_ID>"
    CLIENT_SECRET="<Your-GitHub-OAuth-Client_Secret>"
    JWT_SECRET="<Any-JWT-Secret-You-Want>"
    JWT_EXPIRATION_TIME="<JWT-Expiration-Time-You-Want-default-18000>"
    ```

7. Start Open-Set-Go Server
    ```bash
      yarn start
    ```

## Documentation

We are conducting documentation at Open-Set-Go.io. Please refer to the following. _You can see our technical blog & showcase on Open-Set-Go.io_

- <a href="https://open-set-go.netlify.app/">Open-Set-Go.io</a>

## Contributing

We always welcome your contributions. Please see the <a href="./CONTRIBUTING.md">CONTRIBUTING.md</a> for how to contribute. <br>
Also, we are recruiting collaborators, so if you are interested, please join our [Slack](https://join.slack.com/t/open-set-go/shared_invite/zt-21jwlzs9g-qrajfUblcCtmCqAy0Xxj8w)!

## Contributors

Thank you to everyone who contributed to our project.


### Open-Set-Go_server

<a href="https://github.com/AgainIoT/Open-Set-Go_server/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AgainIoT/Open-Set-Go_server"/>
</a>

_<div align=right>Made with <a href="https://contrib.rocks">contrib.rocks</a></div>_

## License

**Open-Set-Go** is released under <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache-2.0 License</a>.<br>
See the <a href="./LICENSE">LICENSE file</a> for details. <br>

<a href="https://app.fossa.com/projects/git%2Bgithub.com%2FAgainIoT%2FOpen-Set-Go_server?utm_source=share_link"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FAgainIoT%2FOpen-Set-Go_server.svg?type=large"></a>
