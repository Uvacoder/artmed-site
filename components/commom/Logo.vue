<template>
  <b-img
    class="logo"
    :src="file"
    :alt="alt"
    fluid
    @error="setFallbackImageUrl"
  />
</template>

<script>
export default {
  name: 'Logo',
  props: {
    isClin: {
      type: Boolean,
      default: false
    },
    isDark: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'sm'
    }
  },
  data () {
    return {
      filename: ''
    }
  },
  computed: {
    file () {
      const app = (this.isClin) ? 'clin' : 'psi'
      const theme = (this.isDark) ? 'dark' : 'light'
      const size = this.size

      this.setFilename(`${app}_${theme}_${size}`)
      return require(`~/assets/images/${app}_${theme}.svg`)
    },
    alt () {
      const app = (this.isClin) ? 'CLIN' : 'PSI'
      return `Artmed+${app}`
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
