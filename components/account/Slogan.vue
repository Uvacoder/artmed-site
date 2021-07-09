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
      return this.$store.state.theme.config.appSlogan
    }
  }
}
</script>
