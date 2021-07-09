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
      const theme = (this.$store.state.theme.config.darkMode || this.forceDark) ? 'dark' : 'light'
      return `url("${require(`~/assets/images/${this.$store.state.theme.config.app}/${theme}/${this.$store.state.theme.config.app}.svg`)}")`
    },
    alt () {
      return this.$store.state.theme.config.appName
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
