export const state = () => ({
  items: [],
  start: 0,
  limit: 20,
  isRequesting: false,
  full: null
})

export const mutations = {
  SET_ITEMS (state, items) {
    state.items = [...state.items, ...items]
  },
  SET_START (state, start) {
    state.start += start
  },
  SET_ISREQUESTING (state, isRequesting) {
    state.isRequesting = isRequesting
  },
  SET_FULL (state, full) {
    state.full = full
  }
}

export const actions = {
  loadNews ({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.isRequesting) { return }
      commit('SET_ISREQUESTING', true)
      const endpoint = this.$api.EndPoints.news
      const params = {
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
  },
  async load ({ commit }, id) {
    const endpoint = this.$api.EndPoints.new
    endpoint.id = id
    await this.$api.request(endpoint)
      .then((response) => {
        const data = response.data
        commit('SET_FULL', data)
      })
  }
}
