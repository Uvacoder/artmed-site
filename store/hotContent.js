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
    const params = { version: 2, type: 1, sort: '-times' }
    await this.$api.request(endpoint, params)
      .then((response) => {
        const data = response.data
        for (let index = 0; index < data.length; index++) {
          if (data[index].content === undefined) {
            data.splice(index, 1)
          }
        }
        commit('SET_ITEMS', data)
      })
  }
}
