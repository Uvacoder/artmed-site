<template>
  <div class="loginLeftSide" :style="{ backgroundImage: `url (${backgroundImage})` }">
    <Logo :is-dark="true" size="xl" />
    <Slogan />
    <GroupBtnStore />
  </div>
</template>

<script>
export default {
  name: 'LoginLeftSide',
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
      return require(`~/assets/images/${app}_login_background.jpg`)
    }
  },
  methods: {}
}
</script>

<style lang="scss">
  .loginLeftSide {
    position: relative;

    & .logo {}
    & .slogan {
      width: 332px;
      height: 114px;
      left: 30px;
      bottom: 505px;

      font-family: DIN 2014;
      font-style: normal;
      font-weight: normal;
      font-size: 30px;
      line-height: 38px;
      display: flex;
      align-items: flex-end;

      /* Dark/contrast color */

      color: #FCFBFB;
    }
  }
</style>
