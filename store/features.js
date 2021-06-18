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
    const isPremium = (this.state.auth.user !== null && this.state.auth.user.isPremium) ? '2' : '3'
    const endpoint = this.$api.EndPoints.getFeatures
    const params = {
      type: `1,${isPremium}`
    }
    await this.$api.request(endpoint, params)
      .then((response) => {
        commit('SET_ITEMS', response.data.sort(function (a, b) { return (a.weight ?? 0) > (b.weight ?? 1) }))
      })
  }
}
