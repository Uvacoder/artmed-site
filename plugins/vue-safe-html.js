import Vue from 'vue'
import VueSafeHTML from 'vue-safe-html'

Vue.use(VueSafeHTML, {
  allowedTags: [
    'a',
    'b',
    'br',
    'strong',
    'i',
    'em',
    'mark',
    'small',
    'del',
    'ins',
    'sub',
    'sup',
    'svg',
    'path',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span',
    'div',
    'iframe',
    'ul',
    'ol',
    'li'
  ]
})
