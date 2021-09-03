<template>
  <main class="container content__body">
    <ContentBodyHeader
      property-label="Interações Medicamentosas"
    />
    <b-row>
      <DrugsCalc />
    </b-row>
  </main>
</template>

<script>
export default {
  name: 'Body'
}
</script>

<style lang="scss" scoped>
  .content__body {
    @include rem("margin-top", 12px);
  }
</style>
