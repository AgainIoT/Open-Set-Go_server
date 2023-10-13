# Index

- [auth module](#auth-module)
- [user module](#user-module)
- [repo module](#repo-module)
- [mail module](#mail-module)
- [file module](#file-module)
  - [file/license module](#filelicense-module)
  - [file/pr module](#filepr-module)
  - [file/issue module](#fileissue-module)
  - [file/contributing module](#filecontributing-module)
  - [file/readme module](#filereadme-module)
- [review module](#review-module)
  - [review/file module](#reviewfile-module)

## Auth Module

| Method | Request Path                             | Request Body      | Response Body | Description        |
| ------ | ---------------------------------------- | ----------------- | ------------- | ------------------ |
| POST   | /auth/github-login?code=\<**authCode**\> |                   |               | GitHub OAuth Login |
| POST   | /auth/github-logout                      | only need cookies |               | Remove Cookies     |

> 🗒️ note: <br>
> Auth Module is based on GitHub OAuth Apps!<br>
> You can get your testing **authCode** at our [GitHub OAuth Apps](https://github.com/login/oauth/authorize?client_id=39ae041e1cd34ce4723e&redirect_uri=https://localhost:3000/login&scope=repo,write:org,read:user,user:email)<br>
> Request of `/auth/github-login?code` give you cookies that can access every request that need cookies

## User Module

| Method | Request Path      | Request Body      | Response Body                     | Description                |
| ------ | ----------------- | ----------------- | --------------------------------- | -------------------------- |
| GET    | /user/profile     | only need cookies | [Response Body](#userprofile)     | User Info for user profile |
| GET    | /user/grantedInfo | only need cookies | [Response Body](#usergrantedinfo) | userInfo with org          |

### /user/profile

#### Response Body

```json
// case 1 [200]
{
  "id": "ymw0407",
  "name": "Yun Min Woo",
  "avatar": "https://avatars.githubusercontent.com/u/77202633?v=4"
}
```

### /user/grantedInfo

#### Response Body

```json
// case 1 [200]
{
  "id": "ymw0407",
  "avatar": "https://avatars.githubusercontent.com/u/77202633?v=4",
  "org": [
    {
      "id": "webOS-KOSS",
      "avatar": "https://avatars.githubusercontent.com/u/108121726?v=4"
    },
    {
      "id": "AgainIoT",
      "avatar": "https://avatars.githubusercontent.com/u/128156954?v=4"
    },
    {
      "id": "C-Snake",
      "avatar": "https://avatars.githubusercontent.com/u/133626056?v=4"
    }
  ]
}
```

## Repo Module

| Method | Request Path           | Request Body                                    | Response Body                          | Description                                   |
| ------ | ---------------------- | ----------------------------------------------- | -------------------------------------- | --------------------------------------------- |
| POST   | /repo                  | cookies + [Request Body](#repo)                 | [Response Body](#repo)                 | creating repository with description          |
| POST   | /repo/checkDuplication | cookies + [Request Body](#repocheckduplication) | [Response Body](#repocheckduplication) | check repository is duplicate                 |
| GET    | /repo/getPulbicRepo    | only need cookies                               | [Response Body](#repogetpublicrepo)    | get public repository that granted            |
| GET    | /repo/getRepoDetails   | cookies + [Request Body](#repogetrepodetails)   | [Response Body](#repogetrepodetails)   | get detail information of specific repository |

### /repo

#### Request Body

```json
// case 1: Normal Case -> creating repository successfully [200]
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go_test",
  "description": "This is the test of creating repository with `/repo` POST Method"
}
// case 2: Worse Case -> already existing repository [404]
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go_server",
  "description": "This is the test of creating repository with `/repo` POST Method"
}
```

#### Response Body

```json
// case 1: Normal Case -> creating repository successfully [200]
OK
// case 2: Worse Case -> already existing repository [404]
Not Found
```

### /repo/checkDuplication

#### Request Body

```json
// case 1: creatable repository [201]
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go_test"
}
// case 2: already existing repository [201]
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go_server"
}
```

#### Response Body

```json
// case 1: creatable repository [201]
true
// case 2: already existing repository [201]
false
```

### /repo/getPulbicRepo

#### Response Body

```json
// case 1 [200]
[
  {
    "owner": "ymw0407",
    "avatar": "https://avatars.githubusercontent.com/u/77202633?v=4",
    "repoName": [
      "0592006-03",
      "2022ESWContest_webOS_3013",
      "22_summer_bootcamp",
      "adsfa",
      "Algorithm",
      "Backend-study",
      "C-Snake-main",
      "Everyones-Transfer_Main",
      "GitBookPyQt",
      "GitHub-Action-Study",
      "GitHub-RestAPI",
      "Go-gRPC-Study",
      "grpc_client",
      "KOSS-BootCamp-PyQt",
      "mqtt-sensor-dummydata",
      "OOP-Study-with-Java",
      "Open-Set-Go",
      "Open-Set-Go_server",
      "productive-box",
      "SoftwareProject2",
      "terraform-provider-ncloud",
      "testasdfasdf",
      "WAMP_Study",
      "ymw0407",
      "ymw0407.github.io",
      "YongMoon-Voluntary"
    ]
  },
  {
    "owner": "AgainIoT",
    "avatar": "https://avatars.githubusercontent.com/u/128156954?v=4",
    "repoName": [
      ".github",
      "Open-Set-Go",
      "Open-Set-Go.io",
      "Open-Set-Go_client",
      "Open-Set-Go_server"
    ]
  }
]
```

### /repo/getRepoDetails

#### Request Body

```json
// case 1 [201]
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go_server"
}

// case 2 [201]
{
  "owner": "ymw0407",
  "repoName": "ymw0407"
}
```

#### Response Body

```json
// case 1 [201]
{
  "owner": "AgainIoT",
  "name": "Open-Set-Go_server",
  "fullName": "AgainIoT/Open-Set-Go_server",
  "repoURL": "https://github.com/AgainIoT/Open-Set-Go_server",
  "description": "'Project Starting Toolkit' for OpenSource SW developers who can easily, quickly and conveniently start an Open Source project.",
  "language": "TypeScript",
  "star": 8,
  "fork": 3
}

// case 2 [201]
{
  "owner": "ymw0407",
  "name": "ymw0407",
  "fullName": "ymw0407/ymw0407",
  "repoURL": "https://github.com/ymw0407/ymw0407",
  "description": null,
  "language": null,
  "star": 0,
  "fork": 0
}
```

## Mail Module

| Method | Request Path | Request Body      | Response Body                     | Description                                 |
| ------ | ------------ | ----------------- | --------------------------------- | ------------------------------------------- |
| POST   | /mail        | only need cookies | Status will send(NOT FOUND or OK) | send mail to user(after respository create) |

> 🗒️ note: <br>
> If the mail didn't come to the set primary mail account on GitHub, please take a look at the spam box!

## File Module

| Method | Request Path       | Request Body                    | Response Body                      | Description               |
| ------ | ------------------ | ------------------------------- | ---------------------------------- | ------------------------- |
| POST   | /file              | cookies + [Request Body](#file) | Status will send(NOT FOUND or OK)  | upload file to repository |
| GET    | /file/supportedEnv |                                 | [Response Body](#filesupportedenv) | give supportedEnv         |

### /file

#### Request Body

```json
// case 1 [200]
{
  "owner": "ymw0407",
  "repoName": "testasdfasdf",
  "language": "JavaScript(Node.js)",
  "framework": "Express.js",
  "gitignore": ["VisualStudioCode", "Linux"],
  "PRTemplate": "### markdown",
  "IssueTemplate": [
    {
      "type": "Bug_Report",
      "content": "test"
    },
    {
      "type": "Feature_Request",
      "content": "test22"
    }
  ],
  "contributingMd": "### contributing.md",
  "readmeMd": "### readme.md",
  "license": "mit"
}
```

#### Response Body

```json
// case 1 [200]
OK
```

### /file/supportedEnv

#### Response Body

```json
// case 1 [200]
[
  {
    "language": "JavaScript(Node.js)",
    "frameworks": [
      {
        "framework": "React",
        "path": "/React"
      },
      {
        "framework": "Express.js",
        "path": "/Expressjs"
      }
    ]
  },
  {
    "language": "TypeScript(Node.js)",
    "frameworks": [
      {
        "framework": "NestJS",
        "path": "/NestJS"
      }
    ]
  }
]
```

## File/license Module

| Method | Request Path  | Request Body      | Response Body                 | Description             |
| ------ | ------------- | ----------------- | ----------------------------- | ----------------------- |
| GET    | /file/license | only need cookies | [Response Body](#filelicense) | get license information |

### /file/license

#### Response Body

```json
[
  {
    "license": "apache-2.0",
    "name": "Apache License 2.0",
    "description": "A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.",
    "permissions": [
      "commercial-use",
      "modifications",
      "distribution",
      "patent-use",
      "private-use"
    ],
    "conditions": ["include-copyright", "document-changes"],
    "limitations": ["trademark-use", "liability", "warranty"],
    "featured": true
  },
  {
    "license": "mit",
    "name": "MIT License",
    "description": "A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.",
    "permissions": [
      "commercial-use",
      "modifications",
      "distribution",
      "private-use"
    ],
    "conditions": ["include-copyright"],
    "limitations": ["liability", "warranty"],
    "featured": true
  } // ... more than 5 licenses
]
```

## File/pr Module

| Method | Request Path    | Request Body            | Response Body                  | Description                |
| ------ | --------------- | ----------------------- | ------------------------------ | -------------------------- |
| POST   | /file/pr        | [Request Body](#filepr) | [Response Body](#filepr)       | get prs information        |
| GET    | /file/pr/\<id>  |                         | [Response Body](#fileprid)     | get pr information only id |
| GET    | /file/pr/amount |                         | [Response Body](#filepramount) | get pr temlates amount     |

### /file/pr

#### Request Body

```json
{
  "page": 0 /* 0 ~ 3 ex) 25 -> 25 ~ 28*/,
  "amount": 4 /* default is 20, the number of pr template */
}
```

#### Response Body

```json
[
  {
    "_id": "64f175c218eed0c9b21a2f2e",
    "repoName": "AgainIoT/Open-Set-Go",
    "repoUrl": "https://github.com/AgainIoT/Open-Set-Go",
    "star": 26
  },
  {
    "_id": "64f2fedb2a1079c11a9a646e",
    "title": "simple-preset",
    "repoName": "michaelkolesidis/javascript-software-synthesizer",
    "repoUrl": "https://github.com/michaelkolesidis/javascript-software-synthesizer",
    "star": 20
  },
  {
    "_id": "64f324482a1079c11a9a6470",
    "title": "detail-preset",
    "repoName": "OpenRoberta/openroberta-lab",
    "repoUrl": "https://github.com/OpenRoberta/openroberta-lab",
    "star": 100000
  },
  {
    "_id": "64f326072a1079c11a9a6471",
    "title": "comment-preset",
    "repoName": "inversify/InversifyJS",
    "repoUrl": "https://github.com/inversify/InversifyJS",
    "star": 100012
  }
]
```

### /file/pr/\<id>

#### Response Body

```plain
- **Please check if the PR fulfills these requirements**

* [ ] Tests for the changes have been added (for bug fixes / features)
* [ ] Docs have been added / updated (for bug fixes / features)

- **What kind of change does this PR introduce?** (Bug fix, feature, docs update, ...)

* **What is the current behavior?** (You can also link to an open issue here)

- **What is the new behavior (if this is a feature change)?**

* **Does this PR introduce a breaking change?** (What changes might users need to make in their application due to this
PR?)

- **Other information**:
```

### /file/pr/amount

#### Response Body

```json
80
```

## File/issue Module

| Method | Request Path      | Request | Response Body                 | Description                 |
| ------ | ----------------- | ------- | ----------------------------- | --------------------------- |
| GET    | /file/issue       |         | [Response Body](#fileissue)   | get issue templates         |
| GET    | /file/issue/\<id> |         | [Response Body](#fileissueid) | get issue templates content |

### /file/issue

#### Response Body

```json
[
  {
    "type": "Bug_Report",
    "templates": [
      {
        "id": "64ec8e19ad1cef842264f78c",
        "title": "Bug Report for Web Service"
      },
      {
        "id": "652893f822ee43f98993b51f",
        "title": "Bug Report for Web Service2"
      }
    ]
  },
  {
    "type": "Feature_Request",
    "templates": [
      {
        "id": "6528934c22ee43f98993b51d",
        "title": "Feature Request for Web Service"
      }
    ]
  },
  {
    "type": "Documentation_Issue",
    "templates": [
      {
        "id": "6528938422ee43f98993b51e",
        "title": "Documentation Issue for Web Service"
      }
    ]
  }
]
```

### /file/issue/\<id>

#### Response Body

```plain
body:
- type: dropdown
id: browsers
attributes:
label: "Browsers"
description: What browsers are you seeing the problem on?
multiple: true
options:
- Firefox
- Chrome
- Safari
- Microsoft Edge
- Opera
validations:
required: true

- type: dropdown
id: os
attributes:
label: "OS"
description: What is the impacted environment?
multiple: true
options:
- Windows
- Linux
- Mac
validations:
required: true

- type: textarea
id: description
attributes:
label: "Description"
description: Enter an explicit description of your issue and explain the bug briefly and clearly.
validations:
required: true

- type: input
id: reprod-url
attributes:
label: "Reproduction URL"
description: Add a URL related to the bug.
placeholder: ex) https://github.com/USERNAME/REPO-NAME
validations:
required: true

- type: textarea
id: reprod-steps
attributes:
label: "Reproduction Steps"
description: Explain your issue step by step.
render: bash
validations:
required: true

- type: textarea
id: solution
attributes:
label: "Solutions"
description: If you have a solution, please share it.
render: bash
validations:
required: false

- type: textarea
id: screenshot
attributes:
label: "Screenshots"
description: Add screenshots to help explain your problem.
value: |
![DESCRIPTION](LINK.png)
render: bash
validations:
required: false
```

## File/contributing Module

| Method | Request Path                | Request                                   | Response Body                              | Description                           |
| ------ | --------------------------- | ----------------------------------------- | ------------------------------------------ | ------------------------------------- |
| GET    | /file/contributing          | [Request Query](#filecontributing)        | [Response Body](#filecontributing)         | get contributings information         |
| GET    | /file/contributing/\<id>    |                                           | [Response Body](#filecontributingid)       | get contributings information only id |
| GET    | /file/contributing/amount   |                                           | [Response Body](#filecontributingamount)   | get contributing temlates amount      |
| POST   | /file/contributing/generate | [Request Body](#filecontributinggenerate) | [Response Body](#filecontributinggenerate) | get contributings for generate        |

### /file/contributing

#### Request Query

```json
// case 1 - page=2, amount=3 -> 6 ~ 8 [200]
"http://localhost:8080/file/contributing?page=2&amount=3"

// case 2 - page=1 -> amount will be 20 -> 0 ~ 19 [200]
"http://localhost:8080/file/contributing?page=1"
```

#### Response Body

```json
// case 1 - page=2, amount=3 -> 6 ~ 8 [200]
[
  {
    "_id": "652861f1dea21592d9928f29",
    "repoName": "aws/awc-cli",
    "star": 14330,
    "license": "Apache License 2.0"
  },
  {
    "_id": "652861aadea21592d9928f28",
    "repoName": "GoogleCloudPlatform/cloud-builders",
    "star": 1308,
    "license": "Apache License 2.0"
  },
  {
    "_id": "65286020dea21592d9928f26",
    "repoName": "octokit/core.js",
    "star": 1082,
    "license": "MIT License"
  }
]

// case 2 - page=1 -> amount will be 20 -> 0 ~ 19 [200]
[
    {
        "_id": "6528614ddea21592d9928f27",
        "repoName": "gohugoio/hugo",
        "star": 69355,
        "license": "Apache License 2.0"
    },
    {
        "_id": "65285f58dea21592d9928f23",
        "repoName": "expressjs/express",
        "star": 62068,
        "license": "MIT License"
    },
    {
        "_id": "65285d90dea21592d9928f22",
        "repoName": "nestjs/nest",
        "star": 60270,
        "license": "MIT License"
    },
    {
        "_id": "652861f1dea21592d9928f29",
        "repoName": "aws/awc-cli",
        "star": 14330,
        "license": "Apache License 2.0"
    },
    {
        "_id": "652861aadea21592d9928f28",
        "repoName": "GoogleCloudPlatform/cloud-builders",
        "star": 1308,
        "license": "Apache License 2.0"
    },
    {
        "_id": "65286020dea21592d9928f26",
        "repoName": "octokit/core.js",
        "star": 1082,
        "license": "MIT License"
    },
    {
        "_id": "65285c35dea21592d9928f21",
        "repoName": "AgainIoT/Open-Set-Go_server",
        "star": 8,
        "license": "Apache License 2.0"
    }
]
```

### /file/contributing/\<id>

#### Response Body

```
## Content of the contributing.md... too long...
```

### /file/contributing/amount

#### Response Body

```json
{
  "amount": 7
}
```

### /file/contributing/generate

#### Request Body

```json
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go",
  "description": "Open-Set-Go is the name of asdfadsfasdfasdfadsadsfasasd", // optional
  "license": "Apaceh 2.0 License" // optional
}
```

#### Response Body

```json
[
  {
    "_id": "6527a963f2ab4fc291e5ffcf",
    "index": 1,
    "type": "Title and Description",
    "content": "# Open-Set-Go\n\n<p align=\"center\">\n<a href=\"https://github.com/AgainIoT/Open-Set-Go/\" target=\"blank\"><img src=\"https://github.com/AgainIoT/Open-Set-Go/raw/main/.github/images/Open-Set-Go.png\" width=\"200\" alt=\"Enter Your Logo!\" /></a>\n</p>\n\n<p align=\"center\">\n  Open-Set-Go is the name of asdfadsfasdfasdfadsadsfasasd\n</p>\n\n<p align=\"center\">\n  <a href=\"/LICENSE\"><img src=\"https://img.shields.io/github/license/AgainIoT/Open-Set-Go\" alt=\"License\" /></a>\n  <a href=\"https://github.com/AgainIoT/Open-Set-Go/graphs/contributors\" target=\"_blank\"><img src=\"https://img.shields.io/github/contributors-anon/AgainIoT/Open-Set-Go\" alt=\"contributors\" /></a>\n  <a href=\"https://github/AgainIoT/Open-Set-Go\"><img src=\"https://img.shields.io/github/last-commit/AgainIoT/Open-Set-Go\" alt=\"your repo's last-commit\" /></a>\n  <a href=\"https://github/AgainIoT/Open-Set-Go\"><img src=\"https://img.shields.io/github/stars/AgainIoT/Open-Set-Go\" alt=\"your repo's stars\" /></a>\n  <a href=\"https://github/AgainIoT/Open-Set-Go\"><img src=\"https://img.shields.io/github/forks/AgainIoT/Open-Set-Go\" alt=\"your repo's forks\" /></a>\n  <a href=\"https://github/AgainIoT/Open-Set-Go\"><img src=\"https://img.shields.io/github/watchers/AgainIoT/Open-Set-Go\" alt=\"your repo's watchers\" /></a>\n  <a href=\"https://github/AgainIoT/Open-Set-Go\"><img src=\"https://img.shields.io/github/issues/AgainIoT/Open-Set-Go\" alt=\"your repo's issues\" /></a>\n</p>\n"
  },
  {
    "_id": "6527ab64f2ab4fc291e5ffd1",
    "index": 6,
    "type": "License",
    "content": "# License\n\nOpen-Set-Go is released under Apaceh 2.0 License.\nSee the [LICENSE file](\"./LICENSE\") for details.\n"
  }
]
```

## File/readme Module

| Method | Request Path          | Request                             | Response Body                        | Description                     |
| ------ | --------------------- | ----------------------------------- | ------------------------------------ | ------------------------------- |
| GET    | /file/readme          | [Request Query](#filereadme)        | [Response Body](#filereadme)         | get readmes information         |
| GET    | /file/readme/\<id>    |                                     | [Response Body](#filereadmeid)       | get readmes information only id |
| GET    | /file/readme/amount   |                                     | [Response Body](#filereadmeamount)   | get readme temlates amount      |
| POST   | /file/readme/generate | [Request Body](#filereadmegenerate) | [Response Body](#filereadmegenerate) | get readmes for generate        |

### /file/readme

#### Request Query

```json
// case 1 - page=2, amount=3 -> 6 ~ 8 [200]
"http://localhost:8080/file/readme?page=2&amount=3"

// case 2 - page=1 -> amount will be 20 -> 0 ~ 19 [200]
"http://localhost:8080/file/readme?page=1"
```

#### Response Body

```json
// case 1 - page=2, amount=3 -> 6 ~ 8 [200]
[
  {
    "_id": "652861f1dea21592d9928f29",
    "repoName": "aws/awc-cli",
    "star": 14330,
    "license": "Apache License 2.0"
  },
  {
    "_id": "652861aadea21592d9928f28",
    "repoName": "GoogleCloudPlatform/cloud-builders",
    "star": 1308,
    "license": "Apache License 2.0"
  },
  {
    "_id": "65286020dea21592d9928f26",
    "repoName": "octokit/core.js",
    "star": 1082,
    "license": "MIT License"
  }
]

// case 2 - page=1 -> amount will be 20 -> 0 ~ 19 [200]
[
    {
        "_id": "6528614ddea21592d9928f27",
        "repoName": "gohugoio/hugo",
        "star": 69355,
        "license": "Apache License 2.0"
    },
    {
        "_id": "65285f58dea21592d9928f23",
        "repoName": "expressjs/express",
        "star": 62068,
        "license": "MIT License"
    },
    {
        "_id": "65285d90dea21592d9928f22",
        "repoName": "nestjs/nest",
        "star": 60270,
        "license": "MIT License"
    },
    {
        "_id": "652861f1dea21592d9928f29",
        "repoName": "aws/awc-cli",
        "star": 14330,
        "license": "Apache License 2.0"
    },
    {
        "_id": "652861aadea21592d9928f28",
        "repoName": "GoogleCloudPlatform/cloud-builders",
        "star": 1308,
        "license": "Apache License 2.0"
    },
    {
        "_id": "65286020dea21592d9928f26",
        "repoName": "octokit/core.js",
        "star": 1082,
        "license": "MIT License"
    },
    {
        "_id": "65285c35dea21592d9928f21",
        "repoName": "AgainIoT/Open-Set-Go_server",
        "star": 8,
        "license": "Apache License 2.0"
    }
]
```

### /file/readme/\<id>

#### Response Body

```
## Content of the readme.md... too long...
```

### /file/readme/amount

#### Response Body

```json
{
  "amount": 7
}
```

### /file/readme/generate

#### Request Body

```json
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go",
  "description": "Open-Set-Go is the name of asdfadsfasdfasdfadsadsfasasd", // optional
  "license": "Apaceh 2.0 License" // optional
}
```

#### Response Body

```json
[
  {
    "_id": "6527a963f2ab4fc291e5ffcf",
    "index": 1,
    "type": "Title and Description",
    "content": "# Open-Set-Go\n\n<p align=\"center\">\n<a href=\"https://github.com/AgainIoT/Open-Set-Go/\" target=\"blank\"><img src=\"https://github.com/AgainIoT/Open-Set-Go/raw/main/.github/images/Open-Set-Go.png\" width=\"200\" alt=\"Enter Your Logo!\" /></a>\n</p>\n\n<p align=\"center\">\n  Open-Set-Go is the name of asdfadsfasdfasdfadsadsfasasd\n</p>\n\n<p align=\"center\">\n  <a href=\"/LICENSE\"><img src=\"https://img.shields.io/github/license/AgainIoT/Open-Set-Go\" alt=\"License\" /></a>\n  <a href=\"https://github.com/AgainIoT/Open-Set-Go/graphs/contributors\" target=\"_blank\"><img src=\"https://img.shields.io/github/contributors-anon/AgainIoT/Open-Set-Go\" alt=\"contributors\" /></a>\n  <a href=\"https://github/AgainIoT/Open-Set-Go\"><img src=\"https://img.shields.io/github/last-commit/AgainIoT/Open-Set-Go\" alt=\"your repo's last-commit\" /></a>\n  <a href=\"https://github/AgainIoT/Open-Set-Go\"><img src=\"https://img.shields.io/github/stars/AgainIoT/Open-Set-Go\" alt=\"your repo's stars\" /></a>\n  <a href=\"https://github/AgainIoT/Open-Set-Go\"><img src=\"https://img.shields.io/github/forks/AgainIoT/Open-Set-Go\" alt=\"your repo's forks\" /></a>\n  <a href=\"https://github/AgainIoT/Open-Set-Go\"><img src=\"https://img.shields.io/github/watchers/AgainIoT/Open-Set-Go\" alt=\"your repo's watchers\" /></a>\n  <a href=\"https://github/AgainIoT/Open-Set-Go\"><img src=\"https://img.shields.io/github/issues/AgainIoT/Open-Set-Go\" alt=\"your repo's issues\" /></a>\n</p>\n"
  },
  {
    "_id": "6527ab64f2ab4fc291e5ffd1",
    "index": 6,
    "type": "License",
    "content": "# License\n\nOpen-Set-Go is released under Apaceh 2.0 License.\nSee the [LICENSE file](\"./LICENSE\") for details.\n"
  }
]
```

## Review Module

| Method | Request Path      | Request Body                               | Response Body                     | Description                                                               |
| ------ | ----------------- | ------------------------------------------ | --------------------------------- | ------------------------------------------------------------------------- |
| POST   | /review/template  | cookies + [Request Body](#reviewtemplate)  | [Response Body](#reviewtemplate)  | review pr & issue template, readme, contributing exist                    |
| POST   | /review/community | cookies + [Request Body](#reviewcommuntiy) | [Response Body](#reviewcommuntiy) | review description, code of conduct, discussion, license exist or enabled |
| POST   | /review/seurity   | cookies + [Request Body](#reviewsecurity)  | [Response Body](#reviewsecurity)  | review dependabot, codeql, secretscanning, security policy enabled        |

### /review/template

#### Request Body

```json
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go"
}
```

#### Response Body

```json
{
  "pr": true, // or false
  "issue": true, // or false
  "contributing": true, // or false
  "readme": true // or false
}
```

### /review/community

#### Request Body

```json
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go"
}
```

#### Response Body

```json
{
  "description": true,
  "license": {
    "exist": true,
    "name": "MIT"
  },
  "conduct": true,
  "discussion": true
}
```

### /review/security

#### Request Body

```json
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go"
}
```

#### Response Body

```json
{
  "codeql": true,
  "secretScan": true,
  "securityPolicy": true,
  "dependabot": true
}
```

## Review/file Module

| Method | Request Path              | Request Body                                      | Response Body                            | Description                                                   |
| ------ | ------------------------- | ------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| POST   | /review/file/pr           | cookies + [Request Body](#reviewfilepr)           | [Response Body](#reviewfilepr)           | create Pull-Request at target repository with pr template     |
| POST   | /review/file/issue        | cookies + [Request Body](#reviewfileissue)        | [Response Body](#reviewfileissue)        | create Pull-Request at target repository with issue template  |
| POST   | /review/file/contributing | cookies + [Request Body](#reviewfilecontributing) | [Response Body](#reviewfilecontributing) | create Pull-Request at target repository with CONTRIBUTING.md |
| POST   | /review/file/readme       | cookies + [Request Body](#reviewfilereadme)       | [Response Body](#reviewfilereadme)       | create Pull-Request at target repository with README.md       |

### /review/file/pr

#### Request Body

```json
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go",
  "content": "## test Markdown\n- test1\n- test2"
}
```

#### Response Body

```plain
https://github.com/AgainIoT/Open-Set-Go/pull/12
```

### /review/file/issue

#### Request Body

```json
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go",
  "issues": [
    {
      "category": "Bug_Report",
      "content": "---\nname: \"🐛 Bug Report\"\ndescription: Report a bug\ntitle: \"🐛 [BUG] - <title>\"\nlabels: [\"bug\"]\nassignees: []"
    },
    {
      "category": "Feature_Request",
      "content": "---\nname: \"🐛 Bug Report\"\ndescription: Report a bug\ntitle: \"🐛 [BUG] - <title>\"\nlabels: [\"bug\"]\nassignees: []"
    }
  ]
}
```

### /review/file/contributing

#### Request Body

```json
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go",
  "content": "## test Markdown\n- test1\n- test2"
}
```

#### Response Body

```plain
https://github.com/AgainIoT/Open-Set-Go/pull/12
```

### /review/file/readme

#### Request Body

```json
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go",
  "content": "## test Markdown\n- test1\n- test2"
}
```

#### Response Body

```plain
https://github.com/AgainIoT/Open-Set-Go/pull/12
```
