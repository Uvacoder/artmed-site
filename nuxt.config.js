export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'artmed-site',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://use.typekit.net/rhv4hzr.css'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/_bootstrap.scss',
    '~/assets/scss/_variables.scss',
    '~/assets/scss/_mixins.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-safe-html.js',
    '~/plugins/api.js',
    '~/plugins/helpers.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next'
  ],

  bootstrapVue: {
    icons: true
  },

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://api.dev.consultamaisrapida.com.br/',
    headers: {
      common: {
        'X-APP': '2'
      }
    }
  },

  auth: {
    plugins: [{ src: '~/plugins/api.js', ssr: true }],
    strategies: {
      custom: {
        scheme: '~/plugins/customScheme.js',
        token: {
          property: 'data.token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'data'
        },
        endpoints: {
          login: { url: 'sessions?version=1', method: 'post' },
          logout: false,
          user: { url: 'users/id?version=3', method: 'get' }
        }
      },
      facebook: {
        endpoints: {
          userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}'
        },
        clientId: '...',
        scope: ['public_profile', 'email']
      },
      google: {
        clientId: '...'
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    }
  },

  router: {
    middleware: ['auth']
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  generate: {
    dir: 'public'
  },

  build: {
    babel: {
      compact: true
    }
  },

  server: {
    host: '0.0.0.0'
  }
}
