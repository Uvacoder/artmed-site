<template>
  <div class="group-btn-store">
    <h3 class="group-btn-store__title">
      Baixe agora o app!
    </h3>
    <div class="group-btn-store__group">
      <AccountBtnStore :apple-store="false" />
      <AccountBtnStore />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupBtnStore'
}
</script>

<style lang="scss" scoped>
  .group-btn-store {
    &__title {
      @include rem("margin-bottom", 6px);
    }
  }
</style>
