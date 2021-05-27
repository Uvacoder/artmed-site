<template>
  <div
    class="content-left-side"
    :style="{ backgroundImage: `${backgroundImage}` }"
  >
    <CommomLogo forceDark />
    <AccountSlogan />
    <AccountGroupBtnStore />
  </div>
</template>

<script>
export default {
  name: 'ContentLeftSide',
  props: {
    isClin: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    backgroundImage () {
      const app = (this.$store.state.theme.psiMode) ? 'psi' : 'clin'
      return `url("${require(`~/assets/images/${app}_login_background.jpg`)}")`
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-left-side {
    position: relative;
    min-height: 100vh;

    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: darken(#00A589, 10%);

    &::v-deep .logo,
    &::v-deep .slogan,
    &::v-deep .group-btn-store {
      @include rem("margin-left", 28px);
    }

    &::v-deep .logo {
      display: inline-block;
      @include rem("margin-top", 64px);
      @include rem("margin-right", 78px);
    }

    &::v-deep .slogan {
      color: #FCFBFB;
      @include font-computed(30px, 38px);
      @include rem("margin-top", 40px);
      @include rem("max-width", 332px);
    }

    &::v-deep .group-btn-store {
      position: absolute;
      bottom: 0px;
      @include rem("margin-bottom", 50px);
      @include rem("padding-right", 56px);

      &__title {
        color: #FFFFFF;
        font-weight: 600;
        @include font-computed(20px, 26px);
      }
    }
  }
</style>
