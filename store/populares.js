export const state = () => ({
  items: []
})

export const mutations = {
  SET_ITEMS (state, items) {
    state.items = items
  }
}

export const actions = {
  async load ({ commit }) {
    if (this.state.auth.user === null) { return }
    const endpoint = this.$api.EndPoints.populares
    const params = { version: 3, type: 2, sort: '-times' }
    await this.$api.request(endpoint, params)
      .then((response) => {
        commit('SET_ITEMS', response.data)
      })
  }
}