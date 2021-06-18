<template>
  <div class="empty-section-container">
    <h4 class="empty-section">
      <CommomSvgIcon :svg="icon" class-style="empty-section__icon" />
      <span class="empty-section__label">{{ text }}</span>
    </h4>
  </div>
</template>

<script>
export default {
  name: 'EmptySection',
  props: {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .empty-section-container {
    @include rem("padding", 40px 20px);
  }

  .empty-section {
    font-weight: 600;
    @include font-computed(18px, 30px);
    color: #A5A5A5;
    display: flex;
    margin-bottom: 0;

    &__icon {
      @include rem("margin-right", 20px);

      &::v-deep svg {
        @include rem("width", 30px);
        @include rem("height", 30px);
        path {
          fill: #A5A5A5;
        }
      }
    }
  }
</style>
