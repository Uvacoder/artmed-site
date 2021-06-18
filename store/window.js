export const state = () => ({
  width: 0,
  height: 0
})

export const mutations = {
  SET_WIDTH (state, width) {
    state.width = width
  },
  SET_HEIGHT (state, height) {
    state.height = height
  }
}
