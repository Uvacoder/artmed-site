<template>
  <footer class="container footer">
    <CommomFooterNav />
    <div class="footer-info">
      <span class="footer-info__line footer-info__line--one">Organizadores</span>
      <span class="footer-info__line footer-info__line--two"><b>Stephen Doral Stefani - Elvino Barros</b></span>
      <span class="footer-info__line footer-info__line--three">Parceiros</span>
      <b-img :src="require(`~/assets/images/marca_telessauders.png`)" width="150" height="114" />
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
  .footer-info {
    @include rem("margin-bottom", 50px);
    @include font-computed(14px, 18px);
    text-align: center;
    color: var(--contrast);

    &__line {
      display: block;

      &--two {
        @include rem("margin-bottom", 15px);
      }

      &--three {
        @include rem("margin-bottom", 25px);
      }
    }

    img {
      display: block;
      margin: auto;
    }
  }
</style>
