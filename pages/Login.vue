<template>
  <b-container fluid class="pl-0 pr-0">
    <b-row no-gutters>
      <b-col col lg="4" class="d-none d-lg-block">
        <LoginLeftSide/>
      </b-col>
      <b-col cols="12" lg="8">
        <Logo/>
        <LoginForm/>
        <GroupBtnLoginSocial/>
        <Slogan/>
        <GroupBtnStore/>
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
