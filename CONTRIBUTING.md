# Contributing

Thank you for contributing to this project. This guide explains our team norms, development workflow, and requirements for submitting changes.

The core team consists of Mariam, Asia, Aditi, and Justin. Contributors should read this guide before starting work.

> Draft for team review: all four members should review these proposed norms. 



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

- Use repoiq channel for day-to-day coordination and GitHub issues and pull requests for decisions about specific changes.
- Respond to direct questions and review requests within 1-2 days.
- Take responsibility for assigned tasks and keep their status current on the project board.
- Report blockers and potential delays early, explaining what help is needed.
- If a task repeatedly stalls or a commitment is missed, discuss it with the member, agree on a recovery plan, and involve course staff if it remains unresolved.

### Planning and Meetings

- Work in sprints, following the course schedule.
- Hold standups on Thursday, Friday, Sunday using Google Meet in the evening around 5 PM
- At each standup, share progress, next steps, and blockers.
- Attend agreed meetings or notify the team in advance when unavailable.
- Break user stories into focused tasks with clear completion criteria and an assigned owner.
- Review progress and identify improvements at the end of each sprint.

## Git Workflow

All changes, including documentation updates, must go through a pull request.

1. Choose an existing issue or open one describing the proposed work. Coordinate ownership before starting.
2. Update your local `main` branch and create a separate branch for the task:

   ```bash
   git switch main
   git pull origin main
   git switch -c docs/contributing-guidelines
   ```

   Use a descriptive branch name, such as `feature/login`, `fix/signup-validation`, or `docs/contributing-guidelines`.

3. Make focused changes and commit them with clear messages.
4. Check your changes locally and run the relevant checks available in the project.
5. Push your branch and open a pull request targeting `main`.
6. Request a review from at least one other team member.
7. Address review feedback and resolve merge conflicts. Ask for another review if substantial changes are made.
8. Merge only after another team member approves and all required checks pass.
9. Delete the merged branch and update your local `main` branch.

Do not push changes directly to `main` or merge a pull request without another team member's approval.

## Contribution Instructions

### What to Contribute

Contributions may include bug fixes, agreed features, documentation, tests, accessibility improvements, and usability improvements.

### Before You Start

- Check existing issues and pull requests to avoid duplicating work.
- Create or comment on an issue describing the problem, proposed change, and completion criteria.
- Discuss significant changes, such as architectural changes or new dependencies, with the team before implementation.

### Code and Documentation Standards

- Follow the project's existing code style and directory structure.
- Keep changes small and focused on the agreed issue or task.
- Use descriptive variable and function names.
- Prefer a simple working implementation, then improve it as needed.
- Remove unused code and temporary debugging output.
- Update relevant documentation when functionality or setup instructions change.
- Add or update tests for changed behavior when the test setup is available.
- Never commit passwords, API keys, database credentials, or other sensitive information. Keep local secrets in ignored environment files and document required variable names with safe examples.

### Pull Request Requirements

Each pull request should include:

- A clear title.
- A description of what changed and why.
- A link to the related issue; use `Closes #ISSUE_NUMBER` when the pull request fully resolves it.
- Instructions or evidence explaining how the changes were checked.
- Screenshots for visible interface changes, when applicable.
- Any known limitations or follow-up work.

Reviewers should check correctness, readability, scope, documentation, and testing before approving.

## Local Development Setup

> Complete this section using the actual repository structure and configuration before contributors rely on it.

1. Install Git and the required runtime and package manager: [NAMES AND VERSIONS].
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

7. Open http://localhost:5173 and verify that the RepoIQ home page loads without errors in the browser console, and that the back-end terminal shows the server listening on port 3000 and a successful database connection.

## Building and Testing

This section will be updated when the build and test tooling is established. 





