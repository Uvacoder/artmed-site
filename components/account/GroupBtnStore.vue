<template>
  <div class="groupBtnStore">
    <h3 class="groupBtnStore-title">
      Baixe agora o app!
    </h3>
    <div class="groupBtnStore-group">
      <AccountBtnStore :apple-store="false" />
      <AccountBtnStore />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupBtnStore',
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
  .groupBtnStore {
    &-title {
      @include rem("margin-bottom", 5px);
    }
  }
</style>
