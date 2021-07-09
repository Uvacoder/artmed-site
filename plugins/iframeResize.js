import Vue from 'vue'
import iframeResize from 'iframe-resizer/js/iframeResizer'

Vue.directive('resize', {
  bind (el, { value = {} }) {
    el.addEventListener('load', () => iframeResize(value, el))
  },
  unbind (el) {
    el.iFrameResizer.removeListeners()
  }
})
