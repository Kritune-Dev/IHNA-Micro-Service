<h1 align="center">Microservice IHNA</h1>
<p align="center">
  <a href="https://github.com/prettier/prettier">
    <img
      src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg"
      alt="Prettier"
    />
  </a>
  <a href="https://lerna.js.org/">
    <img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" alt="Lerna">
  </a>
  <a href="" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/dotrungkien/2048" />
  <br>
</p>

<h4 align="center">
Lerna + Docker + EsLint + Prettier
</h4>

# Table of Contents

- [Introduction](#introduction)
- [Techstack](#techstack)
- [Install](#install)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Introduction

> My project is setup with monorepo by JavaScript + Lerna + Eslinter + Prettier.

The project has 3 packages (inside [packages directory](https://github.com/Kritune-Dev/IHNA-Micro-Service/tree/master/packages))

- [Calendar-Service](https://github.com/Kritune-Dev/IHNA-Micro-Service/tree/master/packages/calendar-service)  -  ![Build](https://github.com/Kritune-Dev/IHNA-Micro-Service/workflows/calendar-service-CI/CD/badge.svg)
- [Calendar-Worker](https://github.com/Kritune-Dev/IHNA-Micro-Service/tree/master/packages/calendar-worker)  -  ![Build](https://github.com/Kritune-Dev/IHNA-Micro-Service/workflows/calendar-worker-CI/CD/badge.svg)
- [Messenger-Service](https://github.com/Kritune-Dev/IHNA-Micro-Service/tree/master/packages/messenger-service)  -  ![Build](https://github.com/Kritune-Dev/IHNA-Micro-Service/workflows/messenger-service-CI/CD/badge.svg)

_Note: Each package has its own eslint, tsconfig, preitter config._

## Techstack

- [Lerna](https://github.com/lerna/lerna) - A tool for managing JavaScript projects with multiple packages
- Docker
- Eslint + Prettier

## Usage

### Running project

To do

That's it 🚀

### Running Eslint

- Running Eslint on all packages

```
npm run eslint
```

## Project Structure
```
ihna-Micro-Service
├── packages/
│   ├── calendar-service/
│   │   └── src/
│   │   └── integration-test/
│   │   └── mocks/
│   │   ├── package.json
│   │   ├── ecosystem.config.js
│   │   ├── readme.md
│   │
│   ├── calendar-worker/
│   │   └── src/
│   │   └── integration-test/
│   │   └── mocks/
│   │   ├── package.json
│   │   ├── ecosystem.config.js
│   │   ├── readme.md
│   │
│   ├── messenger-service/
│   │   └── src/
│   │   └── integration-test/
│   │   └── mocks/
│   │   ├── package.json
│   │   ├── ecosystem.config.js
│   │   ├── readme.md
│
├── package.json
├── lerna.json
├── README.md
```

## Contributing

Contributions, issues and feature requests are welcome.