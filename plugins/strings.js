export default function (string, inject) {
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
  inject('strings', strings)
  return strings[string]
}
