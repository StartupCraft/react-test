import Layout from 'components/Layout'
import Root from 'pages/HomePage'
import Post from 'pages/PostPage'

import { POST, ROOT } from './routes'

export default function router() {
  const allRoutes = [
    {
      component: Root,
      path: ROOT,
      exact: true,
    },
    {
      component: Post,
      path: POST(),
      exact: true,
    },
  ]

  return [
    {
      component: Layout,
      routes: allRoutes,
    },
  ]
}
