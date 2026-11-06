import profilePic from "../assets/profile.png";

export const repository = {
  name: 'repo-iq',
  url: 'https://github.com/agilef26/repoiq',
  files: 342,
  functions: 28,
  classes: 65,
  relationships: 19
}

export const nodes = [
  { id: 1, name: 'App.jsx', x: 175, y: 200, info: 'Main application', type: 'File', path: 'src/App.jsx', repo: 'repo-iq', lastEdited: '2 days ago', usedIn: ['src/main.jsx'] },
  { id: 2, name: 'Navbar.jsx', x: 100, y: 100, info: 'Navigation bar', type: 'File', path: 'src/Navbar.jsx', repo: 'repo-iq', lastEdited: '3 days ago', usedIn: ['src/App.jsx'] },
  { id: 3, name: 'Login.jsx', x: 250, y: 100, info: 'Login page', type: 'File', path: 'src/Login.jsx', repo: 'repo-iq', lastEdited: '1 week ago', usedIn: ['src/App.jsx'] },
  { id: 4, name: 'Dashboard.jsx', x: 80, y: 300, info: 'Dashboard page', type: 'File', path: 'src/Dashboard.jsx', repo: 'repo-iq', lastEdited: '4 days ago', usedIn: ['src/App.jsx'] },
  { id: 5, name: 'Profile.jsx', x: 260, y: 300, info: 'User profile', type: 'File', path: 'src/Profile.jsx', repo: 'repo-iq', lastEdited: '2 weeks ago', usedIn: ['src/App.jsx'] },
  { id: 6, name: 'api.js', x: 290, y: 200, info: 'API requests', type: 'File', path: 'src/api.js', repo: 'repo-iq', lastEdited: '5 days ago', usedIn: ['src/Login.jsx', 'src/Dashboard.jsx'] },
  { id: 7, name: 'searchRepository', x: 60, y: 200, info: 'Searches a repository', type: 'Function', path: 'src/search.js', repo: 'repo-iq', lastEdited: '5 days ago', usedIn: ['src/App.jsx'] },
  { id: 8, name: 'SearchIndex', x: 175, y: 320, info: 'Stores search data', type: 'Class', path: 'src/search.js', repo: 'repo-iq', lastEdited: '1 week ago', usedIn: ['src/App.jsx'] },
  { id: 9, name: "Home.jsx", x: 175, y: 200, info: "Home page", type: "File", path: "src/Home.jsx", repo: "Repository 1" },
  { id: 10, name: "Header.jsx", x: 90, y: 100, info: "Page header", type: "File", path: "src/Header.jsx", repo: "Repository 1" },
  { id: 11, name: "Footer.jsx", x: 260, y: 100, info: "Page footer", type: "File", path: "src/Footer.jsx", repo: "Repository 1" },
  { id: 12, name: "styles.css", x: 175, y: 320, info: "Page styling", type: "File", path: "src/styles.css", repo: "Repository 1" },
  { id: 13, name: "server.js", x: 175, y: 200, info: "Main server", type: "File", path: "server.js", repo: "Repository 2" },
  { id: 14, name: "routes.js", x: 90, y: 100, info: "API routes", type: "File", path: "routes.js", repo: "Repository 2" },
  { id: 15, name: "database.js", x: 260, y: 100, info: "Database connection", type: "File", path: "database.js", repo: "Repository 2" },
  { id: 16, name: "auth.js", x: 175, y: 320, info: "Authentication", type: "File", path: "auth.js", repo: "Repository 2" },
  { id: 17, name: "App.py", x: 175, y: 200, info: "Main application", type: "File", path: "App.py", repo: "Repository 3" },
  { id: 18, name: "utils.py", x: 90, y: 100, info: "Helper functions", type: "File", path: "utils.py", repo: "Repository 3" },
  { id: 19, name: "models.py", x: 260, y: 100, info: "Data models", type: "File", path: "models.py", repo: "Repository 3" },
  { id: 20, name: "config.py", x: 175, y: 320, info: "Configuration", type: "File", path: "config.py", repo: "Repository 3" },
]

export const connections = [
  { from: 1, to: 2, type: 'import' },
  { from: 1, to: 3, type: 'import' },
  { from: 1, to: 4, type: 'import' },
  { from: 1, to: 5, type: 'import' },
  { from: 3, to: 6, type: 'call' },
  { from: 4, to: 6, type: 'dependency' },
  { from: 1, to: 7, type: 'call' },
  { from: 1, to: 8, type: 'import' },
  { from: 9, to: 10, type: "import" },
  { from: 9, to: 11, type: "import" },
  { from: 9, to: 12, type: "dependency" },
  { from: 13, to: 14, type: "import" },
  { from: 13, to: 15, type: "dependency" },
  { from: 13, to: 16, type: "call" },
  { from: 17, to: 18, type: "import" },
  { from: 17, to: 19, type: "import" },
  { from: 17, to: 20, type: "dependency" },
]

export const componentDetailSample = {
  name: "example.js",
  path: "src/example.js",
  functions: ["func1", "func2"],
  classes: ["class1", "class2"],
  imports: ["src/helper.js"],
  usedBy: ["src/App.jsx"],
};

export const sampleDependsOn = [
  { name: "example1.jsx", path: "src/App.jsx" },
  { name: "example2.jsx", path: "src/data/sample.jsx" },
];
export const sampleUsedBy = [{ name: "example3.jsx", path: "src/sample2.jsx" }];

export const sampleRepositories = [
  { id: 1, name: 'Repository 1', language: 'JavaScript', updated: '2 days ago', status: 'Completed' },
  { id: 2, name: 'Repository 2', language: 'Python', updated: '5 days ago', status: 'Completed' },
  { id: 3, name: 'Repository 3', language: 'Python', updated: '1 week ago', status: 'Completed' },
];
export const profile = {
  name: "RepoIQ User",
  email: "iloverepoiq@mail.com",
  username: "repoiqlover1",
  image: profilePic,
  bio: "Repo IQ user!"
};