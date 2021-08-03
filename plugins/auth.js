export default ({ app }) => {
  // Only _actual_ login/outs (including resets) will be watched here.
  console.log('Registering watch state in plugin!')
  app.$auth.$storage.watchState('user', () => {
    alert(app.$auth.$storage.getLocalStorage('strategy'))
    // if (userNew) {
    //   // Follow @nuxtjs/auth workflow.
    //   app.$auth.redirect('home')
    // }
  })
}
