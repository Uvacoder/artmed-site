<script type="text/x-template" id="content-article">
  <slot />
</script>

<script>
export default {
  name: 'ContentArticle',
  props: {
    content: {
      type: [Array, Object],
      required: true
    }
  },
  template: '#content-article',
  render: function (createElement) {
    return createElement('div', { attrs: { id: 'contentArticle', class: 'content-article' }, domProps: { innerHTML: this.getHtml } }, this.$slots.default)
  },
  computed: {
    getHtml () {
      // if isNews {
      //   return this.htmlPost()
      // } else if isNotification {
      //   return this.htmlNotification()
      if (this.content.type !== undefined && this.content.type === 2) {
        return this.htmlCalc()
      } else {
        return this.htmlContent()
      }
    }
  },
  data () {
    return {
      headStyle: '',
      headScript: '',
      BodyScript: ''
    }
  },
  head () {
    return {
      style: [
        (this.headStyle !== '') ? { innerHTML: this.headStyle } : ''
      ],
      script: [
        (this.headScript !== '') ? { innerHTML: this.headScript } : '',
        (this.bodyScript !== '') ? { innerHTML:  this.bodyScript, body: true } : ''
      ]
    }
  },
  mounted () {
    if (this.content.type !== undefined && this.content.type === 2) {
      // nothing
    } else {
      document.getElementById('contentArticle').querySelectorAll('h1').forEach(item => {
        item.addEventListener('click', event => {
          const h1 = event.target.closest('h1')
          if (h1) {
            h1.classList.toggle('closed');
            let content = h1.nextElementSibling
            content.style.display = content.style.display === 'none' ? 'block' : 'none'
          }
        })
      })
    }
  },
  methods: {
    htmlPost () {},
    htmlNotification () {},
    htmlCalc () {
      let html = ''
      // colocar o css no braço
      for (const content of this.content.values) {
        console.log(content)
        const head = content.match(/<head[\s\S]*?>[\s\S]*?<\/head>/g).toString()
        const style = head.match(/<style[\s\S]*?>[\s\S]*?<\/style>/g)
        const script = head.match(/<script[\s\S]*?>[\s\S]*?<\/script>/g)
        let body = content.match(/<body[\s\S]*?>[\s\S]*?<\/body>/g).toString()
        const bodyScript = body.match(/<script[\s\S]*?>[\s\S]*?<\/script>/g)

        if (style !== null) {
          // this.headStyle = '#contentArticle {'
          this.headStyle += style.toString().replace('<style>', '').replace('<\/style>', '')
          this.headStyle = this.headStyle.replace(/@font-face[\s\S]*?{[\s\S]*?}/g, '')
          this.headStyle = this.headStyle.replace(/:root[\s\S]*?{[\s\S]*?}/g, '')
          this.headStyle = this.headStyle.replace(/body[\s\S]*?{[\s\S]*?}/g, '')
          // this.headStyle += '}'
        }

        if (script !== null) {
          this.headScript = script.toString().replace('<script>', '').replace('<\/script>', '')
        }
        // remover o js de fechar os h1
        if (bodyScript !== null) {
          this.bodyScript = bodyScript.toString().replace('<script>', '').replace('<\/script>', '')
          body = body.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/g, '')
        }
        html += body
      }
      return html
    },
    htmlContent () {
      let html = ''
      for (let index = 0; index < this.content.values.length; index++) {
        let newContent = ''
        if (this.content.values[index].includes('<h1>Referência') || this.content.values[index].includes('<h1>Referências') || this.content.values[index].includes('<h1>Autor') || this.content.values[index].includes('<h1>Autores') || this.content.values[index].includes('<h1>Adaptação editorial')) {
          newContent = this.content.values[index].replace(/<\/h1>/gm, '</h1><div class="smallParagraph">')
        } else {
          newContent = this.content.values[index].replace(/<\/h1>/gm, '</h1><div>')
        }
        newContent = newContent.replace(/<h1/gm, '<section><h1')
        if (newContent.includes('<div')) {
          newContent += '</div></section>'
        }
        html += newContent
      }
      return html
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-article {
    // @media (prefers-color-scheme: dark) {
    //   &::v-deep h1:after {
    //     // background-image: url(%arrow_dark_up);
    //   }
    //   &::v-deep h1.closed:after {
    //     // background-image: url(%arrow_dark_down);
    //   }
    // }

    &::v-deep section {
      @include rem("padding-top", 11px);
      @include rem("margin-bottom", 11px);
      &:first-of-type {
        padding-top: 0;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }

    &::v-deep .iframe-container {
      position: relative;
      overflow: hidden;
      height:0;
      padding-bottom: 56.25%;
      padding-top: 25px;
      margin-bottom:10px
    }

    &::v-deep .iframe-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    &::v-deep p {
      word-break: break-word !important;
      margin-top: 10px !important;
      margin-bottom: 0px;
      font-size: 1rem;
    }

    &::v-deep ul {
      margin-left: 0;
      margin-top: 10px;
      padding-left: 20px;
      margin-bottom: 0px;
    }

    &::v-deep li {
      font-size: 1rem;
      margin-left: 0;
      padding-left: 0
    }

    &::v-deep li ul {
      margin-top: 0;
    }

    &::v-deep a {
      color: #00A589;
      word-break: break-word;
    }

    &::v-deep table {
      border: 1px solid #000;
      border-collapse: collapse;
      border-spacing: 0;
      margin-top: 20px;
      width: 100%;
      display: table;
    }

    &::v-deep table, td {
      background-color: transparent
    }

    &::v-deep table p {
      word-break: normal !important;
      margin:0 !important;
      padding: 0 !important;
    }

    &::v-deep tr {
      border-bottom: 1px solid #000;
    }

    &::v-deep table th:first-child, table td:first-child, table th:first-child, table td:first-child {
      padding-left: 1rem;
    }

    &::v-deep table td, table th {
      padding: 8px 8px;
      display: table-cell;
      text-align: left;
      vertical-align: top;
    }

    &::v-deep img {
      display: inline;
      height: auto;
      max-width: 100% !important;
    }

    &::v-deep table img {
      min-width: 100px !important;
      max-width: 90vw !important;
    }

    &::v-deep h1 {
      font-weight: 600;
      @include font-computed(24px, 44px);
      position: relative;
      padding-right: 40px;
      margin: 0;
      color: #343434;
    }

    &::v-deep h1:after {
      right: 0px;
      width: 35px;
      height: 30px;
      content: " ";
      background-image: url('~/assets/images/chevron_up.svg');
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      display: block;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }

    &::v-deep h1.closed:after {
      background-image: url('~/assets/images/chevron_down.svg');
    }

    &::v-deep h2 {
      font-size: 1.25rem;
    }

    &::v-deep .table_responsive {
      overflow-x: auto !important;
      word-break: normal !important;
    }

    &::v-deep .smallParagraph p {
      font-size: 0.875rem;
    }

    &::v-deep span.SearchHighlight {
      // background-color: var(--highlight-app-color);
    }

    &::v-deep span.SearchHighlight.active {
      // background-color: var(--highlight-active-app-color);
    }
  }
</style>
