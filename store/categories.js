export const state = () => ({
  items: [],
  contents: []
})

export const mutations = {
  SET_ITEMS (state, items) {
    state.items = items
  },
  SET_CONTENTS (state, contents) {
    state.contents = contents
  }
}

export const actions = {
  async load ({ commit }, id) {
    let endpoint = this.$api.EndPoints.categories
    if (id !== undefined) {
      endpoint = this.$api.EndPoints.category
      endpoint.id = id
    }
    await this.$api.request(endpoint)
      .then((response) => {
        const data = response.data
        if (Array.isArray(data)) {
          const ord = data.sort((a, b) => (a.weight > b.weight) ? 1 : -1)
          commit('SET_ITEMS', ord)
        } else {
          commit('SET_ITEMS', data)
        }
      })
  }
}
