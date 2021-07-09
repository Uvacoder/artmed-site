<template>
  <CommomContent body="SearchBody" />
</template>

<script>
export default {
  name: 'BuscaResultado',
  auth: false,
  async asyncData (context) {
    if (context.route.query.categorias !== undefined && context.route.query.categorias.length > 0) {
      context.store.commit('search/SET_SELECTEDCATEGORIES', context.route.query.categorias.split(','))
    }
    const promises = [context.store.dispatch('search/load', { searchTerm: '', loadMore: false })]
    if (context.store.state.categories.items.length <= 0) {
      promises.push(context.store.dispatch('categories/load'))
    }
    await Promise.all(promises)
  }
}
</script>
