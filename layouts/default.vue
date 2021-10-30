<template>
  <Nuxt keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
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
      return `theme--${this.$store.state.theme.config.app}`
    },
    color () {
      return this.$store.state.theme.config.darkMode ? 'dark sys--dark' : 'light sys--light'
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

<style lang="scss">
:root {
  --font-family-sans-serif: #{inspect($font-family-sans-serif)};
  // --background-fill: #{inspect($color-background-fill-light)};
  // --gray-1: #{inspect($color-gray-1-light)};
  // --gray-2: #{inspect($color-gray-2-light)};
  // --gray-3: #{inspect($color-gray-3-light)};
  // --gray-4: #{inspect($color-gray-4-light)};
  // --contrast: #{inspect($color-contrast-light)};

  // --one-four: #{inspect($color-one-four)};
  // --two-three: #{inspect($color-two-three)};
  // --three-two: #{inspect($color-three-two)};
  // --four-one: #{inspect($color-four-one)};
  // --five: #{inspect($color-five-light)};
  // --degrade-one: #{inspect($color-degrade-one-light)};
  // --degrade-two: #{inspect($color-degrade-two-light)};

  --main-bg-color: %bg_color;
  --main-txt-color: %txt_color;
  --main-color: %app_color;
  --input-bg-color: %input_bg_color;
  --input-stroke-color: %input_stroke_color;
}

body {
  font-family: $font-family-base;
}

@media (prefers-color-scheme: dark) {
  :root {
    // --background-fill: #{inspect($color-background-fill-dark)};
    // --gray-1: #{inspect($color-gray-1-dark)};
    // --gray-2: #{inspect($color-gray-2-dark)};
    // --gray-3: #{inspect($color-gray-3-dark)};
    // --gray-4: #{inspect($color-gray-4-dark)};
    // --contrast: #{inspect($color-contrast-dark)};

    // --five: #{inspect($color-five-dark)};
    // --degrade-one: #{inspect($color-degrade-one-dark)};
    // --degrade-two: #{inspect($color-degrade-two-dark)};

    --main-bg-color: %bg_dark_color;
    --main-txt-color: %txt_dark_color;
    --main-color: %app_dark_color;
    --input-bg-color: %input_bg_dark_color;
    --input-stroke-color: %input_stroke_dark_color;
  }
}
</style>
