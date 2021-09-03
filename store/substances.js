export const state = () => ({
  searchTerm: '',
  items: [],
  start: 0,
  limit: 20,
  isRequesting: false
})

export const mutations = {
  SET_SEARCHTERM (state, searchTerm) {
    state.searchTerm = searchTerm
  },
  SET_ISREQUESTING (state, isRequesting) {
    state.isRequesting = isRequesting
  },
  SET_START (state, start) {
    state.start += start
  },
  SET_ITEMS (state, items) {
    state.items = [...state.items, ...items]
  },
  CLEAR_ITEMS (state) {
    state.items = []
  },
  CLEAR_START (state) {
    state.start = 0
  }
}

export const actions = {
  load ({ commit, state }, { searchTerm, loadMore }) {
    return new Promise((resolve, reject) => {
      commit('SET_SEARCHTERM', searchTerm)
      if (state.isRequesting) { return }
      commit('SET_ISREQUESTING', true)
      if (!loadMore) {
        commit('CLEAR_ITEMS')
        commit('CLEAR_START')
      }
      const endpoint = this.$api.EndPoints.getSubstances
      const params = {
        version: 2,
        limit: state.limit,
        start: state.start
      }

      if (searchTerm) {
        params.search = searchTerm
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
  }
}
