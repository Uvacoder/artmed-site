<template>
  <section class="small-box-carousel-container">
    <CommomSectionTitleLink title="Conteúdos mais acessados por você" />
    <HomeEmptySection
      v-if="items.length <= 0"
      icon="icon_history"
      text="Quando você acessa um conteúdo várias vezes, ele ficará nessa lista."
    />
    <HomeSmallBoxCarousel v-else :items="items" property="content.name" image="content.category.image" />
  </section>
</template>

<script>
export default {
  name: 'SmallBoxCarouselContainer',
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: String,
      default: null,
      required: false
    },
    link: {
      type: String,
      default: null,
      required: false
    },
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    property: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: null,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .small-box-carousel-container {
    position: relative;
    // @include rem("padding-bottom", 24px);
    // @include rem("margin-bottom", 12px);

    &::v-deep .vhl-navigation {
      @include rem("margin-top", 6px);
    }

    &::v-deep .vhl-container {
      margin-bottom: 0;
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
              & .card-title {
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
        background: var(--gray-1);
        @include rem("border-radius", 6px);
        @include rem("max-width", 130px);
        @include media-breakpoint-up(xs) {
          max-width: none;
        }

        & img {
          display: block;
          margin: auto;
          @include rem("max-width", 60px);
          @include rem("max-height", 60px);
          @include rem("margin-top", 12px);
        }

        & .card-body {
          @include rem("padding", 12px);

          & .card-title {
            text-align: center;
            font-weight: 600;
            @include font-computed(16px, 20px);
            /* Light/contrast color */
            color: #343434;
            margin: 0;
          }
        }
      }
    }
  }
</style>
