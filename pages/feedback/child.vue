<template>
  <div ref="cardContainer" style="padding: 20px; border: 1px solid black">
    I'm a card for property {{ $route.params }}
  </div>
</template>

<script>
export default {
  mounted () {
    // Attach listeners for handling clicks outside the card, while preventing propagation
    // of clicks in the cards
    this.$refs.cardContainer.addEventListener('click', this.stopPropagation)
    document.body.addEventListener('click', this.closeModal)
  },

  beforeDestroy () {
    // Make sure to cleanup!
    this.$refs.cardContainer.removeEventListener('click', this.stopPropagation)
    document.body.removeEventListener('click', this.closeModal)
  },

  methods: {
    // Prevent clicking inside the card from triggering the closeModal
    stopPropagation (e) {
      e.stopPropagation()
    },
    closeModal () {
      // You can also do this.$router.push('/') to preserve the history
      this.$router.replace('/')
    }
  }
}
</script>
