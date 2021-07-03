export const state = () => ({
  items: [],
  detail: false
})

export const mutations = {
  SET_ITEMS (state, items) {
    state.items = items
  },
  SET_DETAIL (state, detail) {
    state.detail = detail
  }
}

export const actions = {
  async load ({ commit }, id) {
    commit('SET_DETAIL', false)
    let endpoint = this.$api.EndPoints.news
    if (id !== undefined) {
      endpoint = this.$api.EndPoints.new
      endpoint.id = id
      commit('SET_DETAIL', true)
    }
    await this.$api.request(endpoint)
      .then((response) => {
        const data = response.data
        commit('SET_ITEMS', data)
      })
  }
}
