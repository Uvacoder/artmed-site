<template>
  <div class="footer">
    <CommomFooterNav />
    <div class="footer-info">
      <span class="footer-info__line footer-info__line--one">Organizadores</span>
      <span class="footer-info__line footer-info__line--two"><b>Stephen Doral Stefani - Elvino Barros</b></span>
      <span class="footer-info__line footer-info__line--three">Parceiros</span>
      <b-img :src="require(`~/assets/images/marca_telessauders.png`)" width="150" height="114" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
  .footer-info {
    margin-bottom: 50px;
    text-align: center;
    font-size: 14px;
    line-height: 18px;
    color: #343434;

    &__line {
      display: block;

      &--two {
        margin-bottom: 15px;
      }

      &--three {
        margin-bottom: 25px;
      }
    }

    img {
      display: block;
      margin: auto;
    }
  }
</style>
