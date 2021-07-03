export default function ({ $axios, redirect, store, $auth }, inject) {
  // Create a custom axios instance
  const api = $axios.create()

  api.onRequest((config) => {
    console.log('Making request to: ', config)
  })

  // Set baseURL to something different
  // api.setBaseURL('http://api.dev.consultamaisrapida.com.br/')

  api.endpoint = null
  api.params = null

  api.params = {}

  api.EndPoints = {
    updateUser: { token: null, id: null },
    signUp: {},
    login: {},
    socialLogin: {},
    forgotPassword: {},
    me: { id: null },
    refreshToken: { session: null, token: null },
    signUpAreas: {},
    signUpSpecialties: { area: null },
    categories: {},
    category: { id: null },
    content: { id: null },
    contentByCategory: { allowEmpty: null },
    news: {},
    new: { id: null },
    links: { id: null },
    specialties: {},
    populares: {},
    favorites: {},
    search: {},
    searchTypeAhead: { term: null, categories: null },
    searchSuggestion: { term: null, categories: null },
    histories: {},
    clearHistories: {},
    favorite: {},
    unfavorite: { id: null },
    feedback: {},
    feedbackContent: {},
    saveInstallation: {},
    useVoucher: {},
    partnerships: {},
    plans: {},
    getNotifications: {},
    getNotification: { id: null },
    getSubstances: {},
    getDrugGuidelines: {},
    events: {},
    getFeatures: {},
    getReferredUsers: { id: null }
  }

  api.getBaseUrl = function () {
    return api.defaults.baseURL
  }

  api.path = function () {
    switch (this.endpoint) {
      case api.EndPoints.updateUser: return `users/${this.endpoint.id}`
      case api.EndPoints.login: return 'sessions?version=1'
      case api.EndPoints.socialLogin: return 'sessions?version=2'
      case api.EndPoints.signUp: return 'sessions?version=3'
      case api.EndPoints.forgotPassword: return 'credentials'
      case api.EndPoints.me: return `users/${this.endpoint.id}?version=3`
      case api.EndPoints.refreshToken: return `sessions/${this.endpoint.session}/access/new?access=${this.endpoint.token}`
      case api.EndPoints.signUpAreas: return 'areas?limit=300'
      case api.EndPoints.signUpSpecialties: return `areas/${this.endpoint.area}/specialties?limit=300`
      case api.EndPoints.search: return 'contents'
      case api.EndPoints.searchTypeAhead: {
        const url = `contents?limit=10&type=1&version=7&prefix=${this.endpoint.term}`
        return (this.endpoint.categories) ? url + `&category=${this.endpoint.categories}` : url
      }
      case api.EndPoints.searchSuggestion: {
        const url = `contents?limit=10&type=2&version=7&prefix=${this.endpoint.term}`
        return (this.endpoint.categories) ? url + `&category=${this.endpoint.categories}` : url
      }
      case api.EndPoints.categories: return 'categories?version=2'
      case api.EndPoints.category: return `categories/${this.endpoint.id}`
      case api.EndPoints.content: return `contents/${this.endpoint.id}`
      case api.EndPoints.contentByCategory: return `contents?empty=${this.endpoint.allowEmpty}`
      case api.EndPoints.news: return 'news'
      case api.EndPoints.new: return `news/${this.endpoint.id}`
      case api.EndPoints.links: return `contents/${this.endpoint.id}/links`
      case api.EndPoints.specialties: return 'specialties'
      case api.EndPoints.populares: return 'populares'
      case api.EndPoints.favorites: return 'favorites?version=2&sort=-date'
      case api.EndPoints.histories: return 'histories'
      case api.EndPoints.clearHistories: return 'histories'
      case api.EndPoints.favorite: return 'favorites'
      case api.EndPoints.unfavorite: return `favorites/${this.endpoint.id}`
      case api.EndPoints.feedback: return 'feedbacks'
      case api.EndPoints.feedbackContent: return 'feedbacks?version=2'
      case api.EndPoints.saveInstallation: return 'users/installations'
      case api.EndPoints.useVoucher: return 'vouchers'
      case api.EndPoints.partnerships: return 'partnerships?version=2'
      case api.EndPoints.plans: return 'users/me/plans'
      case api.EndPoints.getNotifications: return 'messages'
      case api.EndPoints.getNotification: return `messages/${this.endpoint.id}?version=2`
      case api.EndPoints.getSubstances: return 'contents/substances'
      case api.EndPoints.getDrugGuidelines: return 'contents?version=6'
      case api.EndPoints.events: return 'events'
      case api.EndPoints.getFeatures: return 'banners'
      case api.EndPoints.getReferredUsers: return `users/${this.endpoint.id}/referrals?version=2`
      default: return ''
    }
  }

  api.url = function () {
    return this.getBaseUrl() + this.path()
  }

  api.method = function () {
    let token = null
    if (store.$auth.user !== null) {
      token = store.$auth.strategy.token.get().access
    } else if (this.endpoint.token !== null && this.endpoint.token !== undefined) {
      token = this.endpoint.token.access
    }
    api.setToken(token, 'Bearer')

    switch (this.endpoint) {
      case api.EndPoints.signUp:
      case api.EndPoints.login:
      case api.EndPoints.socialLogin:
      case api.EndPoints.favorite:
      case api.EndPoints.feedback:
      case api.EndPoints.feedbackContent:
      case api.EndPoints.saveInstallation:
      case api.EndPoints.events:
        return api.$post(this.url(), this.params)
      case api.EndPoints.unfavorite:
        return api.$delete(this.url(), this.params)
      case api.EndPoints.clearHistories:
      case api.EndPoints.forgotPassword:
      case api.EndPoints.updateUser:
      case api.EndPoints.useVoucher:
        return api.$patch(this.url(), this.params)
      default:
        return api.$get(this.url(), { params: this.params })
    }
  }

  api.request = function (endpoint, params) {
    this.endpoint = endpoint
    this.params = params
    return this.method()
  }
  // Inject to context as $api
  inject('api', api)
}
