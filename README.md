# Open-Set-Go_server

<p align="center">
<a href="https://open-set-go.netlify.app/" target="blank"><img src="https://github.com/AgainIoT/Open-Set-Go/raw/main/.github/images/Open-Set-Go.png" width="200" alt="Open-Set-Go Logo" /></a>
</p>

<p align="center">
  This is <a href="https://www.open-set-go.com" target="blank">Open-Set-Go</a>'s NestJS Server Repository! More details at <a href="https://github.com/AgainIoT/Open-Set-Go">Open-Set-Go Repository</a>!
</p>

<p align="center">
  <a href="https://github/AgainIoT/Open-Set-Go"><img src="https://img.shields.io/node/v-lts/%40octokit%2Frest?logo=node.js&label=node" alt="node Version" /></a>
  <a href="https://sonarcloud.io/summary/new_code?id=AgainIoT_Open-Set-Go_server" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=AgainIoT_Open-Set-Go_server&metric=alert_status" alt="Sonar Cloud Scan" /></a>
  <a href="https://sonarcloud.io/summary/new_code?id=AgainIoT_Open-Set-Go_server"><img src="https://sonarcloud.io/api/project_badges/measure?project=AgainIoT_Open-Set-Go_server&metric=sqale_rating"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=AgainIoT_Open-Set-Go_server"><img src="https://sonarcloud.io/api/project_badges/measure?project=AgainIoT_Open-Set-Go_server&metric=reliability_rating"></a>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FAgainIoT%2FOpen-Set-Go_server?ref=badge_shield" target="_blank"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FAgainIoT%2FOpen-Set-Go_server.svg?type=shield&issueType=license" alt="Fossa License Scan" /></a>
  <a href="https://github.com/AgainIoT/Open-Set-Go"><img src="https://img.shields.io/badge/cloud_run-deployed-brightgreen?logo=googlecloud" alt="google cloud run"></a>
  <a href="https://join.slack.com/t/open-set-go/shared_invite/zt-21jwlzs9g-qrajfUblcCtmCqAy0Xxj8w" target="_blank"><img src="https://img.shields.io/badge/slack-online-brightgreen.svg?logo=slack" alt="Slack"/></a>
  <a href="https://github.com/AgainIoT/Open-Set-Go_server"><img src="https://img.shields.io/github/v/release/AgainIoT/Open-Set-Go_server?logo=github" alt="github release" /></a>
  <a href="https://github.com/AgainIoT/Open-Set-Go_server"><img src="https://img.shields.io/github/release-date/AgainIoT/Open-Set-Go_server?color=blue&logo=github" alt="github last release date" /></a>
  <a href="https://github.com/AgainIoT/Open-Set-Go_server"><img src="https://img.shields.io/github/last-commit/AgainIoT/Open-Set-Go_server?logo=github&color=blue" alt="github commits" /></a>
  <a href="/LICENSE"><img src="https://img.shields.io/github/license/AgainIoT/Open-Set-Go_server?logo=github&color=blue" alt="github License" /></a>
  <a href="https://github.com/AgainIoT/Open-Set-Go_server/graphs/contributors" target="_blank"><img src="https://img.shields.io/github/contributors-anon/AgainIoT/Open-Set-Go_server?logo=github&color=blue" alt="github contributors" /></a>
  <a href="https://github.com/AgainIoT/Open-Set-Go_server"><img src="https://img.shields.io/github/stars/AgainIoT/Open-Set-Go_server?logo=github" alt="github stars" /></a>
  <a href="https://github.com/AgainIoT/Open-Set-Go_server/pulls?q=is%3Apr+is%3Aclosed"><img alt="GitHub closed pull requests" src="https://img.shields.io/github/issues-pr-closed/AgainIoT/Open-Set-Go_server?logo=github&color=blue"></a>
  <a href="https://github.com/AgainIoT/Open-Set-Go_server/issues?q=is%3Aissue+is%3Aclosed"><img alt="GitHub closed issues" src="https://img.shields.io/github/issues-closed/AgainIoT/Open-Set-Go_server?logo=github&color=blue"></a>
<br>

## Description

**Open-Set-Go_server** repository is source code of Open-Set-Go's **NestJS** Server!<br>
You can see more information of our topic on [**Open-Set-Go**](https://github.com/AgainIoT/Open-Set-Go) Repository.

This repository is not about the direction and theme of Open-Set-Go, but about where we're going to go and what improvements we're going to make to our servers!

> If you want to discuss the topic, please use [Discussions from **Open-Set-Go**](https://github.com/AgainIoT/Open-Set-Go/discussions)!

## Installation & Development Environment

| Supported Environment | Version      | Description                                   |
| --------------------- | ------------ | --------------------------------------------- |
| Ubuntu OS             | Ubuntu 22.04 | Open-Set-Go_server was developed by Ubuntu OS |
| Node.js               | >= 18.x      | @ocotokit/rest >= node v18.x                  |
| @nestjs/cli           | 10.1.18      | Open-Set-Go_server is configured by NestJS    |
| yarn                  | 1.22.19      | Open-Set-Go server manage package with yarn   |

### Install with script

You can also easily install it through [install.sh](https://github.com/AgainIoT/Open-Set-Go#installation--development-environment)!

### Install with docker

1. Pull our docker image!

   ```
    docker pull ymw0407/open-set-go_server
   ```

2. Create `.env` file at root to use secret environment

   > See more details at [EnvironmentVariable.md](https://github.com/AgainIoT/Open-Set-Go/blob/main/EnvironmentVariable.md)

3. Start Open-Set-Go Server's docker with environment variable!

### Install Manually

1. Clone our Repository!

   ```bash
   git clone https://github.com/AgainIoT/Open-Set-Go_server.git
   ```

2. Install the Development Environment

3. Install Node Dependencies
   ```bash
   yarn install
   ```
4. Create `.env` file at root to use secret environment

   > See more details at [EnvironmentVariable.md](https://github.com/AgainIoT/Open-Set-Go/blob/main/EnvironmentVariable.md)

5. Start Open-Set-Go Server

   ```bash
     # for development
     yarn start
     yarn start:dev # Restart by detecting changes in the file!

     # for production
     yarn build
     node dist/main.js
   ```

## Documentation

We are conducting documentation at Open-Set-Go.io. Please refer to the following. _You can see our technical blog & showcase on Open-Set-Go.io_

- <a href="https://docs.open-set-go.com">Open-Set-Go.io</a>

## Contributing

We always welcome your contributions. Please see the <a href="./CONTRIBUTING.md">CONTRIBUTING.md</a> for how to contribute. <br>
Also, we are recruiting collaborators, so if you are interested, please join our [Slack](https://join.slack.com/t/open-set-go/shared_invite/zt-21jwlzs9g-qrajfUblcCtmCqAy0Xxj8w)!

## Contributors

Thank you to everyone who contributed to our project.

<a href="https://github.com/AgainIoT/Open-Set-Go_server/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AgainIoT/Open-Set-Go_server"/>
</a>

_<div align=right>Made with <a href="https://contrib.rocks">contrib.rocks</a></div>_

## License

**Open-Set-Go** is released under <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache-2.0 License</a>.<br>
See the <a href="./LICENSE">LICENSE file</a> for details. <br>

<a href="https://app.fossa.com/projects/git%2Bgithub.com%2FAgainIoT%2FOpen-Set-Go_server?utm_source=share_link"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FAgainIoT%2FOpen-Set-Go_server.svg?type=large"></a>

<a href="https://sonarcloud.io/summary/new_code?id=AgainIoT_Open-Set-Go_server"><img src="https://sonarcloud.io/images/project_badges/sonarcloud-white.svg"></a>
