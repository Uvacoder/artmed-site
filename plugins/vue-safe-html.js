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
    'path'
  ]
})
