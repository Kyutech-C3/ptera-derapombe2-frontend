import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// サービスワーカーを登録
registerSW()
