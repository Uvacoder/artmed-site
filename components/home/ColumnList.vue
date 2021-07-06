<template>
  <ul class="row no-gutters columm-list">
    <li v-for="(item, index) in items" :key="index" class="col-md-6 columm-list__item">
      <NuxtLink
        class="columm-list__item__link"
        :to="`/conteudo/${$helpers.formatToSlug($helpers.resolvePath(item, to, ''))}`"
      >
        <CommomSvgIcon v-if="icon" :svg="icon" class-style="columm-list__item__link__icon" />
        <img v-else :src="$helpers.normalizeImageUrl($helpers.resolvePath(item, image, null))" class="columm-list__item__link__icon columm-list__item__link__icon--image">
        <span class="columm-list__item__link__label">{{ $helpers.resolvePath(item, property, '') }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ColummList',
  props: {
    items: {
      type: Array,
      required: true
    },
    to: {
      type: String,
      default: null,
      required: false
    },
    property: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: null,
      required: false
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
  .columm-list {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      a {
        background: var(--gray-1);
        display: block;
        font-weight: 600;
        @include font-computed(16px, 20px);
        display: flex;
        align-items: center;
        /* Light/contrast color */
        color: var(--contrast);
        border: 1px solid var(--gray-3);
        border-top: none;
        cursor: pointer;
        @include rem("padding", 20px 14px);

        &:hover {
          text-decoration: none;
          color: var(--three);
          // background: darken(var(--gray-1), 2.5%);
          background: var(--gray-1);
          &::v-deep .columm-list__item__link__icon {
            * {
              fill: var(--three);
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
          border-top: 1px solid var(--gray-3);
          @include rem("border-top-left-radius", 6px);
          @include rem("border-top-right-radius", 6px);

          @include media-breakpoint-up(md) {
            border-top-right-radius: 0;
          }
        }
      }

      &:nth-of-type(2) {
        a {
          @include media-breakpoint-up(md) {
            border-top: 1px solid var(--gray-3);
            @include rem("border-top-right-radius", 6px);
          }
        }
      }

      &:nth-of-type(7) {
        a {
          @include media-breakpoint-up(md) {
            @include rem("border-bottom-left-radius", 6px);
          }
        }
      }

      &:last-child {
        a {
          @include rem("border-bottom-left-radius", 6px);
          @include rem("border-bottom-right-radius", 6px);

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
      @include rem("width", 22px);
      @include rem("height", 22px);
      @include rem("margin-right", 14px);

      &--image {
        @include rem("width", 40px);
        @include rem("height", 40px);
        @include rem("margin-right", 4px);
      }
    }
  }
</style>
