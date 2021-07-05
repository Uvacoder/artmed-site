export const state = () => ({
  config: {
    app: '',
    appName: '',
    appSloga: '',
    darkMode: false
  }
})

export const mutations = {
  SET_CONFIG (state, config) {
    state.config = config
  }
}
