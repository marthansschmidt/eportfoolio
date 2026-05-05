import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const originalWarn = console.warn
console.warn = (...args) => {
  const message = args.map(String).join(' ')

  if (message.includes('THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.')) {
    return
  }

  originalWarn(...args)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
