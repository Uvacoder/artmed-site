<template>
  <b-link
    :href="link"
    rel="external nofollow"
    class="btn-store"
    :class="classMod"
  >
    <b-img
      :src="file"
      :alt="alt"
      fluid
    />
  </b-link>
</template>

<script>
// todo: alterar para usar o svg em background
export default {
  name: 'BtnStore',
  props: {
    appleStore: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    link () {
      const link = (this.appleStore) ? '#apple' : '#google'
      return link
    },
    classMod () {
      const classMod = (this.appleStore) ? 'btnStore--apple' : 'btnStore--google'
      return classMod
    },
    file () {
      const store = (this.appleStore) ? 'apple' : 'google'
      return require(`~/assets/images/btn_store_${store}.svg`)
    },
    alt () {
      const store = (this.appleStore) ? 'disponível na App Store' : 'disponível no Google Play'
      return `${this.$store.state.theme.config.appName} está ${store}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-store {
    display: inline-block;
    @include rem("padding-top", 6px);
  }
</style>
