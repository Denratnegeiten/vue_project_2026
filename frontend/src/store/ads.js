import axios from 'axios'

class Ad {
  constructor (title, desc, ownerId, src = '', promo = false, id = null) {
    this.title = title
    this.desc = desc
    this.ownerId = ownerId
    this.src = src
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    // Твои изначальные 4 карточки
    ads: [
      {
        title: "First",
        desc: "First Desc",
        ownerId: "user-123",
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        promo: true,
        id: "1"
      },
      {
        title: "Second",
        desc: "Second Desc",
        ownerId: "user-123",
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        promo: true,
        id: "2"
      },
      {
        title: "Third",
        desc: "Third Desc",
        ownerId: "user-456",
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        promo: true,
        id: "3"
      },
      {
        title: "Fourth",
        desc: "Fourth Desc",
        ownerId: "user-456",
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        promo: true,
        id: "4"
      }
    ]
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      // Хитрость: фильтруем, чтобы не добавить дубликаты, если вызываем несколько раз
      const newAds = payload.filter(postAd => !state.ads.find(stateAd => stateAd.id === postAd.id))
      state.ads = [...state.ads, ...newAds]
    },
    updateAd (state, {title, desc, id}) {
      const ad = state.ads.find(a => a.id === id)
      if (ad) {
        ad.title = title
        ad.desc = desc
      }
    }
  },
  actions: {
    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await axios.get('http://176.12.68.14:3000/api/ads')
        // Превращаем данные из БД в формат твоего приложения
        const adsFromDb = response.data.map(ad => new Ad(
          ad.title, 
          ad.description, 
          ad.ownerId, 
          ad.imageSrc, 
          ad.promo, 
          ad.id
        ))
        commit('loadAds', adsFromDb)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
      }
    },
    async createAd ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newAdForDb = {
          title: payload.title,
          description: payload.desc,
          ownerId: getters.user.id,
          imageSrc: payload.src,
          promo: payload.promo
        }

        const response = await axios.post('http://176.12.68.14:3000/api/ads', newAdForDb)
        
        // Создаем локальный объект с ID, который выдала MySQL
        const finalAd = new Ad(
          payload.title,
          payload.desc,
          getters.user.id,
          payload.src,
          payload.promo,
          response.data.id
        )

        commit('createAd', finalAd)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    ads (state) { return state.ads },
    promoAds (state) { return state.ads.filter(ad => ad.promo) },
    myAds(state, getters) {
      if (!getters.user) return [] 
      return state.ads.filter(ad => ad.ownerId === getters.user.id)
    },
    adById(state) {
      return id => state.ads.find(ad => ad.id == id)
    }
  }
}