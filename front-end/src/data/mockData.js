import profilePic from "../assets/profile.png";

export const repository = {
  name: 'repo-iq',
  url: 'https://github.com/agilef26/repoiq',
  files: 342,
  functions: 28,
  classes: 65,
  relationships: 19
}

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
export { nodes, connections } from "./mockNodes.js";