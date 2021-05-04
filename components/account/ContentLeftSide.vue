<template>
  <div class="contentLeftSide" :style="{ backgroundImage: `${backgroundImage}` }">
    <CommomLogo :is-dark="true" size="xl" />
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
  data () {
    return {}
  },
  computed: {
    backgroundImage () {
      const app = (this.isClin) ? 'clin' : 'psi'
      return `url("${require(`~/assets/images/${app}_login_background.jpg`)}")`
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .contentLeftSide {
    position: relative;
    min-height: 100vh;

    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: darken(#00A589, 10%);

    &::v-deep .logo,
    &::v-deep .slogan,
    &::v-deep .groupBtnStore {
      @include rem("margin-left", 28px);
    }

    &::v-deep .logo {
      @include rem("margin-top", 64px);
      @include rem("padding-right", 78px);
    }

    &::v-deep .slogan {
      color: #FCFBFB;

      font-style: normal;
      font-weight: normal;

      @include font-computed(30px, 38px);
      @include rem("margin-top", 40px);
      @include rem("max-width", 332px);

    }

    &::v-deep .groupBtnStore {
      position: absolute;
      margin-top: auto;
      top: auto;
      bottom: 0px;

      @include rem("margin-bottom", 50px);
      @include rem("padding-right", 56px);

      &-title {
        color: #FFFFFF;
        font-style: normal;
        font-weight: 600;

        @include font-computed(20px, 26px);
      }
    }
  }
</style>
