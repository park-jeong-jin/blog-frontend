import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/home/Home'
import Board from '@/components/board/Board'
import About from '@/components/about/About'
import Setting from '@/components/setting/Setting'
import ErrorPage from '@/components/ErrorPage'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/board/:menuId', name: 'board', component: Board },
  { path: '/about', name: 'about', component: About },
  { path: '/setting', name: 'setting', component: Setting },
  { path: '/:pathMatch(.*)', name: 'not-found', component: ErrorPage }
]
const history = createWebHistory()
const router = createRouter({ history, routes })

export default router
