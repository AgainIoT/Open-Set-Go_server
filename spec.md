| Method | Request Path                         | Request Body                                    | Response Body                            | Description                                                               |
| ------ | ------------------------------------ | ----------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------- |
| POST   | /auth/github-login?code=\<authCode\> |                                                 |                                          | GitHub OAuth Login                                                        |
| POST   | /auth/github-logout                  | only need cookies                               |                                          | Remove Cookies                                                            |
| GET    | /user/profile                        | only need cookies                               | [Response Body](#userprofile)            | User Info for user profile                                                |
| GET    | /user/grantedInfo                    | only need cookies                               | [Response Body](#usergrantedinfo)        | userInfo with org                                                         |
| POST   | /repo                                | cookies + [Request Body](#repocheckduplication) | Status will send(NOT FOUND or OK)        | userInfo with org                                                         |
| POST   | /repo/checkDuplication               | cookies + [Request Body](#repo)                 | true/false(Boolean)                      | check repository is duplicate                                             |
| GET    | /repo/getPulbicRepo                  | only need cookies                               | [Response Body](#repogetpublicrepo)      | get public repository that granted                                        |
| POST   | /mail                                | only need cookies                               | Status will send(NOT FOUND or OK)        | send mail to user(after respository create)                               |
| POST   | /file                                | cookies + [Request Body](#file)                 | Status will send(NOT FOUND or OK)        | upload file to repository                                                 |
| GET    | /file/supportedEnv                   |                                                 | [Response Body](#filesupportedenv)       | give supportedEnv                                                         |
| GET    | /file/license                        |                                                 | [Response Body](#filelicense)            | get license information                                                   |
| GET    | /file/pr                             | [Request Body](#filepr)                         | [Response Body](#filepr)                 | get prs information                                                       |
| GET    | /file/pr/\<id>                       |                                                 | [Response Body](#fileprid)               | get pr information only id                                                |
| GET    | /file/pr/amount                      |                                                 | [Response Body](#filepramount)           | get pr temlates amount                                                    |
| GET    | /file/contributing                   | [Request Body](#filecontributing)               | [Response Body](#filecontributing)       | get contributings information                                             |
| GET    | /file/contributing/\<id>             |                                                 | [Response Body](#filecontributingid)     | get contributings information only id                                     |
| GET    | /file/contributing/amount            |                                                 | [Response Body](#filecontributingamount) | get contributing temlates amount                                          |
| GET    | /file/readme                         | [Request Body](#filereadme)                     | [Response Body](#filereadme)             | get readmes information                                                   |
| GET    | /file/readme/\<id>                   |                                                 | [Response Body](#filereadmeid)           | get readmes information only id                                           |
| GET    | /file/readme/amount                  |                                                 | [Response Body](#filereadmeamount)       | get readmes temlates amount                                               |
| POST   | /review/template                     | cookies + [Request Body](#reviewtemplate)       | [Response Body](#reviewtemplate)         | review pr & issue template, readme, contributing exist                    |
| POST   | /review/community                    | cookies + [Request Body](#reviewcommuntiy)      | [Response Body](#reviewcommuntiy)        | review description, code of conduct, discussion, license exist or enabled |
| POST   | /review/seurity                      | cookies + [Request Body](#reviewsecurity)       | [Response Body](#reviewsecurity)         | review dependabot, codeql, secretscanning, security policy enabled        |
|        |

### /user/profile

#### Response Body

```json
{
  "id": "ymw0407",
  "name": "Yun Min Woo",
  "avatar": "https://avatars.githubusercontent.com/u/77202633?v=4"
}
```

### /user/grantedInfo

#### Response Body

```json
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

### /repo

#### Request Body

```json
{
  "owner": "AgainIoT",
  "repoName": "test2",
  "description": "test22"
}
```

### /repo/checkDuplication

#### Request Body

```json
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go"
}
```

### /repo/getPulbicRepo

#### Reponse Body

```json
[
  {
    "owner": "AgainIoT",
    "avatar": "https://avatars.githubusercontent.com/u/128156954?v=4",
    "repoName": [
      ".github",
      "environment-template",
      "Open-Set-Go",
      "Open-Set-Go.io",
      "Open-Set-Go_client",
      "Open-Set-Go_server"
    ]
  },
  {
    "owner": "C-Snake",
    "avatar": "https://avatars.githubusercontent.com/u/133626056?v=4",
    "repoName": ["C-Snake-main"]
  },
  {
    "owner": "kmu-koss",
    "avatar": "https://avatars.githubusercontent.com/u/81721512?v=4",
    "repoName": [
      "2021ESWContest_robot_2002",
      "2022ESWContest_webOS_3013",
      "2023-1_Android_Study",
      "2023-1_IoT_Study",
      "2023-1_Web_Basic_Study",
      "2023_WebBasic1_Project",
      "2023_WebBasic2_Project",
      "22_iot_study",
      "22_summer_bootcamp",
      "Bzero",
      "Firstick-APP",
      "GIT101",
      "GitBookFrontend",
      "GitBookPyQt",
      "kmu.ac",
      "KOSS_AD-Project",
      "Open-Set-Go",
      "Open-SW-Developer-Contest",
      "SendSMS",
      "SensorCloud",
      "smart_planting",
      "team2",
      "YongMoon-Voluntary"
    ]
  },
  {
    "owner": "AgainIoT",
    "avatar": "https://avatars.githubusercontent.com/u/128156954?v=4",
    "repoName": [
      ".github",
      "environment-template",
      "Open-Set-Go",
      "Open-Set-Go.io",
      "Open-Set-Go_client",
      "Open-Set-Go_server"
    ]
  },
  {
    "owner": "C-Snake",
    "avatar": "https://avatars.githubusercontent.com/u/133626056?v=4",
    "repoName": ["C-Snake-main"]
  },
  {
    "owner": "kmu-koss",
    "avatar": "https://avatars.githubusercontent.com/u/81721512?v=4",
    "repoName": [
      "2021ESWContest_robot_2002",
      "2022ESWContest_webOS_3013",
      "2023-1_Android_Study",
      "2023-1_IoT_Study",
      "2023-1_Web_Basic_Study",
      "2023_WebBasic1_Project",
      "2023_WebBasic2_Project",
      "22_iot_study",
      "22_summer_bootcamp",
      "Bzero",
      "Firstick-APP",
      "GIT101",
      "GitBookFrontend",
      "GitBookPyQt",
      "kmu.ac",
      "KOSS_AD-Project",
      "Open-Set-Go",
      "Open-SW-Developer-Contest",
      "SendSMS",
      "SensorCloud",
      "smart_planting",
      "team2",
      "YongMoon-Voluntary"
    ]
  }
]
```

### /file

#### Request Body

```json
{
  "owner": "AgainIoT",
  "repoName": "Open-Set-Go",
  "language": "JavaScript(Node.js)",
  "framework": "Express.js",
  "gitignore": ["VisualStudioCode", "Linux"],
  "PRTemplate": "### markdown",
  "IssueTemplate": [], // empty array required now
  "contributingMd": "### contributing.md",
  "readmeMd": "### readme.md",
  "license": "https://www.gnu.org/licenses/gpl-3.0.txt"
}
```

### /file/supportedEnv

#### Request Body

```json
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

### /file/license

#### Response Body

```json
[
  {
    "priority": 0,
    "license": "Apache License 2.0",
    "description": "A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.\n",
    "conditions": {
      "permissions": [
        "Commercial use",
        "Modification",
        "Distribution",
        "Patent use",
        "Private use"
      ],
      "limitations": ["Trademark use", "Liability", "Warranty"],
      "conditions": ["License and copyright notice", "State changes"]
    },
    "url": "https://www.apache.org/licenses/LICENSE-2.0.txt"
  },
  {
    "priority": 1,
    "license": "GNU GENERAL PUBLIC LICENSE v3.0",
    "description": "Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.\n",
    "conditions": {
      "permissions": [
        "Commercial use",
        "Modification",
        "Distribution",
        "Patent use",
        "Private use"
      ],
      "limitations": ["Liability", "Warranty"],
      "conditions": [
        "License and copyright notice",
        "State changes",
        "Disclose source",
        "Same license"
      ]
    },
    "url": "https://www.gnu.org/licenses/gpl-3.0.txt"
  },
  {
    "priority": 2,
    "license": "MIT License",
    "description": "A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.\n",
    "conditions": {
      "permissions": [
        "Commercial use",
        "Modification",
        "Distribution",
        "Patent use",
        "Private use"
      ],
      "limitations": ["Liability", "Warranty"],
      "conditions": ["License and copyright notice"]
    },
    "url": "https://www.mit.edu/~amini/LICENSE.md"
  }
]
```

### /file/pr

#### Request Body

Example of importing 0-3rd data

```json
{
  "amount": 4 /* default is 20, the number of pr template */,
  "startAt": 0 /* 0 ~ 3 ex) 25 -> 25 ~ 28*/
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

### /file/contributing

#### Request Body

Example of importing 0-3rd data

```json
{
  "amount": 4 /* default is 20, the number of pr template */,
  "page": 1 /* 0 ~ 3 */
}
```

#### Response Body

```json
[
  [
    {
      "_id": "64ed7ca9c7efe914a8d14a4f",
      "repoName": "AgainIoT/Open-Set-Go",
      "repoUrl": "https://github.com/AgainIoT/Open-Set-Go",
      "star": 250
    },
    {
      "_id": "64ed7cf5c7efe914a8d14a50",
      "repoName": "github/docs",
      "repoUrl": "https://github.com/github/docs",
      "star": 40
    },
    {
      "_id": "64ee1bca9dede57491a7c180",
      "repoName": "AgainIoT/Open-Set-Go",
      "repoUrl": "https://github.com/AgainIoT/Open-Set-Go",
      "star": 20
    }
  ]
]
```

### /file/contributing/\<id>

#### Response Body

```plain
content1
```

### /file/contributing/amount

#### Response Body

```json
80
```

### /file/readme/\<id>

#### Request Body

Example of importing 0-3rd data

```json
{
  "_id": "64ed7ca9c7efe914a8d14a4f"
}
```

#### Response Body

```plain
## Welcome to Open-Set-Go contributing guide

Thank you for investing your time in contributing to our Open-Set-Go project! Any contribution you make will be
reflected on [Open-Set-Go.io](https://open-set-go.netlify.app/) &
[README.md](https://github.com/AgainIoT/Open-Set-Go#contributors) ✨.

We are committed to fostering a contribution-friendly environment that encourages contributions and aims to evolve into
an open-source community. Please have a lot of conversations on [our
Discussion](https://github.com/AgainIoT/Open-Set-Go/discussions)!

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and
merging the PR.
<br>
```

### /file/readme/\<id>

#### Response Body

```json
[
  {
    "_id": "64ed835fc7efe914a8d14a51",
    "repoName": "test1",
    "repoUrl": "www.google.com",
    "star": 23
  },
  {
    "_id": "64ed838ac7efe914a8d14a52",
    "repoName": "test2",
    "repoUrl": "www.google.com",
    "star": 20
  }
]
```

### /file/readme/amount

#### Response Body

```json
80
```

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
