<template>
  <div class="highlights">
    <CommomSectionTitleLink title="Destaques" />
    <HomeBigBoxCarousel :items="items" />
  </div>
</template>

<script>
export default {
  name: 'Highlights',
  data () {
    return {
      items: [
        { image: 'https://picsum.photos/600/300/?image=25', title: 'Item 0', to: '#' },
        { image: 'https://picsum.photos/600/300/?image=25', title: 'Processo de cuidar no curso da vida 1', to: '#' },
        { image: 'https://picsum.photos/600/300/?image=25', title: 'Processo de cuidar no curso da vida Processo 2', to: '#' },
        { image: 'https://picsum.photos/600/300/?image=25', title: 'Processo de cuidar no curso da vida 3', to: '#' },
        { image: 'https://picsum.photos/600/300/?image=25', title: 'Processo de cuidar no curso da vida 4', to: '#' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .highlights {
    position: relative;
    padding-bottom: 24px;
    margin-bottom: 12px;

    &::v-deep .vue-horizontal-list {
      display: flex;
      position: relative;
    }

    &::v-deep .vhl-navigation {
      margin-top: 6px;
    }

    &::v-deep .vhl-item {
      padding-top: 0px;
      padding-bottom: 0px;

      & .big-box-carousel__link {
        text-decoration: none;

        &:hover,
        &:active,
        &.active {
          & .big-box-carousel__card {
            & .card-body {
              & .card-title {
                color: #00A589;
              }
            }
          }
        }
      }

      & .big-box-carousel__item,
      & .big-box-carousel__card {
        height: 100%;
      }

      & .big-box-carousel__card {
        background: #FAFBFC;
        border-radius: 4px;
        max-width: 290px;
        @include media-breakpoint-up(xs) {
          max-width: none;
        }

        & .card-body {
          padding: 10px 12px;

          & .card-title {
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            /* Light/contrast color */
            color: #343434;
          }
        }
      }
    }
  }
</style>
