<template>
  <b-container fluid class="login">
    <b-row>
      <b-col col lg="4" class="d-none d-lg-block">
        <AccountContentLeftSide />
      </b-col>
      <b-col
        class="login-rightCol"
        cols="12"
        lg="4"
        offset-lg="2"
        align-self="center"
        align-h="center"
      >
        <AccountContentRightSide action="login" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Login',
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
  .login {
    @include media-breakpoint-up(lg) {
      padding: 0;
    }
  }
</style>
