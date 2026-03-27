class Ad {
  constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: [
      {
        title: "First",
        description: "First Desc",
        ownerId: "user-123",
        imageSrc: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        promo: true,
        id: "1"
      },
      {
        title: "Second",
        description: "Second Desc",
        ownerId: "user-123",
        imageSrc: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        promo: true,
        id: "2"
      },
      {
        title: "Third",
        description: "Thitd Desc",
        ownerId: "user-456",
        imageSrc: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        promo: true,
        id: "3"
      },
      {
        title: "Fouth",
        description: "Fouth Desc",
        ownerId: "user-456",
        imageSrc: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        promo: true,
        id: "4"
      }
    ]
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    createAd ({commit, getters}, payload) {
      payload.id = Math.random().toString()
      const newAd = new Ad(
        payload.title,
        payload.description,
        getters.user.id,
        payload.imageSrc,
        payload.promo,
        payload.id
      )
      commit('createAd', newAd)
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
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    adById(state) {
      return id => {
        return state.ads.find(ad => ad.id == id)
      }
    }
  }
}