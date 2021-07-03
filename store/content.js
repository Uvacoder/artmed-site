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
  contentByCategory ({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      if (state.isRequesting) { return }
      commit('SET_ISREQUESTING', true)
      let endpoint = this.$api.EndPoints.category
      endpoint.id = id
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
  }
}
