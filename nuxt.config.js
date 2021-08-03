import axios from 'axios'

export default {
  flavor: 'psi',
  emailFlavor: 'artmed+psi@artmed.com.br',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Artmed+PSI',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'O seu guia para a tomada de decisão clínica de saúde mental.' }
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
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-safe-html.js',
    '~/plugins/infinite-loading.js',
    '~/plugins/api.js',
    '~/plugins/helpers.js',
    '~/plugins/iframeResize.js'
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
    '@nuxtjs/auth-next',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  bootstrapVue: {
    icons: true
  },

  styleResources: {
    scss: [
      './assets/scss/_bootstrap.scss',
      './assets/scss/_color-system.scss',
      './assets/scss/_color-psi.scss',
      './assets/scss/_mixins.scss'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.consultamaisrapida.com.br/',
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
        scheme: '~/schemes/customScheme.js',
        token: {
          property: 'data.token',
          global: true,
          required: true,
          type: 'Bearer',
          maxAge: 0
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
        token: {
          maxAge: 0
        },
        endpoints: {
          userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}'
        },
        clientId: '590824438481855',
        scope: ['public_profile', 'email']
      },
      google: {
        clientId: '...'
      },
      customOauth2: {
        scheme: '~/schemes/CustomOauth2Scheme.js',
        endpoints: {
          userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}'
        },
        clientId: '...',
        scope: ['public_profile', 'email']
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
      lang: 'pt-BR'
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

  sitemap: {
    hostname: 'https://dev-artmed-site.vercel.app/',
    gzip: true,
    routes: async () => {
      let routes = []
      const baseURL = 'https://api.consultamaisrapida.com.br/'
      const headers = { common: { 'X-APP': '2' } }
      const [categories, contents, news] = await Promise.all([
        axios.get(`${baseURL}categories?version=2&start=0&limit=0`, headers),
        axios.get(`${baseURL}contents?version=8&start=0`, headers),
        axios.get(`${baseURL}news?start=0`, headers)
      ])
      routes = [
        ...routes,
        ...categories.data.data.map(category => `/categorias/${category.id}`),
        ...contents.data.data.map(content => `/conteudo/${content.id}`),
        ...news.data.data.map(article => `/conteudo/${article.objectId}`)
      ]
      return routes
    }
  },

  loading: {
    color: '#01826C',
    height: '5px'
  },

  server: {
    host: '0.0.0.0'
  }
}
