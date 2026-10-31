export const repository = {
  name: 'my-react-project',
  url: 'https://github.com/username/repo',
  files: 342,
  functions: 28,
  classes: 65,
  relationships: 19
}

export const nodes = [
  { id: 1, name: 'App.jsx', x: 175, y: 200 },
  { id: 2, name: 'Navbar.jsx', x: 100, y: 100 },
  { id: 3, name: 'Login.jsx', x: 250, y: 100 },
  { id: 4, name: 'Dashboard.jsx', x: 80, y: 300 },
  { id: 5, name: 'Profile.jsx', x: 260, y: 300 },
  { id: 6, name: 'Footer.jsx', x: 90, y: 200 },
  { id: 7, name: 'api.js', x: 290, y: 200 }
]

export const connections = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 1, to: 5 },
  { from: 1, to: 6 },
  { from: 1, to: 7 }
]