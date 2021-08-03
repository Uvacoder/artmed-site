export default ({ app }) => {
  // Only _actual_ login/outs (including resets) will be watched here.
  console.log('Registering watch state in plugin!')
  app.$auth.$storage.watchState('user', async () => {
    const socialMedia = app.$auth.$storage.getLocalStorage('strategy')
    if (socialMedia === 'facebook') {
      alert(`token ${app.$auth.strategy.token.get()}`)
      const endpoint = app.$api.EndPoints.socialLogin
      const params = {
        token: app.$auth.strategy.token.get(),
        source: socialMedia
      }
      await app.$api.request(endpoint, params)
    }
  })
}
