<template>
  <section>
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      class="new-section__link"
      :to="{ name: 'noticias-id', params: { id: item.objectId } }"
    >
      <b-card no-body class="overflow-hidden new-section">
        <b-row no-gutters>
          <b-col>
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
            <b-card-body :title="item.title" class="new-section__title">
              <b-card-text class="new-section__intro">
                {{ item.intro }}
              </b-card-text>
            </b-card-body>
          </b-col>
          <b-col v-if="item.gallery.length > 0" lg="6">
            <b-card-img
              :src="item.gallery[0].url"
              alt="Image"
              class="rounded-0"
            />
          </b-col>
        </b-row>
      </b-card>
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
    @include rem("margin-bottom", 16px);

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
      @include rem("margin", 1.25rem 1.25rem 0 1.25rem);
      @include rem("padding-bottom", 0.5rem);
      border-bottom: 1px solid #ccc;

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
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 100%;
      @include rem("height", 234px);
    }
  }
</style>
