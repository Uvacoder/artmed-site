<template>
  <main class="container content__body">
    Notícias e Atualizações
    <template v-if="Detail">
      {{ News }}
    </template>
    <template v-else>
      <p v-for="(newU, index) in News" :key="index">
        {{ newU }}
        ----------
      </p>
    </template>
  </main>
</template>

<script>
// TODO: noticias
// TODO: interna da noticias
export default {
  name: 'Body',
  computed: {
    News () {
      return this.$store.state.news.items
    },
    Detail () {
      return this.$store.state.news.detail
    }
  }
}
</script>

<style lang="scss" scoped>
  .content__body {
    @include rem("margin-top", 12px);
  }
</style>
