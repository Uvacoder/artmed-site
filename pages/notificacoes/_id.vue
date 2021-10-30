<template>
  <CommomContent body="ContentBody" />
</template>

<script>
export default {
  name: 'NotificaçõesId',
  // auth: false,
  components: {},
  directives: {},
  props: {},
  async asyncData (context) {
    await Promise.all([
      await context.store.dispatch('notifications/load', context.route.params.id)
    ])
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  mounted () {},
  methods: {}
}
</script>

<style lang="sass" scoped></style>
