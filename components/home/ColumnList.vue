<template>
  <ul class="row no-gutters columm-list">
    <li v-for="(item, index) in items" :key="index" class="col-md-6 columm-list__item">
      <NuxtLink
        class="columm-list__item__link"
        :to="
          (isSearch) ? `/busca/${$helpers.resolvePath(item, to, '')}` : `/conteudo/${$helpers.resolvePath(item, to, '')}`
        "
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
    isSearch: {
      type: Boolean,
      default: false,
      required: false
    },
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
      background: var(--gray-1);
      border: 1px solid var(--gray-3);
      border-top: none;

      a {
        display: block;
        font-weight: 600;
        @include font-computed(16px, 20px);
        display: flex;
        align-items: center;
        /* Light/contrast color */
        color: var(--contrast);
        // border: 1px solid var(--gray-3);
        // border-top: none;
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

      @include media-breakpoint-up(md) {
        border-left: none;
      }

      &:first-child {
        border-top: 1px solid var(--gray-3);
        @include rem("border-top-left-radius", 6px);
        @include rem("border-top-right-radius", 6px);

        @include media-breakpoint-up(md) {
          border-top-right-radius: 0px;
        }

        &:only-child {
          @include rem("border-radius", 6px);
        }
      }

      &:first-child + li {
        @include media-breakpoint-up(md) {
          border-top: 1px solid var(--gray-3);
          @include rem("border-top-right-radius", 6px);
        }
      }

      &:nth-child(2n+1) {
        @include media-breakpoint-up(md) {
          border-left: 1px solid var(--gray-3);
        }
      }

      &:nth-last-child(-n+2) {
        @include media-breakpoint-up(md) {
          @include media-breakpoint-up(md) {
            &:nth-child(even) {
              border-bottom-left-radius: 0px;
              @include rem("border-bottom-right-radius", 6px);
            }
            &:nth-child(odd) {
              @include rem("border-bottom-left-radius", 6px);
              border-bottom-right-radius: 0px;
            }
          }
        }
      }

      &:last-child {
        @include rem("border-bottom-left-radius", 6px);
        @include rem("border-bottom-right-radius", 6px);
        @include media-breakpoint-up(md) {
          &:nth-child(even) {
            border-bottom-left-radius: 0px;
          }
          &:nth-child(odd) {
            @include rem("border-bottom-left-radius", 6px);
            @include rem("border-bottom-right-radius", 6px);
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
