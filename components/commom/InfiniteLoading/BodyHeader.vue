<template>
  <header class="body-header">
    <h1
      class="body-header__title"
      :class="{
        'body-header__title--has-img': img,
        'body-header__title--has-img--dark': imgDark
      }"
      :style="(img) ? { backgroundImage: `url(${img})` } : undefined"
    >
      {{ title }}
    </h1>
  </header>
</template>

<script>
export default {
  name: 'BodyHeader',
  props: {
    img: {
      type: String,
      default: undefined,
      required: false
    },
    imgDark: {
      type: String,
      default: undefined,
      required: false
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .body-header {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;

    &__title {
      display: flex;
      align-items: center;
      background-size: 0;
      font-family: DIN 2014;
      font-style: normal;
      font-weight: 600;
      font-size: 30px;
      line-height: 38px;
      display: flex;
      align-items: center;
      margin-bottom: 0px;

      color: #1D1D1D;

      &::before {
        background-image: inherit;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }

      &::before {
        @include rem("min-width", 50px);
        @include rem("height", 50px);
      }

      &--has-img,
      &--has-img--dark {
        &::before {
          content: '';
        }
      }
    }
  }
</style>
