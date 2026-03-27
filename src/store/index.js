import { createStore } from 'vuex'
import ads from './ads'
import user from './user' // Импорт модуля пользователя

const store = createStore({
  modules: {
    ads,
    user // Регистрация модуля
  }
})

export default store