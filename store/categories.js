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
    const endpoint = this.$api.EndPoints.categories
    await this.$api.request(endpoint, {})
      .then((response) => {
        commit('SET_ITEMS', response.data.sort(function (a, b) { return (a.weight ?? 0) < (b.weight ?? 1) }))
      })
  }
}
