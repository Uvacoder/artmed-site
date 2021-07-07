<template>
  <main class="container content__body">
    <CommomBodyHeader
      title="Notícias e Atualizações"
    />
    <NewsArticles
      :items="News"
    />
    <infinite-loading v-if="News.length >= 20" @infinite="infiniteHandler" />
  </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Body',
  computed: {
    News () {
      return this.$store.state.news.items
    }
  },
  methods: {
    ...mapActions([
      'news/loadNews'
    ]),
    ...mapActions({
      loadNews: 'news/loadNews'
    }),
    infiniteHandler ($state) {
      this.loadNews()
        .then((data) => {
          if (data.length > 0) {
            $state.loaded()
          } else {
            $state.complete()
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content__body {
    @include rem("margin-top", 12px);
  }
</style>
