<template>
  <section>
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      class="new-section__link"
      :to="{ name: 'noticias-id', params: { id: item.objectId } }"
    >
      <article
        class="new-section"
      >
        <header class="new-section__header">
          <b-avatar
            variant="none"
            :text="$helpers.initialName(item.postedBy.name)"
          />
          <div>
            <div class="new-section__header__posted">
              {{ item.postedBy.name }}
            </div>
            <div class="new-section__header__posted new-section__header__posted--sub">
              {{ $helpers.getElapsedInterval(item.createdAt) }}
            </div>
          </div>
        </header>
        <h1 class="new-section__title">
          {{ item.title }}
        </h1>
        <p class="new-section__intro">
          {{ item.intro }}
        </p>
        <!-- <div v-if="item.gallery.length > 0" :style="{ backgroundImage: `url(${item.gallery[0].url})` }" class="new-section__image" /> -->
      </article>
    </NuxtLink>
  </section>
</template>

<script>
export default {
  name: 'Articles',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .new-section {
    @include background-border();
    @include rem("margin-bottom", 8px);
    @include rem("padding", 14px 16px);

    &__link {
      text-decoration: none;
      &:hover {
        * {
          text-decoration: none;
        }
        .new-section__title,
        .new-section__intro {
          color: var(--four)
        }
      }
    }
    &__header {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      @include rem("margin-bottom", 14px);

      .b-avatar {
        @include rem("width", 30px);
        @include rem("height", 30px);
        color: var(--background-fill);
        background-color: var(--four);
        @include rem("margin-right", 6px);
      }
      &__posted {
        font-weight: 600;
        @include font-computed(14px, 14px, -0.3px);
        color: var(--contrast);
        margin: 0;
        &--sub {
          @include font-computed(12px, 12px, -0.3px);
          color: var(--gray-4);
        }
      }
    }
    &__title,
    &__intro {
      font-weight: 700;
      @include font-computed(16px, 24px, -0.3px);
      color: var(--contrast);
    }
    &__intro {
      font-weight: 400;
    }
    &__image {
      width: 100%;
      @include rem("height", 100px);
    }
  }
</style>
