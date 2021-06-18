<template>
  <main class="container content__body">
    <HomeBigBoxCarouselContainer
      title="Conteúdos mais acessados por você"
      :items="HighlightsItems"
    />
    <HomeSmallBoxCarouselContainer
      title="Conteúdos mais acessados por você"
      icon="icon_history"
      text="Quando você acessa um conteúdo várias vezes, ele ficará nessa lista."
      :items="ContentMostAccessedItems"
      property="content.name"
      image="content.category.image"
    />
    <HomeSmallBoxCarouselContainer
      title="Calculadoras mais acessados por você"
      to="#"
      link="Ver Tudo"
      icon="icon_calc"
      text="Quando você acessa uma calculadora várias vezes, ela ficará nessa lista."
      :items="PopularCalculatorsItems"
      property="content.name"
      image="content.category.image"
    />
    <HomeColumnListContainer
      title="Conteúdos salvos"
      to="#"
      link="Ver Tudo"
      icon="icon_bookmark_yes"
      text="Os conteúdos que você salvar aparecerão aqui."
      :items="BookmarksItems"
      to-item="content.name"
      property="content.name"
      image="content.category.image"
    />
    <HomeColumnListContainer
      title="Buscas Recentes"
      to="#"
      link="Ver Tudo"
      icon="icon_search"
      text="As últimas buscas realizadas estarão aqui para acesso rápido."
      :items="RecentSearchesItems"
      to-item="search"
      property="search"
      icon-item="icon_search"
    />
  </main>
</template>

<script>
export default {
  name: 'Body',
  computed: {
    HighlightsItems () {
      return this.$store.state.features.items
    },
    ContentMostAccessedItems () {
      return this.$store.state.hotContent.items
    },
    PopularCalculatorsItems () {
      return this.$store.state.populares.items
    },
    BookmarksItems () {
      return this.$store.state.favorites.items
    },
    RecentSearchesItems () {
      return this.$store.state.recentSearch.items
    }
  }
}
</script>

<style lang="scss" scoped>
  .content__body {
    @include rem("margin-top", 12px);
  }
</style>
