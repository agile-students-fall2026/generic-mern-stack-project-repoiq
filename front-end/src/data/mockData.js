import profilePic from "../assets/profile.png";

export const repository = {
  name: 'repo-iq',
  url: 'https://github.com/agilef26/repoiq',
  files: 342,
  functions: 28,
  classes: 65,
  relationships: 19
}

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
export { nodes } from "./mockNodes.js";