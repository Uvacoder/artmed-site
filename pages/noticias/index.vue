<template>
  <CommomContent body="NewsBody" />
</template>

<script>
export default {
  name: 'NotíciasEAtualizações',
  auth: false,
  async asyncData (context) {
    await Promise.all([
      await context.store.dispatch('news/loadNews')
    ])
  }
}
</script>
