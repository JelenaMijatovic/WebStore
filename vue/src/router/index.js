import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OpremaView from '../views/OpremaView.vue'
import NarudzbineView from '../views/NarudzbineView.vue'
import PrijavaView from '../views/PrijavaView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/oprema/:id',
    name: 'OpremaView',
    component: OpremaView
  },
  {
    path: '/narudzbine',
    name: 'NarudzbineView',
    component: NarudzbineView
  },
  {
    path: '/prijavi-promenu',
    name: 'PrijavaView',
    component: PrijavaView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
