# RepoIQ

RepoIQ is a web app that helps developers manage and understand their codebases visually and easily. By showing the codebase as a map, including dependencies, parent-child relationships, and function definitions and calls, the app makes it easy to look up how your code works.

# Product Vision Statement

For developers who have to work in large or unfamiliar codebases, RepoIQ turns a GitHub repo into a map you can actually explore. Instead of opening file after file to figure out where something is defined or what calls what, you can see how the files, functions, classes and API routes connect, search for what you need, and jump straight to the code.

# Some features in our MVP

- **Codebase Visualization:** Displays codebases by turning GitHub repositories into maps of files, functions, classes and APIs.
- **Relationship Mapping:** Illustrates connections between components to show how code is structured.
- **Search:** Has a search tool to locate files, functions and API endpoints.
- **Feature Discovery:** Allows developers to find where certain logic and features are implemented.
- **Source Code Navigation:** Depending on a project and where the source code is hosted, links may lead directly to the project's source code.

---

# Team Members

- [Mariam Shafey](https://github.com/st6rgazing)
- [Asia Berger](https://github.com/maomao274)
- [Aditi Adhikari](https://github.com/AditiAdhikari05)
- [Justin Sun](https://github.com/jjs10109)

---

# History

There is no worse feeling than spending hours looking through 100 files trying to figure out how an API call is handled. This tool is by developers, for developers, and is meant to be a quality-of-life upgrade for working with large codebases. The student with the original idea for the project unfortunately is not on the project; however, all of our team members see this as a worthwhile project to develop.

---

# Contributing

You can see how to contribute to the project [here](CONTRIBUTING.md).

---

# Getting Started

Follow these steps to run RepoIQ on your own computer.

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) version 20 or newer, which also installs npm

## Install

Clone the repository and go into the project folder:

```bash
git clone https://github.com/agile-students-fall2026/generic-mern-stack-project-repoiq.git
cd generic-mern-stack-project-repoiq
```

The front end and the back end each have their own `package.json`, so install the dependencies in both folders:

```bash
cd front-end
npm install
cd ../back-end
npm install
cd ..
```

## Start the App

Open two terminals in the project folder.

In the first terminal, start the back end:

```bash
cd back-end
node server.js
```

You should see `Server running on port 3000`.

In the second terminal, start the front end:

```bash
cd front-end
npm run dev
```

Then open [RepoIQ in your browser](http://localhost:5173). The front end sends every `/api` request to the back end on port 3000, so keep both terminals running.

## Build

To build the front end, run this from the `front-end` folder:

```bash
npm run build
```

This creates a `dist` folder. The back end serves this folder, so after building, you can start only the back end with `node server.js` and open [RepoIQ on port 3000](http://localhost:3000).

## Test

To run the back-end tests, run this from the `back-end` folder:

```bash
npm test
```

This runs the Mocha and Chai tests and prints a c8 coverage report.

To check the front-end code for lint errors, run this from the `front-end` folder:

```bash
npm run lint
```
