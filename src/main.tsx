import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register'

import App from './pages/App'
import Map from './pages/Map'
import Camera from './pages/Camera'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/map',
    element: <Map />,
  },
  {
    path: '/camera',
    element: <Camera />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// サービスワーカーを登録
registerSW()
