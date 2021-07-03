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
  mounted () {
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
  },
  methods: {
    htmlPost () {},
    htmlNotification () {},
    htmlCalc () {
      let html = ''
      console.log(this.content.values)
      for (const content of this.content.values) {
        console.log(content)
        html += content
      }
      return html
    },
    htmlContent () {
      let html = ''
      for (let index = 0; index < this.content.values.length; index++) {
        let newContent = ''
        if (this.content.values[index].includes('<h1>Referência') || this.content.values[index].includes('<h1>Referências') || this.content.values[index].includes('<h1>Autor') || this.content.values[index].includes('<h1>Autores') || this.content.values[index].includes('<h1>Adaptação editorial')) {
          newContent = this.content.values[index].replace(/<\/h1>/gm, '</h1><div class="smallParagraph" style="display:none">')
        } else {
          newContent = this.content.values[index].replace(/<\/h1>/gm, '</h1><div style="display:none">')
        }
        newContent = newContent.replace(/<h1/gm, '<section><h1 class="closed"')
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

    &::v-deep &::v-deep ul {
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
      // color:var(--main-app-color);
      word-break: break-word;
    }

    &::v-deep table {
      // border: 1px solid var(--main-txt-color);
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
      // border-bottom: 1px solid var(--main-txt-color);
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
      font-size: 1.5rem;
      margin: 20px 0 -5px 0 !important;
      position: relative;
      padding-right: 40px;
    }

    &::v-deep h1:after {
      right: 0px;
      width: 35px;
      height: 30px;
      content: " ";
      // background-image: url(%arrow_up);
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
      // background-image: url(%arrow_down);
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
