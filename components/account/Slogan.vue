<template>
  <h2 class="slogan">
    {{ slogan }}
  </h2>
</template>

<script>
export default {
  name: 'Slogan',
  computed: {
    slogan () {
      return (this.$store.state.theme.config.psiMode) ? 'O seu guia para a tomada de decisão clínica de saúde mental.' : 'O seu guia para a tomada de decisão clínica.'
    }
  }
}
</script>
