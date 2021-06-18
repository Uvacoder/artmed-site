export const actions = {
  nuxtServerInit ({ commit }) {
    const config = { psiMode: true, darkMode: false }
    commit('theme/SET_CONFIG', config)
  }
}
