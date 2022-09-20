import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register'
import { CookiesProvider } from 'react-cookie'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'

import App from './pages/App'
import Map from './pages/Map'
import Camera from './pages/Camera'
import Inventory from './pages/Inventory'
import Login from './pages/Login'
import GraphQL from './pages/GraphQL'

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
  {
    path: '/inventory',
    element: <Inventory />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/graphql',
    element: <GraphQL />,
  },
])

const link = createHttpLink({
  uri: import.meta.env.VITE_ENV_GRAPHQL_URL,
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </CookiesProvider>
  </React.StrictMode>
)

// サービスワーカーを登録
registerSW()
