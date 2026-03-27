export default {
  state: {
    orders: []
  },
  mutations: {
    clearError (state) {
    }
  },
  actions: {
    async createOrder({commit}, {name, phone, adId, userId}) {
      console.log(name)
      console.log(phone)
      console.log(adId)
      console.log(userId)
      
      commit('clearError')
      
      let isRequestOk = true
      let promise = new Promise((resolve) => {
        setTimeout(() => resolve('Done'), 3000)
      })

      if (isRequestOk) {
        await promise.then(() => {
          console.log('Запрос выполнен успешно')
        })
      } else {
        await promise.then(() => {
          commit('setError', 'Ошибка создания заказа')
          throw 'Упс... Ошибка создания заказа'
        })
      }
    }
  },
  getters: {}
}