<template>
  <b-container fluid class="login">
    <b-row>
      <b-col col lg="4" class="d-none d-lg-block">
        <AccountContentLeftSide />
      </b-col>
      <b-col cols="12" lg="4" offset-lg="2" align-self="center" align-h="center">
        <AccountContentRightSide action="forgetPassword" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Cadastro',
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
      @include rem("margin-left", -15px);
      @include rem("margin-right", -15px);
    }
  }
</style>
