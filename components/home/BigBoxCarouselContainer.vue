<template>
  <section class="big-box-carousel-container">
    <CommomSectionTitleLink :title="title" />
    <HomeBigBoxCarousel :items="items" />
  </section>
</template>

<script>
export default {
  name: 'BigBoxCarouselContainer',
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .big-box-carousel-container {
    position: relative;
    @include rem("padding-bottom", 24px);
    @include rem("margin-bottom", 12px);

    &::v-deep .vhl-navigation {
      @include rem("margin-top", 6px);
    }

    &::v-deep .vhl-item {
      padding-top: 0px;
      padding-bottom: 0px;
      @include rem("max-width", 290px);

      @include media-breakpoint-up(md) {
        max-width: none;
      }

      & .big-box-carousel__link {
        text-decoration: none;

        &:hover,
        &:active,
        &.active {
          & .big-box-carousel__card {
            & .card-body {
              & .card-title {
                color: var(--three);
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
        background: var(--gray-1);
        @include rem("border-radius", 4px);
        @include rem("max-width", 290px);
        @include media-breakpoint-up(xs) {
          max-width: none;
        }

        img {
          @include rem("min-height", 152px);
          @include rem("max-height", 152px);

          @include media-breakpoint-up(lg) {
            @include rem("min-height", 212px);
            @include rem("max-height", 212px);
            aspect-ratio: 120 / 70;
          }
        }

        & .card-body {
          @include rem("padding", 10px 12px);

          & .card-title {
            font-weight: 600;
            @include font-computed(16px, 20px);
            /* Light/contrast color */
            color: var(--contrast);
          }
        }
      }
    }
  }
</style>
