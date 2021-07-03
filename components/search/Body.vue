<template>
  <main class="container content__body">
    <b-row>
      <aside class="col col-md-3">
        <SearchFilterCategories @filtered="loadByFilter" />
      </aside>
      <section class="col col-md-9">
        <CommomNavSection
          :items="Contents"
          property-label="name"
          property-locked="premium"
        />
        <infinite-loading v-if="Contents.length >= 20" @infinite="infiniteHandler(true)" />
      </section>
    </b-row>
  </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Body',
  computed: {
    Categories () {
      return this.$store.state.categories.items
    },
    Contents () {
      return this.$store.state.search.contents
    }
  },
  methods: {
    debounce (func, timeout = 500) {
      let timer
      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
      }
    },
    ...mapActions([
      'search/load'
    ]),
    ...mapActions({
      searchLoad: 'search/load'
    }),
    infiniteHandler ($state, infinite) {
      this.searchLoad({ searchTerm: this.$route.params.slug || '', loadMore: true })
        .then((data) => {
          if (infinite) {
            if (data.length > 0) {
              $state.loaded()
            } else {
              $state.complete()
            }
          }
        })
    },
    loadByFilter () {
      this.debounce(this.searchLoad({ searchTerm: this.$route.params.slug || '', loadMore: false }))
    }
  }
}
</script>

<style lang="scss" scoped>
  .content__body {
    @include rem("margin-top", 12px);
  }
</style>
