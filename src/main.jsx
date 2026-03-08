/**
 * Application entry point. Mounts the React app into the DOM.
 * - createRoot (React 18+) replaces the legacy ReactDOM.render.
 * - StrictMode helps surface side-effect and deprecation issues in development.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
