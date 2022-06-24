import Layout from 'Components/Layout'
import Post from 'Components/Views/Post'
import Root from 'Components/Views/Root'

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
