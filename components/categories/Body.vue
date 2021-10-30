<template>
  <main class="container content__body">
    <CommomBodyHeader
      :img="$helpers.normalizeImageUrl(Category.image)"
      :img-dark="$helpers.normalizeImageUrl(Category.imageDark)"
      :title="Category.name"
    />
    <CommomNavSection
      :items="Results"
      property-label="name"
      property-locked="premium"
    />
    <infinite-loading v-if="Results.length >= 20" @infinite="infiniteHandler" />
  </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Body',
  computed: {
    Category () {
      return this.$store.state.content.category
    },
    Results () {
      return this.$store.state.content.items
    }
  },
  methods: {
    ...mapActions([
      'content/contentByCategory'
    ]),
    ...mapActions({
      contentByCategory: 'content/contentByCategory'
    }),
    infiniteHandler ($state) {
      this.contentByCategory({ categoryId: this.$route.params.id, loadMore: true })
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
