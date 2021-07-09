<template>
  <main class="container content__body">
    <ContentBodyHeader
      :property-label="Full.name"
      :is-favorite="Full.favorite"
    />
    <CommomContentArticle :content="Full" />
  </main>
</template>

<script>
export default {
  name: 'Body',
  computed: {
    Full () {
      return this.$store.state.content.full
    }
  }
}
</script>

<style lang="scss" scoped>
  .content__body {
    @include rem("margin-top", 12px);
  }
</style>
