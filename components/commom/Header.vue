<template>
  <header class="header" :class="{ 'header--small': !isIndex }">
    <b-container>
      <CommomNavBar :is-index="isIndex" />
      <template v-if="isIndex">
        <b-row>
          <b-col cols="12" md="10" offset-md="1">
            <CommomLogo />
            <CommomSearch :is-index="isIndex" />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <HomeCategories />
          </b-col>
        </b-row>
      </template>
      <template v-else>
        <CommomSearch :is-index="isIndex" />
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
    background: var(--gray-1);
    border-bottom: 1px solid var(--gray-3);
    @include rem("padding-bottom", 30px);

    &::v-deep .logo {
      display: flex;
      justify-content: center;
      @include rem("margin-bottom", 56px);
    }

    &--small {
      @include rem("padding-bottom", 20px);
    }
  }
</style>
