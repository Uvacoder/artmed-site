export const state = () => ({
  ids: [],
  items: [],
  start: 0,
  limit: 20,
  isRequesting: false
})

export const mutations = {
  SET_IDS (state, ids) {
    state.ids = ids
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
  load ({ commit, state }, { ids }) {
    return new Promise((resolve, reject) => {
      if (state.isRequesting) { return }
      commit('SET_ISREQUESTING', true)
      if (ids.length < 2) {
        alert('Ops, Selecione pelo menos 2 substâncias')
        return
      }

      if (ids.length > 6) {
        alert('Ops, Selecione no máximo 6 substâncias')
        return
      }
      commit('CLEAR_ITEMS')
      const endpoint = this.$api.EndPoints.getDrugGuidelines
      const params = {
        substance: ids.join(',')
      }

      this.$api.request(endpoint, params)
        .then((response) => {
          const data = response.data
          commit('SET_ITEMS', data)
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
