export default ({ app }) => {
  // Only _actual_ login/outs (including resets) will be watched here.
  console.log('Registering watch state in plugin!')
  app.$auth.$storage.watchState('user', (userNew, userOld) => {
    alert(`User has signed in here ${userNew} ${userOld}`)
    // if (userNew) {
    //   // Follow @nuxtjs/auth workflow.
    //   app.$auth.redirect('home')
    // }
  })
}
