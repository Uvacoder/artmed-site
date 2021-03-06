import jwtDecode from 'jwt-decode'
import { LocalScheme } from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser (endpoint) {
    // Token is required but not available
    if (!this.check().valid) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    const token = this.$auth.strategy.token.get()
    const jwt = jwtDecode(token.access)
    const endpointUser = this.options.endpoints.user
    endpointUser.url = endpointUser.url.replace('id', jwt.id)

    // Try to fetch user and then set
    return await this.$auth.requestWith(
      this.name,
      endpoint,
      endpointUser
    ).then((response) => {
      const user = response.data.data
      let isPremiun = false
      if (
        user.premium.manual ||
        user.premium.voucher ||
        user.premium.subscription ||
        (user.premium.plan && (user.premium.subscription.expiresDate >= new Date()))
      ) {
        isPremiun = true
      }

      // Transform the user object
      const customUser = {
        ...user,
        isPremium: isPremiun
      }

      // Set the custom user
      // The `customUser` object will be accessible through `this.$auth.user`
      // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
      this.$auth.setUser(customUser)

      return response
    }).catch((error) => {
      this.$auth.callOnError(error, { method: 'fetchUser' })
    })
  }
}
