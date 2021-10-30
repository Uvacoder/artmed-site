<template>
  <CommomContent body="CategoriesBody" />
</template>

<script>
export default {
  name: 'Categoria',
  // auth: false,
  async asyncData (context) {
    await Promise.all([context.store.dispatch('content/contentByCategory', { categoryId: context.route.params.id, loadMore: false })])
  }
}
</script>
