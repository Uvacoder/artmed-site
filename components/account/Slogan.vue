<template>
  <p class="slogan">
    {{ slogan }}
  </p>
</template>

<script>
export default {
  name: 'Slogan',
  computed: {
    slogan () {
      return (this.$store.state.theme.psiMode) ? 'O seu guia para a tomada de decisão clínica de saúde mental.' : 'O seu guia para a tomada de decisão clínica.'
    }
  }
}
</script>
