<template>
  <b-container class="content__body">
    <HomeHighlights />
    <HomeContentMostAccessed />
    <HomePopularCalculators />
    <HomeBookmarks />
    <HomeRecentSearches />
    <CommomFooter />
  </b-container>
</template>

<script>
export default {
  name: 'Body'
}
</script>

<style lang="scss" scoped>
  .content__body {
    margin-top: 12px;
  }
</style>
