<template>
  <header class="header">
    <b-container>
      <CommomNavBar :is-index="isIndex" />
      <template v-if="isIndex">
        <b-row>
          <b-col cols="12" md="10" offset-md="1">
            <CommomLogo />
            <HomeSearch />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <HomeCategories />
          </b-col>
        </b-row>
      </template>
      <template v-else>
        <CommomSearch />
      </template>
    </b-container>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isIndex () {
      return (this.$route.name === 'index')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    background: #FAFBFC;
    border-bottom: 1px solid #D8D8D8;
    @include rem("padding-bottom", 30px);

    &::v-deep .logo {
      display: flex;
      justify-content: center;
      @include rem("margin-bottom", 56px);
    }
  }
</style>
