<template>
  <header class="form-header">
    <h3 class="form-header__title">
      {{ title }}
    </h3>
    <h4 class="form-header__subtitle">
      {{ subtitle }}
      <NuxtLink v-if="to != null" :to="to">
        {{ toLabel }}
      </NuxtLink>
    </h4>
  </header>
</template>

<script>
export default {
  name: 'FormHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    to: {
      type: String,
      default: null
    },
    toLabel: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-header {
    &__title {
      font-weight: bold;
      color: #000000;
      @include font-computed(24px, 32px);
    }

    &__subtitle {
      color: var(--contrast);
      font-weight: normal;
      @include font-computed(18px, 24px);
      @include rem("margin-bottom", 18px);

      a {
        @include account-link();
      }
    }

    @include media-breakpoint-up(lg) {
      &__title {
        @include font-computed(40px, 52px);
      }

      &__subtitle {
        @include font-computed(20px, 26px);
      }
    }
  }
</style>
