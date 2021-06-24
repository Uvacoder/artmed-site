import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.$bvModal.msgBoxOk('Data was submitted successfully', {
  title: 'Confirmation',
  size: 'sm',
  buttonSize: 'sm',
  okVariant: 'success',
  headerClass: 'p-2 border-bottom-0',
  footerClass: 'p-2 border-top-0',
  centered: true
})
// .then((value) => {
//   console.log(value)
// })
// .catch((err) => {
//   // An error occurred
//   console.log(err)
// })
