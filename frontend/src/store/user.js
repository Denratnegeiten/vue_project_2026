import axios from 'axios'

class User {
  constructor(id, email) {
    this.id = id
    this.email = email
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      
      try {
        const response = await axios.post('http://176.12.68.14:3000/api/auth/register', {
          email,
          password
        })
        
        console.log('Ответ сервера:', response.data)
        
        commit('setUser', new User(1, email))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        const errorMsg = error.response ? error.response.data.error : 'Нет связи с сервером'
        commit('setError', errorMsg)
        throw error
      }
    },

    async loginUser({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await axios.post('http://176.12.68.14:3000/api/auth/login', {
          email,
          password
        })
        
        commit('setUser', new User(response.data.user.id, response.data.user.email))
        
        localStorage.setItem('token', response.data.token)
        
        commit('setLoading', false)
        console.log('Успешный вход!')
      } catch (error) {
        commit('setLoading', false)
        const errorMsg = error.response ? error.response.data.error : 'Ошибка сервера'
        commit('setError', errorMsg)
        throw error
      }
    },

    autoLoginUser({ commit }, payload) {
      commit('setUser', new User(payload.id, payload.email))
    },

    logoutUser({ commit }) {
      commit('setUser', null)
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isUserLoggedIn(state) {
      return state.user !== null
    }
  }
}