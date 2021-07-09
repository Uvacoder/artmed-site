import { Oauth2Scheme } from '~auth/runtime'

export default class CustomOauth2Scheme extends Oauth2Scheme {
  // Override `fetchUser` method of `local` scheme
  async login (endpoint) {
    return await alert('login')
  }
  // },
  // async fetchUser (endpoint) {
  //   // Token is required but not available
  //   if (!this.check().valid) {
  //     return
  //   }

  //   // User endpoint is disabled.
  //   if (!this.options.endpoints.user) {
  //     this.$auth.setUser({})
  //     return
  //   }

  //   // Try to fetch user and then set
  //   return await this.$auth.requestWith(
  //     this.name,
  //     endpoint,
  //     this.options.endpoints.user
  //   ).then((response) => {
  //     const user = response.data.data
  //     // Transform the user object
  //     const customUser = {
  //       ...user
  //     }
  //     // Set the custom user
  //     // The `customUser` object will be accessible through `this.$auth.user`
  //     // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
  //     this.$auth.setUser(customUser)

  //     return response
  //   }).catch((error) => {
  //     this.$auth.callOnError(error, { method: 'fetchUser' })
  //   })
  // }
}
