import jwtDecode from 'jwt-decode'
import { Oauth2Scheme } from '~auth/runtime'

function parseQuery (queryString) {
  const query = {}
  const pairs = queryString.split('&')
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=')
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }
  return query
}
function encodeQuery (queryObject) {
  return Object.entries(queryObject).filter(([_key, value]) => typeof value !== 'undefined').map(([key, value]) => encodeURIComponent(key) + (value != null ? '=' + encodeURIComponent(value) : '')).join('&')
}
function normalizePath (path = '', ctx) {
  let result = path.split('?')[0]
  if (ctx && ctx.base) {
    result = result.replace(ctx.base, '/')
  }
  if (result.charAt(result.length - 1) === '/') {
    result = result.slice(0, -1)
  }
  result = result.replace(/\/+/g, '/')
  return result
}
function getProp (holder, propName) {
  if (!propName || !holder || typeof holder !== 'object') {
    return holder
  }
  if (propName in holder) {
    return holder[propName]
  }
  const propParts = Array.isArray(propName) ? propName : (propName + '').split('.')
  let result = holder
  while (propParts.length && result) {
    result = result[propParts.shift()]
  }
  return result
}

export default class CustomOauth extends Oauth2Scheme {
  async fetchUser () {
    if (!this.check().valid) {
      return
    }
    if (!this.options.endpoints.userInfo) {
      this.$auth.setUser({})
      return
    }

    const strategy = this.$auth.$storage.getUniversal('strategy')
    const token = this.$auth.strategy.token.get().split('Bearer ')
    const endpoint = this.$auth.ctx.app.$api.EndPoints.socialLogin
    const params = { token: token[1], source: strategy }
    return await this.$auth.ctx.app.$api.request(endpoint, params)
      .then(async (response) => {
        const jwt = jwtDecode(response.data.token.access)
        this.$auth.$storage.setUniversal('artmed', response.data.token)
        const endpoint = this.$auth.ctx.app.$api.EndPoints.me
        endpoint.id = jwt.id
        await this.$auth.ctx.app.$api.request(endpoint, {})
          .then((response) => {
            const user = response.data
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
            this.$auth.setUser(customUser)
          }).catch((error) => {
            this.$auth.callOnError(error, { method: 'fetchUser' })
          })
        return response
      }).catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
      })
  }

  async _handleCallback () {
    if (this.$auth.options.redirect && normalizePath(this.$auth.ctx.route.path, this.$auth.ctx) !== normalizePath(this.$auth.options.redirect.callback, this.$auth.ctx)) {
      return
    }
    if (process.server) {
      return
    }
    const hash = parseQuery(this.$auth.ctx.route.hash.substr(1))
    const parsedQuery = Object.assign({}, this.$auth.ctx.route.query, hash)
    let token = parsedQuery[this.options.token.property]
    let refreshToken
    if (this.options.refreshToken.property) {
      refreshToken = parsedQuery[this.options.refreshToken.property]
    }
    const state = this.$auth.$storage.getUniversal(this.name + '.state')
    this.$auth.$storage.setUniversal(this.name + '.state', null)
    if (state && parsedQuery.state !== state) {
      return
    }
    if (this.options.responseType === 'code' && parsedQuery.code) {
      let codeVerifier
      if (this.options.codeChallengeMethod && this.options.codeChallengeMethod !== 'implicit') {
        codeVerifier = this.$auth.$storage.getUniversal(this.name + '.pkce_code_verifier')
        this.$auth.$storage.setUniversal(this.name + '.pkce_code_verifier', null)
      }
      const response = await this.$auth.request({
        method: 'post',
        url: this.options.endpoints.token,
        baseURL: '',
        data: encodeQuery({
          code: parsedQuery.code,
          client_id: this.options.clientId + '',
          redirect_uri: this.redirectURI,
          response_type: this.options.responseType,
          audience: this.options.audience,
          grant_type: this.options.grantType,
          code_verifier: codeVerifier
        })
      })
      token = getProp(response.data, this.options.token.property) || token
      refreshToken = getProp(response.data, this.options.refreshToken.property) || refreshToken
    }
    if (!token || !token.length) {
      return
    }
    this.token.set(token)
    if (refreshToken && refreshToken.length) {
      this.refreshToken.set(refreshToken)
    }
    await this.$auth.fetchUser()
    this.$auth.redirect('home', true)
    return true
  }
}
