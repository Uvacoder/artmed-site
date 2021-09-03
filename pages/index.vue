<template>
  <CommomContent body="HomeBody" />
</template>

<script>
// TODO: Colocar cenário de vazio e erro em todas as paginas que tem requests
export default {
  name: 'Home',
  // auth: 'guest',
  async asyncData (context) {
    await Promise.all([
      await context.store.dispatch('categories/load'),
      await context.store.dispatch('features/load'),
      await context.store.dispatch('hotContent/load'),
      await context.store.dispatch('favorites/load'),
      await context.store.dispatch('populares/load'),
      await context.store.dispatch('recentSearch/load')
    ])
  }
}
</script>
