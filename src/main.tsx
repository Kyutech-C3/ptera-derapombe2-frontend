import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register'

import App from './App'
import Maps from './Maps'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/map',
    element: <Maps />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// サービスワーカーを登録
registerSW()
