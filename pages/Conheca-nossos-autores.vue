<template>
  <CommomContent body="ContentBody" />
</template>

<script>
export default {
  name: 'ConhecaNossosAutores',
  async asyncData (context) {
    await Promise.all([
      await context.store.dispatch('content/loadAuthors')
    ])
  }
}
</script>
