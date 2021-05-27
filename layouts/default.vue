<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'Default',
  head () {
    return {
      bodyAttrs: {
        class: [
          this.color
        ]
      }
    }
  },
  computed: {
    app () {
      return this.$store.state.theme.psiMode ? 'theme--psi' : 'theme--clin'
    },
    color () {
      return this.$store.state.theme.darkMode ? `theme--sys--dark ${this.app}--dark` : `theme--sys ${this.app}`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
