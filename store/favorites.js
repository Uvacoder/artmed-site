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
    const endpoint = this.$api.EndPoints.favorites
    await this.$api.request(endpoint, {})
      .then((response) => {
        commit('SET_ITEMS', response.data)
      })
  }
}
