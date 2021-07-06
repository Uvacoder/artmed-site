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
    if (this.content.type !== undefined && this.content.type === 2) {
      return createElement('iframe', { attrs: { id: 'contentArticle', class: 'content-article', srcDoc: this.getHtml, width: "100%", frameborder: "0", scrolling: 'no' } }, this.$slots.default)
    } else {
      return createElement('div', { attrs: { id: 'contentArticle', class: 'content-article' }, domProps: { innerHTML: this.getHtml } }, this.$slots.default)
    }
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
      BodyScript: '',
      timer: ''
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
      window.addEventListener('message', (event) => {
        if (event.data.height) {
          let iframe = document.getElementById('contentArticle');
          iframe.height = event.data.height;
        }
      });
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
      for (const content of this.content.values) {
        html = content.replace(/<h3[\s\S]*?>[\s\S]*?<\/h3>/g, '')
        html = html.replace('background-size: 32px;', 'background-size: 22px 12px;'); // background-fill
        html = html.replace('%arrow_up', require('~/assets/images/chevron_up.svg')); // background-fill
        html = html.replace('%arrow_down', require('~/assets/images/chevron_down.svg')); // background-fill
        html = html.replace('%bg_color', '#ffffff'); // background-fill
        html = html.replace('%txt_color', '#343434'); // contrast
        html = html.replace('%app_color', '#01826C'); // color-4
        html = html.replace('%input_bg_color', '#FAFBFC'); // gray-1
        html = html.replace('%input_stroke_color', '#D8D8D8'); // gray-3
        html = html.replace('</head>', '<link rel="stylesheet" href="https://use.typekit.net/rhv4hzr.css"></head>');
        html = html.replace(/@media[\s\S]*?(prefers-color-scheme:[\s\S]*?dark)[\s\S]*?{[\s\S]*?}[\r\n]*?}/g, '')
        html = html.replace(/@font-face[\s\S]*?{[\s\S]*?}/g, '')
        html = html.replace(/DIN 2014/g, 'din-2014')
        const script =
          `<script type="text/javascript">
            function getPageHeight() {
              var pageHeight = 0;
              function findHighestNode(nodesList) {
                for (var i = nodesList.length - 1; i >= 0; i--) {
                  if (nodesList[i].scrollHeight && nodesList[i].clientHeight) {
                    var elHeight = Math.max(nodesList[i].scrollHeight, nodesList[i].clientHeight);
                    pageHeight = Math.max(elHeight, pageHeight);
                  }
                  if (nodesList[i].childNodes.length) findHighestNode(nodesList[i].childNodes);
                }
              }
              findHighestNode(document.documentElement.childNodes);
              // The entire page height is found
              // console.log(pageHeight, document.getElementsByClassName("reference-container")[0].offsetHeight, document.getElementsByClassName("result-container")[0].offsetHeight)
              return pageHeight + document.getElementsByClassName("reference-container")[0].offsetHeight + document.getElementsByClassName("result-container")[0].offsetHeight
            }
            window.addEventListener('DOMContentLoaded', function() {
              console.log('DOMContentLoaded')
              var msg = { height: getPageHeight() }
              window.parent.postMessage(msg, '*')
            });
            const resizeObserver = new ResizeObserver(entries => {
              console.log('body.resize')
              var msg = { height: getPageHeight() }
              window.parent.postMessage(msg, '*')
            });
            // start observing a DOM node
            resizeObserver.observe(document.body)
          <\/script>
        <\/body>`

        html = html.replace('</body>', script)

        // html = html.replace("%bg_dark_color", "#242425");
        // html = html.replace("%txt_dark_color", "#FCFBFB");
        // html = html.replace("%app_dark_color", "#6D9236");
        // html = html.replace("%input_bg_dark_color", "#303030");
        // html = html.replace("%input_stroke_dark_color", "#5F5F5F");
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
  div.content-article {
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
      color: var(--three);
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
      color: var(--contrast);
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
