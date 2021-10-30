import { uuid } from 'vue-uuid'
import config from '../nuxt.config'

export const state = () => ({
  category: null,
  id: null,
  full: null,
  items: [],
  start: 0,
  limit: 20,
  isRequesting: false
})

export const mutations = {
  SET_CATEGORY (state, category) {
    state.category = category
  },
  SET_ID (state, id) {
    state.id = id
  },
  SET_FULL (state, full) {
    state.full = full
  },
  SET_ITEMS (state, items) {
    state.items = [...state.items, ...items]
  },
  SET_START (state, start) {
    state.start += start
  },
  SET_ISREQUESTING (state, isRequesting) {
    state.isRequesting = isRequesting
  },
  SET_FAVORITE (state, favorite) {
    state.full.favorite = favorite
  },
  CLEAR_ITEMS (state) {
    state.items = []
  },
  CLEAR_START (state) {
    state.start = 0
  }
}

export const getters = {
  ID: state => state.id ? state.id : null,
  FULL: state => state.full ? state.full : null
}

export const actions = {
  async load ({ commit }, id) {
    // if (this.state.auth.user === null) { return }
    const endpoint = this.$api.EndPoints.content
    endpoint.id = id
    await this.$api.request(endpoint, { version: 3 })
      .then((response) => {
        const data = response.data
        commit('SET_FULL', data)
      })
  },
  contentByCategory ({ commit, state }, { categoryId, loadMore }) {
    return new Promise((resolve, reject) => {
      if (state.isRequesting) { return }
      commit('SET_ISREQUESTING', true)
      if (!loadMore) {
        commit('SET_START', 0)
        commit('CLEAR_ITEMS')
      }
      let endpoint = this.$api.EndPoints.category
      endpoint.id = categoryId
      this.$api.request(endpoint)
        .then((response) => {
          const data = response.data
          commit('SET_CATEGORY', data)
          endpoint = this.$api.EndPoints.contentByCategory
          endpoint.allowEmpty = (data.type === 5)
          const params = {
            version: 1,
            category: data.id,
            start: state.start,
            limit: state.limit
          }
          this.$api.request(endpoint, params)
            .then((response) => {
              const data = response.data
              commit('SET_ITEMS', data)
              commit('SET_START', data.length)
              commit('SET_ISREQUESTING', false)
              resolve(data)
            })
            .catch((error) => {
              commit('SET_ISREQUESTING', false)
              reject(error)
            })
        })
    })
  },
  favoriteHandler ({ commit, state }, { favoriteState, contentId }) {
    return new Promise((resolve, reject) => {
      if (state.isRequesting) { return }
      commit('SET_ISREQUESTING', true)
      let endpoint = this.$api.EndPoints.favorite
      let params = {
        content: contentId,
        id: uuid.v4()
      }
      let newFavoriteState = params.id
      if (favoriteState) {
        endpoint = this.$api.EndPoints.unfavorite
        endpoint.id = favoriteState
        params = {}
        newFavoriteState = null
      }
      this.$api.request(endpoint, params)
        .then((response) => {
          const data = response
          commit('SET_FAVORITE', newFavoriteState)
          commit('SET_ISREQUESTING', false)
          resolve(data)
        })
        .catch((error) => {
          commit('SET_ISREQUESTING', false)
          reject(error)
        })
    })
  },
  async loadAuthors ({ commit }) {
    const endpoint = this.$api.EndPoints.authors
    endpoint.id = config.authorId
    await this.$api.request(endpoint, {})
      .then((response) => {
        const data = response.data
        data.name = 'Conheça nossos autores'
        commit('SET_FULL', data)
      })
  }
}
