import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdListView from '../views/Ads/AdListView.vue'
import AdView from '../views/Ads/AdView.vue'
import NewAdView from '../views/Ads/NewAdView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import RegistrationView from '../views/Auth/RegistrationView.vue'
import OrdersView from '../views/User/OrdersView.vue'
import store from '../store'

const AuthGuard = (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/login?loginError=true')
  }
}

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/ad/:id', name: 'ad', props: true, component: AdView },
  { path: '/list', name: 'list', component: AdListView, beforeEnter: AuthGuard },
  { path: '/new', name: 'newAd', component: NewAdView, beforeEnter: AuthGuard },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/registration', name: 'reg', component: RegistrationView },
  { path: '/orders', name: 'orders', component: OrdersView, beforeEnter: AuthGuard }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router