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
      return this.$store.state.theme.config.psiMode ? 'theme--psi' : 'theme--clin'
    },
    color () {
      return this.$store.state.theme.config.darkMode ? `theme--sys--dark ${this.app}--dark` : `theme--sys ${this.app}`
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.$store.commit('window/SET_WIDTH', window.innerWidth)
      this.$store.commit('window/SET_HEIGHT', window.innerHeight)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
