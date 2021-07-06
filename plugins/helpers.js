import jwtDecode from 'jwt-decode'

export default ({ app }, inject) => {
  const helpers = {
    getString: (string) => {
      const strings = {
        alertSucessTitle: 'Sucesso!',
        alertErrorTitle: 'Ops...',
        alertErrorMessage: 'Ocorreu um erro na sua requisição',
        alertErrorLimitReachedMessage: 'Você só pode selecionar 6 substâncias',
        missingName: 'Informe seu nome.',
        missingEmail: 'Informe um E-mail válido.',
        missingPassword: 'Informe sua senha.',
        passwordsNotMatch: 'As senhas não correspondem',
        successForgot: 'Você receberá no seu um link para recuperar a senha',
        missingSpecialty: 'Informe sua especialidade.',
        missingArea: 'Informe sua área.',
        missingExperience: 'Informe sua experiência.',
        missingVoucherCode: 'O código empresarial deve conter entre 4 a 32 caracteres.',
        missingText: 'Preencha alguma coisa',
        alertErrorClearSearchHistory: 'Erro ao limpar seu histórico de buscas',
        authors: 'Stephen Doral Stefani | Elvino Barros',
        shareButtonTitle: 'Compartilhe o Artmed +CLIN com amigos',
        shareText: 'Conheça o app Artmed +CLIN.\nBaixe já:\nhttps://artmedclin.onelink.me/7pXI/share',
        authorsUrl: 'http://admin.consultamaisrapida.com.br/authors?app=1',
        baseURL: 'https://clinicamedica.consultamaisrapida.com.br',
        supportMailTitle: 'Suporte App Artmed +CLIN',
        appId: '1498264060',
        appName: 'Artmed +CLIN'
      }
      return strings[string]
    },
    getModalOptions: (title) => {
      return {
        title,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true,
        cancelTitle: 'Cancelar'
      }
    },
    arrayInsertAt: (array, position, elements) => {
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index]
        array.splice(position + index, 0, element)
      }
      return array
    },
    extractUserId: (token) => {
      const jwt = jwtDecode(token)
      return jwt.id
    },
    normalizeImageUrl: (image) => {
      return `${app.$api.defaults.baseURL}resources/${image}`
    },
    resolvePath: (object, path, defaultValue) => {
      if (path === undefined) { return defaultValue }
      return path.split('.').reduce((o, p) => o ? o[p] : defaultValue, object)
    },
    truncateString: (str, num) => {
      if (str === null) { return }
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    },
    getContentUrlId: (value) => {
      if (value === undefined) { return }
      return value.split('/').pop()
    },
    getContentUrl: (value) => {
      if (value === undefined) { return }
      if (value.includes('consultamaisrapida')) {
        return value.split('consultamaisrapida.com.br').pop()
      } else {
        return value.split('artmedmais.com.br').pop()
      }
    },
    formatToSlug: (value) => {
      if (value === undefined || value === '') { return }
      const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
      const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
      const p = new RegExp(a.split('').join('|'), 'g')

      value = value.toString().toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, ' e ')
        .replace(/[^\w-]+/g, ' ')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
        .replace(/-+/g, '')
      return value
    },
    getContentRoute: (value, isNotification) => {
      let route = { name: 'conteudo-id', params: { id: value.id } }
      if (isNotification) {
        switch (value.type) {
          case 2:
            route = { name: 'categorias-id', params: { id: value.value } }
            break
          case 3:
            route = { name: 'conteudo-id', params: { id: value.value } }
            break
          case 4:
            if (helpers.checkUrlArtmed(value.value)) {
              route = { path: `${helpers.getContentUrl(value.value)}` }
            } else {
              route = value.value
            }
            break
          case 5:
          case 6:
            route = { name: 'notificacoes-id', params: { id: value.id } }
            break
          default:
            break
        }
      }
      return route
    },
    getCategoryRoute: (value) => {
      // 1- default
      // 2- artigos/noticias
      // 3- calculadoras
      // 4- orientacoes medicamentosas
      // 5- cid
      let route = { name: 'categorias-id', params: { id: value.id } }
      switch (value.type) {
        case 2:
          route = { name: 'noticias' }
          break
        case 4:
          route = { path: 'interacoes-medicamentosas' }
          break
        default:
          break
      }
      return route
    },
    checkUrlArtmed: (value) => {
      return (value.includes('consultamaisrapida') || value.includes('artmedmais'))
    },
    getElapsedInterval: (date) => {
      const second = 1000; const minute = second * 60; const hour = minute * 60; const day = hour * 24; const week = day * 7
      const today = new Date()
      date = new Date(date)
      const timediff = today - date
      if (isNaN(timediff)) { return NaN }

      const interval = {
        years: date.getFullYear() - today.getFullYear(),
        months: ((today.getFullYear() * 12 + today.getMonth()) - (date.getFullYear() * 12 + date.getMonth())),
        weeks: Math.floor(timediff / week),
        days: Math.floor(timediff / day),
        hours: Math.floor(timediff / hour),
        minutes: Math.floor(timediff / minute),
        seconds: Math.floor(timediff / second)
      }

      let dateString = 'Agora'
      if (interval.years > 0) {
        dateString = `${interval.years} ${(interval.years > 1) ? 'anos' : 'ano'}`
      } else if (interval.months > 0) {
        dateString = `${interval.months} ${(interval.months > 1) ? 'meses' : 'mês'}`
      } else if (interval.weeks > 0) {
        dateString = `${interval.weeks} ${(interval.weeks > 1) ? 'semanas' : 'semana'}`
      } else if (interval.days > 0) {
        dateString = `${interval.days} ${(interval.days > 1) ? 'dias' : 'dia'}`
      } else if (interval.hours > 0) {
        dateString = `${interval.hours} ${(interval.hours > 1) ? 'horas' : 'hora'}`
      } else if (interval.minutes > 0) {
        dateString = `${interval.minutes} ${(interval.minutes > 1) ? 'minutos' : 'minuto'}`
      }

      return dateString
    },
    initialName (value) {
      if (value === undefined) { return }
      return value.charAt(0).toUpperCase()
    },
    getImageCategory (value) {
      if (value === undefined) { return }
      const category = app.store.state.categories.items.find(category => category.id === value)
      return (category !== undefined) ? this.normalizeImageUrl(category.image) : ''
    }
  }
  inject('helpers', helpers)
}
