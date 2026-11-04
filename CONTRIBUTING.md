# Contributing

This guide explains our team norms, development workflow, and requirements to fullfil for making a change.

Our team consists of Mariam, Asia, Aditi, and Justin. Before starting the work, contributors should read this guide.

Draft for team review: all four members should review these proposed norms. 



### Team Values
- We will work together by assigning tasks together and ensuring all of us complete the tasks correctly in a timely manner.
- In the event any of us need help, we keep open communication through Discord and other channels and are quick to respond to eachother's requests
- We resolve conflicts by presenting issues to the group and possibly admins if needed to see what changes may need to be done

### Sprint Cadence
- Our sprint duration is 2 weeks

### Daily Standups
- Normally Wednesdays, Thursdays, and Fridays but these are tentative as the group is very flexible
- We are all present synchronously
- Members will not cover for other members who do not participate.
- Members who make no progress on a task for two standups or more in a row will be reported to management

### Coding Standards
- We all use VS Code and Prettier extension for linting
- All code must be peer-reviewed and pass tests before merging into main
- Keep the tree clean and delete branches once they have been merged
- Make sure to remove any commented out/dead code 
- Make sure your commit messages are clear
- For code that is not straightforward, use comments

### Communication and Accountability

- Use the repoiq channel for daily coordination.
- Respond to questions and review requests within 1-2 days.
- Take responsibility for assigned tasks.
- keep their status current on the project board.
- Report blockers and potential delays early with what help is needed for the completion of the task.


## Git Workflow

All changes including documentation updates must go through a pull request.

1. Choose an existing issue or open one describing the proposed work. 
2. Update your local `main` branch and create a separate branch for the task:

   ```bash
   git switch main
   git pull origin main
   git switch -c docs/contributing-guidelines
   ```

   Use a proper branch name, such as `feature/login`, `fix/signup-validation`, or `docs/contributing-guidelines` so it is easy to understand.

3. Make focused changes and commit them with proper commit message.

4. Push your branch and open a pull request targeting `main`.
5. Request a review from at least one other team member.
6. Merge only after another team member approves and all required checks pass.
7. Delete the merged branch if no future update will be done regarding the same and update your local `main` branch.


## Contribution Instructions

### What to Contribute

Contributions may include bug fixes, agreed features, documentation, tests, accessibility improvements, and usability improvements.

### Before You Start

- Check existing issues and pull requests to avoid  working on the same thing.
- Create or comment on an issue describing the problem, proposed change, and completion criteria.
- Discuss significant changes, such as architectural changes or new dependencies with our team.

### Contribution Requirements

- Follow the project's existing code style and directory structure.
- Keep changes small.
- Use proper variable and function names.
- Prefer a simple working implementation, then improve it as needed.
- Update relevant documentation when functionality or setup instructions change.
- Add/update tests for changed behavior when the test setup is available.


### Pull Request Requirements

Each pull request should include:

- A clear title.
- A proper description of what changed and why it changed.
- A link to the related issue; use `Closes #ISSUE_NUMBER` when the pull request fully resolves it.
- Proper Instructions how the changes were checked.
- Screenshots for visible interface changes, when applicable.
- Any known limitations or follow-up work.

Reviewers should check correctness, readability, scope, documentation, and testing before approving.

## Local Development Setup

> Complete this section using the actual repository structure and configuration before contributors rely on it.

1. Install Git and the required runtime and package manager.
2. Clone the project and enter its directory:

   ```bash
   git clone https://github.com/agile-students-fall2026/generic-mern-stack-project-repoiq.git
   cd generic-mern-stack-project-repoiq
   ```

3. Install dependencies separately for the front end and back end:

   ```bash
   cd front-end && npm install
   cd ../back-end && npm install
   ```

4. Configure required environment variables: create a `.env` file inside `back-end/` (it is excluded from version control by `.gitignore`) with the following variables. The actual values are shared privately in the team's messenger channel. Never include real credentials in commits.

   ```
   MONGODB_URI=<your MongoDB Atlas connection string>
   PORT=3000
   ```

5. Set up required local services, including a database if applicable: the app uses a shared, cloud-hosted MongoDB Atlas database, so no local database installation is needed. Ask a team member to add your IP address to the Atlas network access list if your connection is refused. Seeding instructions will be added once the database schema is in place.
6. Start the development application by running the back end and front end in two separate terminals:

   ```bash
   # Terminal 1
   cd back-end && npm run dev

   # Terminal 2
   cd front-end && npm run dev
   ```

7. Open [RepoIQ in your browser](http://localhost:5173) and verify that the RepoIQ home page loads without errors in the browser console.

## Building and Testing

This section will be updated when the build and test tooling is established. 





