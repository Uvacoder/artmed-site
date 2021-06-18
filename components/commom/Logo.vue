<template>
  <h1 class="logo">
    <b-link href="/" :style="{ backgroundImage: `${file}` }">
      {{ alt }}
    </b-link>
  </h1>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    forceDark: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    file () {
      const app = (this.$store.state.theme.config.psiMode) ? 'psi' : 'clin'
      const theme = (this.$store.state.theme.config.darkMode || this.forceDark) ? 'dark' : 'light'
      return `url("${require(`~/assets/images/${theme}/${app}.svg`)}")`
    },
    alt () {
      const app = (this.$store.state.theme.config.psiMode) ? 'PSI' : 'CLIN'
      return `Artmed+${app}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .logo a {
    display:block;
    width: 100%;
    height: 100%;
    text-indent: -999em;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
</style>
