import config from '../nuxt.config'

export const actions = {
  nuxtServerInit ({ commit }) {
    const setup = {
      app: config.flavor,
      appName: config.head.title,
      appSlogan: config.head.meta[2].content,
      darkMode: false
    }
    commit('theme/SET_CONFIG', setup)
  }
}
