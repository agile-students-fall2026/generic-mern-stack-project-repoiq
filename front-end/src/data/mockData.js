export const repository = {
  name: 'repo-iq',
  url: 'https://github.com/agilef26/repoiq',
  files: 342,
  functions: 28,
  classes: 65,
  relationships: 19
}

export const nodes = [
  { id: 1, name: 'App.jsx', x: 175, y: 200, info: 'Main application' },
  { id: 2, name: 'Navbar.jsx', x: 100, y: 100, info: 'Navigation bar' },
  { id: 3, name: 'Login.jsx', x: 250, y: 100, info: 'Login page' },
  { id: 4, name: 'Dashboard.jsx', x: 80, y: 300, info: 'Dashboard page' },
  { id: 5, name: 'Profile.jsx', x: 260, y: 300, info: 'User profile' },
  { id: 6, name: 'api.js', x: 290, y: 200, info: 'API requests' }
]

export const connections = [
  { from: 1, to: 2, type: 'import' },
  { from: 1, to: 3, type: 'import' },
  { from: 1, to: 4, type: 'import' },
  { from: 1, to: 5, type: 'import' },
  { from: 3, to: 6, type: 'call' },
  { from: 4, to: 6, type: 'dependency' }
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

export const searchResDetailsSample = {
  name: "func1",
  type: "function",
  path: "src/example",
  usedIn: ["examplepath1", "examplepath2", "examplepath3"],
};

export const sampleRes = [
  {
    id: 1,
    name: "App.jsx",
    path: "src/App.jsx",
    type: "File",
  },
  {
    id: 2,
    name: "searchRepository",
    path: "src/search.js",
    type: "Function",
  },
];