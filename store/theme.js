export const state = () => ({
  config: {
    app: '',
    appName: '',
    appEmail: '',
    appSlogan: '',
    darkMode: false
  }
})

export const mutations = {
  SET_CONFIG (state, config) {
    state.config = config
  }
}
