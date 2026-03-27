import { createStore } from 'vuex'
import ads from './ads'
import user from './user'
import shared from './shared'
import order from './order'

export default createStore({
  modules: {
    ads, user, shared, order
  }
})