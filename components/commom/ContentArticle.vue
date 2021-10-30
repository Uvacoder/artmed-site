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
      return createElement(
        'article',
        {
          attrs: {
            id: 'contentArticleIframe',
            class: 'content-article--iframe'
          },
        }, [
          createElement('iframe', { attrs: { id: 'contentArticle', class: 'content-article', srcDoc: this.getHtml, width: "100%", frameborder: "0", scrolling: 'no' } }, this.$slots.default)
        ],
        this.$slots.default
      )
    } else {
      return createElement('article', { attrs: { id: 'contentArticle', class: `content-article content-article${this.modClass}` }, domProps: { innerHTML: this.getHtml } }, this.$slots.default)
    }
  },
  computed: {
    isNews () {
      return (this.content.postedBy !== undefined)
    },
    getHtml () {
      if (this.isNews) {
        this.modClass = '--post'
        return this.htmlPost()
      } else if (this.content.type !== undefined && this.content.type === 2) {
        return this.htmlCalc()
      } else if (this.content.text !== undefined) {
        return this.htmlText()
      } else {
        this.modClass = '--content'
        return this.htmlContent()
      }
    }
  },
  data () {
    return {
      headStyle: '',
      headScript: '',
      BodyScript: '',
      timer: '',
      modClass: ''
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
    if (this.isNews) {
      return
    } else if (this.content.type !== undefined && this.content.type === 2) {
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
    htmlPost () {
      let html = ''
      html += `<h1>${this.content.title}</h1>`
      if (this.content.intro) {
        html += `<h2>${this.content.intro}</h2>`
      }
      for (const content of this.content.postContent) {
        const body = content.body
        switch (content.type) {
          case 1:
            html += `<p>${body}</p>`
            break
          case 2:
            html += `<img style="width:100%" src="${body}">`
            break
          case 3:
            html += `<div class="iframe-container"><iframe width="560" height="315" src="${body}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
            break
          default: break
        }
      }
      let urls = html.match(/(http|ftp|https):\/\/([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?/g)
      if (urls !== null) {
        for (const url of urls) {
          html = html.replace(url, this.$helpers.getContentUrl(url))
        }
      }
      return html
    },
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
              let variant = 50
              if (document.getElementsByClassName("reference-container")[0]) {
                variant += (document.getElementsByClassName("reference-container")[0].offsetHeight / 2)
              }
              if (document.getElementsByClassName("result-container")[0]) {
                variant += (document.getElementsByClassName("result-container")[0].offsetHeight / 2)
              }
              return pageHeight + variant
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
      for (const content of this.content.values) {
        let newContent = ''
        if (content.includes('<h1>Referência') || content.includes('<h1>Referências') || content.includes('<h1>Autor') || content.includes('<h1>Autores') || content.includes('<h1>Adaptação editorial')) {
          newContent = content.replace(/<\/h1>/gm, '</h1><div class="smallParagraph">')
        } else {
          newContent = content.replace(/<\/h1>/gm, '</h1><div>')
        }
        newContent = newContent.replace(/<h1/gm, '<section><h1')
        if (newContent.includes('<div')) {
          newContent += '</div></section>'
        }
        let urls = newContent.match(/(http|ftp|https):\/\/([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?/g)
        if (urls !== null) {
          for (let index = 0; index < urls.length; index++) {
            newContent = newContent.replace(urls[index], this.$helpers.getContentUrl(urls[index]))
          }
        }
        html += newContent
      }
      return html
    },
    htmlText () {
      let html = ''
      html += this.content.text
      html = html.replace('col-xs-12 col-sm-9 col-md-9', ''); // gray-3
      return html
    }
  }
}
</script>

<style lang="scss" scoped>
  article.content-article {
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
      // margin-bottom: 0px;
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
      border: 1px solid var(--contrast);
      border-collapse: collapse;
      border-spacing: 0;
      margin-top: 20px;
      width: 100%;
      display: table;
    }

    &::v-deep table,
    &::v-deep td {
      background-color: transparent;
    }

    &::v-deep table p {
      word-break: normal !important;
      margin:0 !important;
      padding: 0 !important;
    }

    &::v-deep tr {
      border-bottom: 1px solid var(--contrast);
    }

    &::v-deep table th:first-child,
    &::v-deep table td:first-child,
    &::v-deep table th:first-child,
    &::v-deep table td:first-child {
      padding-left: 16px;
    }

    &::v-deep table td,
    &::v-deep table th {
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
      font-size: 1.5rem;
    }

    &::v-deep h2 {
      font-size: 1.125rem;
    }

    &::v-deep h3,
    &::v-deep h3 span {
      color: var(--contrast) !important;
      font-size: 1.120rem !important;
    }

    &::v-deep .table_responsive {
      overflow-x: auto !important;
      word-break: normal !important;
    }

    &::v-deep .smallParagraph p {
      font-size: 0.875rem;
    }

    &--content {
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
    }
  }
</style>
