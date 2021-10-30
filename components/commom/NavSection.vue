<template>
  <nav class="nav-section">
    <template v-for="(item, index) in items">
      <span
        v-if="isNotification && item.value === ''"
        :key="index"
        class="nav-section__link"
        :class="{
          'nav-section__link--has-img': $helpers.resolvePath(item, propertyImage, null),
          'nav-section__link--has-img': $helpers.resolvePath(item, propertyCategory, null),
          'nav-section__link--locked': $helpers.resolvePath(item, propertyLocked, null),
          'nav-section__link--chevron': propertyChevron
        }"
        :style="[
          (propertyImage) ? { backgroundImage: `url(${$helpers.normalizeImageUrl($helpers.resolvePath(item, propertyImage, null))})` } : undefined,
          (propertyCategory) ? { backgroundImage: `url(${$helpers.getImageCategory($helpers.resolvePath(item, propertyCategory, null))})` } : undefined
        ]"
      >
        <span class="nav-section__link__label">
          <span class="nav-section__link__label--main">
            {{ $helpers.resolvePath(item, propertyLabel, null) }}
          </span>
          <span v-if="propertySubLabel" class="nav-section__link__label--sub">
            {{ $helpers.getElapsedInterval($helpers.resolvePath(item, propertySubLabel, null)) }}
          </span>
        </span>
      </span>
      <NuxtLink
        v-else
        :key="index"
        class="nav-section__link"
        :class="{
          'nav-section__link--has-img': $helpers.resolvePath(item, propertyImage, null),
          'nav-section__link--has-img': $helpers.resolvePath(item, propertyCategory, null),
          'nav-section__link--locked': $helpers.resolvePath(item, propertyLocked, null),
          'nav-section__link--chevron': propertyChevron
        }"
        :style="[
          (propertyImage) ? { backgroundImage: `url(${$helpers.normalizeImageUrl($helpers.resolvePath(item, propertyImage, null))})` } : undefined,
          (propertyCategory) ? { backgroundImage: `url(${$helpers.getImageCategory($helpers.resolvePath(item, propertyCategory, null))})` } : undefined
        ]"
        :to="(!propertyRawLink) ? $helpers.getContentRoute(item, isNotification) : item.to"
        :target="(propertyTargetLink && (item.target !== undefined)) ? item.target : undefined"
      >
        <span class="nav-section__link__label">
          <span class="nav-section__link__label--main">
            {{ $helpers.resolvePath(item, propertyLabel, null) }}
          </span>
          <span v-if="propertySubLabel" class="nav-section__link__label--sub">
            {{ $helpers.getElapsedInterval($helpers.resolvePath(item, propertySubLabel, null)) }}
          </span>
        </span>
      </NuxtLink>
    </template>
  </nav>
</template>

<script>
export default {
  name: 'NavSection',
  props: {
    isNotification: {
      type: Boolean,
      default: false,
      required: false
    },
    items: {
      type: Array,
      required: true
    },
    propertyImage: {
      type: String,
      default: undefined,
      required: false
    },
    propertyCategory: {
      type: String,
      default: undefined,
      required: false
    },
    propertyLabel: {
      type: String,
      required: true
    },
    propertySubLabel: {
      type: String,
      default: undefined,
      required: false
    },
    propertyLocked: {
      type: String,
      default: undefined,
      required: false
    },
    propertyChevron: {
      type: Boolean,
      default: false,
      required: false
    },
    propertyRawLink: {
      type: Boolean,
      default: false,
      required: false
    },
    propertyTargetLink: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-section {
    display: flex;
    flex-direction: column;

    &__link {
      display: flex;
      align-items: center;
      @include background-border();
      @include rem("margin-bottom", 8px);
      @include rem("padding", 10px 15px);
      background-size: 0;

      &::before,
      &::after {
        background-image: inherit;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }

      &::before {
        @include rem("min-width", 34px);
        @include rem("height", 34px);
        @include rem("margin-right", 10px);
      }

      &::after {
        margin-left: auto;
        background-image: url('~/assets/images/icon_locked.svg');
        @include rem("min-width", 13px);
        @include rem("height", 16px);
      }

      &--has-img {
        &::before {
          content: '';
        }
      }

      &--locked,
      &--chevron {
        &::after {
          content: '';
        }
      }

      &--chevron {
        &::after {
          background-image: url('~/assets/images/chevron_right.svg');
        }
      }

      &__label {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        @include rem("margin-right", 10px);

        &--main,
        &--sub {
          font-weight: 600;
        }

        &--main {
          @include font-computed(20px, 26px);
          color: var(--contrast);
        }

        &--sub {
          @include font-computed(12px, 12px, -0.3px);
          @include rem("margin-top", 2.5px);
          @include rem("margin-right", 10px);
          color: var(--gray-4);
        }
      }

      &:hover,
      &:active,
      &.active {
        color: var(--three);
        text-decoration: none;
        & .nav-section__link__label--main {
          color: var(--three);
          text-decoration: underline;
        }
      }
    }
  }
</style>
