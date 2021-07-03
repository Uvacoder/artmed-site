import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import Spinner from '~/components/commom/InfiniteLoading/Spinner'

Vue.use(InfiniteLoading, {
  slots: {
    spinner: Spinner,
    noMore: '',
    noResults: '',
    error: ''
  }
})
