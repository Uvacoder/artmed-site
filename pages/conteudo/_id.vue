<template>
  <CommomContent body="ContentBody" />
</template>

<script>
// verificar se é premium e redirecionar para assinatura
export default {
  name: 'ConteudoId',
  auth: false,
  components: {},
  directives: {},
  props: {},
  async asyncData (context) {
    await Promise.all([
      await context.store.dispatch('content/load', context.route.params.id)
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
