<template>
  <main class="container content__body">
    <ContentBodyHeader
      is-post
      :property-posted-by="Full.postedBy.name"
      :property-label="Full.title"
      :property-sub-label="Full.createdAt"
    />
    <CommomContentArticle :content="Full" />
  </main>
</template>

<script>
export default {
  name: 'BodyNew',
  computed: {
    Full () {
      return this.$store.state.news.full
    }
  }
}
</script>

<style lang="scss" scoped>
  .content__body {
    @include rem("margin-top", 12px);
  }
</style>
