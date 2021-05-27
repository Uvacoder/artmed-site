<template>
  <div class="section-title-link">
    <h3
      class="section-title-link__title"
    >
      {{ title }}
    </h3>
    <NuxtLink
      v-if="to"
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .section-title-link {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-top: 16px;

    &__title,
    &__link {
      font-family: DIN 2014;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 23px;
      margin: 0;
    }

    &__title {
      color: #343434;
    }

    &__link {
      color: #00A589;
    }
  }
</style>
