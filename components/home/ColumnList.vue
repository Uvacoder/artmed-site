<template>
  <ul class="row no-gutters columm-list">
    <li v-for="n in 8" :key="n" class="col-md-6 columm-list__item">
      <NuxtLink
        :key="index"
        class="columm-list__item__link"
        to="#"
      >
        <CommomSvgIcon svg="icon_search" class="columm-list__item__link__icon" />
        <span class="columm-list__item__link__label">Diagnóstico por imagem</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ColummList'
}
</script>

<style lang="scss" scoped>
  .columm-list {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      a {
        background: #FAFBFC;
        display: block;
        font-family: DIN 2014;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        display: flex;
        align-items: center;
        /* Light/contrast color */
        color: #343434;
        border: 1px solid #D8D8D8;
        border-top: none;
        cursor: pointer;
        padding: 20px 14px;

        &:hover {
          text-decoration: none;
          color: #00A589;
          background: darken(#FAFBFC, 2.5%);
          &::v-deep .columm-list__item__link__icon {
            * {
              fill: #00A589;
            }
          }
        }
      }

      &:nth-of-type(2n+1) {
        @include media-breakpoint-up(md) {
          a {
            border-right: none;
          }
        }
      }

      &:first-child {
        a {
          border-top: 1px solid #D8D8D8;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;

          @include media-breakpoint-up(md) {
            border-top-right-radius: 0;
          }
        }
      }

      &:nth-of-type(2) {
        a {
          @include media-breakpoint-up(md) {
            border-top: 1px solid #D8D8D8;
            border-top-right-radius: 6px;
          }
        }
      }

      &:nth-of-type(7) {
        a {
          @include media-breakpoint-up(md) {
            border-bottom-left-radius: 6px;
          }
        }
      }

      &:last-child {
        a {
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;

          @include media-breakpoint-up(md) {
            border-bottom-left-radius: 0;
          }
        }
      }
    }

    &__item__link__icon {
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      width: 22px;
      height: 22px;
      margin-right: 14px;
    }
  }
</style>
