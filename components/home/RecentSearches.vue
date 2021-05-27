<template>
  <div class="recent-searches">
    <CommomSectionTitleLink title="Buscas Recentes" to="#" link="Ver Tudo" />
    <HomeEmptySection
      v-if="false"
      icon="icon_search"
      text="As últimas buscas realizadas estarão aqui para acesso rápido."
    />
    <HomeColumnList v-else />
  </div>
</template>

<script>
export default {
  name: 'RecentSearches'
}
</script>

<style lang="scss" scoped>
</style>
