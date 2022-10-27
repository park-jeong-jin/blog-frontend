import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/Home'
import Board from '@/components/board/Board'
import About from '@/components/About'
import ErrorPage from '@/components/ErrorPage'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/board', name: 'board', component: Board },
  { path: '/about', name: 'about', component: About },
  { path: '/:pathMatch(.*)', name: 'not-found', component: ErrorPage }
]
const history = createWebHistory()
const router = createRouter({ history, routes })

export default router
