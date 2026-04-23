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
    ads: [
      {
        title: "First",
        desc: "First Desc",
        ownerId: "user-123",
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        promo: true,
        id: "static-1"
      },
      {
        title: "Second",
        desc: "Second Desc",
        ownerId: "user-123",
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        promo: true,
        id: "static-2"
      },
      {
        title: "Third",
        desc: "Third Desc",
        ownerId: "user-456",
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        promo: true,
        id: "static-3"
      },
      {
        title: "Fourth",
        desc: "Fourth Desc",
        ownerId: "user-456",
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        promo: true,
        id: "static-4"
      }
    ]
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      // Это сработает идеально: статика останется, новые добавятся
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
        // ИЗМЕНЕНО: теперь стучимся на локальный бэкенд
        const response = await axios.get('http://localhost:3000/api/ads')
        
        const adsFromDb = response.data.map(ad => {
          // ИЗМЕНЕНО: пути картинок строим от локального бэкенда
          const imagePath = (ad.imageSrc && ad.imageSrc.startsWith('/uploads'))
            ? `http://localhost:3000${ad.imageSrc}`
            : (ad.imageSrc || 'https://picsum.photos/400/300')

          return new Ad(
            ad.title, 
            ad.description, 
            ad.ownerId, 
            imagePath, 
            ad.promo === 1 || ad.promo === true,
            ad.id
          )
        })

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
        payload.append('ownerId', getters.user.id)

        // ИЗМЕНЕНО: отправляем данные на локальный бэкенд
        const response = await axios.post('http://localhost:3000/api/ads', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        const finalAd = new Ad(
          payload.get('title'),
          payload.get('description'),
          getters.user.id,
          // ИЗМЕНЕНО: путь картинки от локального бэкенда
          `http://localhost:3000${response.data.imageSrc}`,
          payload.get('promo') === 'true',
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