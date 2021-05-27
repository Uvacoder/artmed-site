export const state = () => ({
  theme: { psiMode: false, darkMode: false }
})

export const mutations = {
  setTheme (state, theme) {
    state.theme = theme
  }
}

export const actions = {
  nuxtServerInit ({ commit }) {
    const theme = { psiMode: true, darkMode: false }
    commit('setTheme', theme)
  }
}
