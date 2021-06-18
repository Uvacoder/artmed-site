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
        centered: true
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
      return path.split('.').reduce((o, p) => o ? o[p] : defaultValue, object)
    },
    truncateString: (str, num) => {
      if (str === null) { return }
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    },
    formatToSlug: (value) => {
      if (value === undefined) { return }
      return value.replace(/ |(-|\/)/g, '_').toLowerCase()
    }
  }

  inject('helpers', helpers)
}
