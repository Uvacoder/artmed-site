<template>
  <div class="content-most-accessed">
    <CommomSectionTitleLink title="Conteúdos mais acessados por você" />
    <HomeEmptySection
      v-if="false"
      icon="icon_history"
      text="Quando você acessa um conteúdo várias vezes, ele ficará nessa lista."
    />
    <HomeSmallBoxCarousel v-else :items="items" />
  </div>
</template>

<script>
export default {
  name: 'ContentMostAccessed',
  data () {
    return {
      items: [
        { icon: 'icon_calc', title: 'Cálculo de Massa Corporal', to: '#' },
        { icon: 'icon_calc', title: 'Cálculo de Massa Corporal', to: '#' },
        { icon: 'icon_calc', title: 'Cálculo de Massa Corporal', to: '#' },
        { icon: 'icon_calc', title: 'Cálculo de Massa Corporal', to: '#' },
        { icon: 'icon_calc', title: 'Cálculo de Massa Corporal', to: '#' },
        { icon: 'icon_calc', title: 'Cálculo de Massa Corporal', to: '#' },
        { icon: 'icon_calc', title: 'Cálculo de Massa Corporal', to: '#' },
        { icon: 'icon_calc', title: 'Cálculo de Massa Corporal', to: '#' },
        { icon: 'icon_calc', title: 'Cálculo de Massa Corporal', to: '#' },
        { icon: 'icon_calc', title: 'Cálculo de Massa Corporal', to: '#' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-most-accessed {
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

      & .small-box-carousel__link {
        text-decoration: none;

        &:hover,
        &:active,
        &.active {
          & .small-box-carousel__card {
            & .card-body {
              & .card-text {
                color: #00A589;
              }
            }
          }

          & .small-box-carousel__icon {
            * {
              fill: #00A589;
            }
          }
        }
      }

      & .small-box-carousel__item,
      & .small-box-carousel__card {
        height: 100%;
      }

      & .small-box-carousel__card {
        background: #FAFBFC;
        border-radius: 6px;
        max-width: 130px;
        @include media-breakpoint-up(xs) {
          max-width: none;
        }

        & .card-body {
          padding: 12px;

          & .card-text {
            text-align: center;
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            /* Light/contrast color */
            color: #343434;

            .small-box-carousel__icon {
              display: block;
              margin-top: 26px;
              margin-bottom: 20px;
            }
          }
        }
      }
    }
  }
</style>
