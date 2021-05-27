<template>
  <div class="bookmarks">
    <CommomSectionTitleLink title="Conteúdos salvos" to="#" link="Ver Tudo" />
    <HomeEmptySection
      v-if="false"
      icon="icon_bookmark_yes"
      text="Os conteúdos que você salvar aparecerão aqui."
    />
    <HomeColumnList v-else />
  </div>
</template>

<script>
export default {
  name: 'Bookmarks'
}
</script>

<style lang="scss" scoped>
</style>
