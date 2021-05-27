<template>
  <b-link class="logo" href="/">
    <b-img
      class="logo__img"
      :src="file"
      :alt="alt"
      fluid
    />
  </b-link>
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
      const app = (this.$store.state.theme.psiMode) ? 'psi' : 'clin'
      const theme = (this.$store.state.theme.darkMode || this.forceDark) ? 'dark' : 'light'
      return require(`~/assets/images/${theme}/${app}.svg`)
    },
    alt () {
      const app = (this.$store.state.theme.psiMode) ? 'PSI' : 'CLIN'
      return `Artmed+${app}`
    }
  }
}
</script>
