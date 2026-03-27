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
    updateAd (state, {title, desc, id}) {
      const ad = state.ads.find(a => {
        return a.id === id
      })
      ad.title = title
      ad.desc = desc
    }
  },
  actions: {
    createAd ({commit, getters}, payload) {
      payload.id = Math.random().toString()
      const newAd = new Ad(
        payload.title,
        payload.desc,
        getters.user.id,
        payload.src,
        payload.promo,
        payload.id
      )
      commit('createAd', newAd)
    },
    async updateAd ({commit}, {title, desc, id}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        commit('updateAd', {title, desc, id})
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds(state, getters) {
      if (getters.user === null) return [] 
      
      return state.ads.filter(ad => {
        return ad.userId == getters.user.id
      })
    },
    adById(state) {
      return id => {
        return state.ads.find(ad => ad.id == id)
      }
    }
  }
}