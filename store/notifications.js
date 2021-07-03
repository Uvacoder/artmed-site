export const state = () => ({
  items: [],
  start: 0,
  limit: 20,
  isRequesting: false
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
  }
}

export const actions = {
  load ({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.isRequesting) { return }
      commit('SET_ISREQUESTING', true)
      const endpoint = this.$api.EndPoints.getNotifications
      const params = {
        start: state.start,
        limit: state.limit,
        sort: '-date'
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
  loadById ({ commit }, id) {
    return new Promise((resolve, reject) => {
      const endpoint = this.$api.EndPoints.getNotification
      endpoint.id = id
      this.$api.request(endpoint, {})
        .then((response) => {
          const data = response.data
          commit('SET_ITEMS', data)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
