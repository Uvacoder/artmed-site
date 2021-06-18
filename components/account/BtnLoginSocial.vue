<template>
  <b-button
    block
    :href="link"
    rel="external nofollow"
    class="btn-login-social"
    :class="classMod"
  >
    <b-img
      :src="file"
      :alt="alt"
      height="20"
      width="auto"
    />
  </b-button>
</template>

<script>
export default {
  name: 'BtnLoginSocial',
  props: {
    isClin: {
      type: Boolean,
      default: false
    },
    social: {
      type: String,
      default: 'Facebook',
      required: true
    }
  },
  data () {
    return {
      filename: ''
    }
  },
  computed: {
    link () {
      const link = {
        Facebook: '#facebook',
        Google: '#google',
        Apple: '#apple'
      }
      return link[this.social]
    },
    classMod () {
      const classMod = {
        Facebook: 'btn-login-social--facebook',
        Google: 'btn-login-social--google',
        Apple: 'btn-login-social--apple'
      }
      return classMod[this.social]
    },
    file () {
      const store = {
        Facebook: 'facebook',
        Google: 'google',
        Apple: 'apple'
      }
      return require(`~/assets/images/icon_${store[this.social]}.svg`)
    },
    alt () {
      const store = {
        Facebook: 'Login com o Facebook',
        Google: 'Login com o Google',
        Apple: 'Login com a Apple'
      }
      return `${store[this.social]}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-login-social {
    @include rem("border-radius", 6px);
    @include rem("margin-top", 6px);
    @include rem("margin-bottom", 6px);

    @include rem("padding-top", 12px);
    @include rem("padding-bottom", 14px);

    &--facebook {
      background-color: #366FDB;
      border-color: #366FDB;

      &:not(:disabled):not(.disabled):active,
      &:not(:disabled):not(.disabled).active,
      .show > &.dropdown-toggle {
        background-color: darken(#366FDB, 5%);
        border-color: darken(#366FDB, 5%);
      }
    }

    &--google {
      background-color: #ffffff;
      border-color: #000000;

      &:not(:disabled):not(.disabled):active,
      &:not(:disabled):not(.disabled).active,
      .show > &.dropdown-toggle {
        background-color: darken(#ffffff, 5%);
        border-color: lighten(#000000, 5%);
      }
    }

    &--apple {
      background-color: #000000;
      border-color: #000000;

      &:not(:disabled):not(.disabled):active,
      &:not(:disabled):not(.disabled).active,
      .show > &.dropdown-toggle {
        background-color: lighten(#000000, 5%);
        border-color: lighten(#000000, 5%);
      }
    }
  }
</style>
