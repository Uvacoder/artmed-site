<template>
  <div class="section-title-link">
    <h3
      class="section-title-link__title"
    >
      {{ title }}
    </h3>
    <NuxtLink
      v-if="to && showLink"
      class="section-title-link__link"
      :to="to"
    >
      {{ link }}
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'SectionTitleLink',
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
    showLink: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .section-title-link {
    display: flex;
    justify-content: space-between;
    @include rem("margin-bottom", 16px);
    @include rem("padding-top", 16px);

    &__title,
    &__link {
      margin: 0;
      font-weight: 600;
      @include font-computed(18px, 23px);
    }

    &__title {
      color: #343434;
    }

    &__link {
      color: #00A589;
    }
  }
</style>
