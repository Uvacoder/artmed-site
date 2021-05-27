<template>
  <div class="empty-section-container">
    <h4 class="empty-section">
      <CommomSvgIcon :svg="icon" class="empty-section__icon" />
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
    padding: 40px 20px;
  }

  .empty-section {
    font-weight: 600;
    font-size: 18px;
    line-height: 30px;
    color: #A5A5A5;
    display: flex;
    margin-bottom: 0;

    &__icon {
      margin-right: 20px;

      &::v-deep svg {
        width: 30px;
        height: 30px;
        path {
          fill: #A5A5A5;
        }
      }
    }
  }
</style>
