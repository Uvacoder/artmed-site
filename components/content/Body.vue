<template>
  <main class="container content__body">
    <CommomBodyHeader
      :title="Full.name"
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
