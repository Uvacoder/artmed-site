<template>
  <HomeContent />
</template>

<script>
// import { mapMutations } from 'vuex'

export default {
  name: 'Home',
  auth: 'guest',
  async asyncData (context) {
    // let [pageRes, countRes] = await Promise.all([
    //   axios.get('/api/post/page/0'),
    //   axios.get('/api/post/count/published'),
    // ])
    // return {
    //    posts: pageRes.data.list,
    //    total: countRes.data.result
    // }
    // await console.log(context.store.dispatch('features/loadFeatures'))
    const [categories, features, hotContent, favorites, populares, recentSearch] = await Promise.all([
      await context.store.dispatch('categories/load'),
      await context.store.dispatch('features/load'),
      await context.store.dispatch('hotContent/load'),
      await context.store.dispatch('favorites/load'),
      await context.store.dispatch('populares/load'),
      await context.store.dispatch('recentSearch/load')
    ])
    return {
      categories,
      features,
      hotContent,
      favorites,
      populares,
      recentSearch
    }
  }
}
</script>
