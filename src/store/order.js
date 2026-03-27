class Order {
  constructor(name, phone, adId, userId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.userId = userId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    createOrder(state, payload) {
      state.orders.push(payload)
    }
  },
  actions: {
    async createOrder({ commit }, { name, phone, adId, userId }) {
      const payload = new Order(name, phone, adId, userId, false, Math.random())
      
      commit('clearError')
      
      let isRequestOk = true
      let promise = new Promise((resolve) => {
        setTimeout(() => resolve('Done'), 3000)
      })

      if (isRequestOk) {
        await promise.then(() => {
          commit('createOrder', payload)
        })
      } else {
        await promise.then(() => {
          commit('setError', 'Ошибка создания заказа')
          throw 'Упс... Ошибка создания заказа'
        })
      }
    }
  },
  getters: {
    orders(state) {
      return state.orders
    }
  }
}