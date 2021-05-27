<template>
  <span v-safe-html="svgRenderized" :class="classRenderized" />
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    svg: {
      type: String,
      default: ''
    },
    class: {
      type: String,
      default: ''
    }
  },
  computed: {
    svgRenderized () {
      return require(`~/assets/images/${this.svg}.svg?raw`)
    },
    classRenderized () {
      return this.class
    }
  }
}
</script>
