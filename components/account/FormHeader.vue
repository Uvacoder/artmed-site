<template>
  <div class="form-header">
    <h1 class="form-header__title">
      {{ title }}
    </h1>
    <h2 class="form-header__subtitle">
      {{ subtitle }}
      <NuxtLink v-if="to != null" :to="to">
        {{ toLabel }}
      </NuxtLink>
    </h2>
  </div>
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
      color: #343434;
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
