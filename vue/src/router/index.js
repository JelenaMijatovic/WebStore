import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OpremaView from '../views/OpremaView.vue'
import NarudzbineView from '../views/NarudzbineView.vue'
import PrijavaView from '../views/PrijavaView.vue'
import ProfileView from '../views/ProfileView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'

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
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
