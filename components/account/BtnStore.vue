<template>
  <b-link
    :href="link"
    target="_BLANK"
    class="btnStore"
    :class="classMod"
  >
    <b-img
      :src="file"
      :alt="alt"
      fluid
      @error="setFallbackImageUrl"
    />
  </b-link>
</template>

<script>
export default {
  name: 'BtnStore',
  props: {
    isClin: {
      type: Boolean,
      default: false
    },
    appleStore: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      filename: ''
    }
  },
  computed: {
    link () {
      const link = (this.appleStore) ? '#apple' : '#google'
      return link
    },
    classMod () {
      const classMod = (this.appleStore) ? 'btnStore--apple' : 'btnStore--google'
      return classMod
    },
    file () {
      const store = (this.appleStore) ? 'apple' : 'google'

      this.setFilename(`btn_store_${store}`)
      return require(`~/assets/images/btn_store_${store}.svg`)
    },
    alt () {
      const store = (this.appleStore) ? 'disponível na App Store' : 'disponível no Google Play'
      const app = (this.isClin) ? 'CLIN' : 'PSI'
      return `Artmed+${app} está ${store}`
    }
  },
  methods: {
    setFilename (name) {
      this.filename = name
    },
    setFallbackImageUrl (event) {
      event.target.src = require(`~/assets/images/${this.filename + '.png'}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .btnStore {
    display: inline-block;
    @include rem("padding-top", 5px);
  }
</style>
