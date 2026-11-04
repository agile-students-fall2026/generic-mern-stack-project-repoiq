export const nodes = [
  { id: 1, name: 'App.jsx', x: 175, y: 200, info: 'Main application', type: 'File', path: 'src/App.jsx', repo: 'repo-iq', lastEdited: '2 days ago', usedIn: ['src/main.jsx'] },
  { id: 2, name: 'Navbar.jsx', x: 100, y: 100, info: 'Navigation bar', type: 'File', path: 'src/Navbar.jsx', repo: 'repo-iq', lastEdited: '3 days ago', usedIn: ['src/App.jsx'] },
  { id: 3, name: 'Login.jsx', x: 250, y: 100, info: 'Login page', type: 'File', path: 'src/Login.jsx', repo: 'repo-iq', lastEdited: '1 week ago', usedIn: ['src/App.jsx'] },
  { id: 4, name: 'Dashboard.jsx', x: 80, y: 300, info: 'Dashboard page', type: 'File', path: 'src/Dashboard.jsx', repo: 'repo-iq', lastEdited: '4 days ago', usedIn: ['src/App.jsx'] },
  { id: 5, name: 'Profile.jsx', x: 260, y: 300, info: 'User profile', type: 'File', path: 'src/Profile.jsx', repo: 'repo-iq', lastEdited: '2 weeks ago', usedIn: ['src/App.jsx'] },
  { id: 6, name: 'api.js', x: 290, y: 200, info: 'API requests', type: 'File', path: 'src/api.js', repo: 'repo-iq', lastEdited: '5 days ago', usedIn: ['src/Login.jsx', 'src/Dashboard.jsx'] },
  { id: 7, name: 'searchRepository', x: 60, y: 200, info: 'Searches a repository', type: 'Function', path: 'src/search.js', repo: 'repo-iq', lastEdited: '5 days ago', usedIn: ['src/App.jsx'] },
  { id: 8, name: 'SearchIndex', x: 175, y: 320, info: 'Stores search data', type: 'Class', path: 'src/search.js', repo: 'repo-iq', lastEdited: '1 week ago', usedIn: ['src/App.jsx'] }
]

export const connections = [
  { from: 1, to: 2, type: 'import' },
  { from: 1, to: 3, type: 'import' },
  { from: 1, to: 4, type: 'import' },
  { from: 1, to: 5, type: 'import' },
  { from: 3, to: 6, type: 'call' },
  { from: 4, to: 6, type: 'dependency' },
  { from: 1, to: 7, type: 'call' },
  { from: 1, to: 8, type: 'import' }
]