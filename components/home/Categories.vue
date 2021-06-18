<template>
  <nav class="categories">
    <h3 class="categories__title">
      Categorias
    </h3>
    <ul class="row no-gutters categories__list">
      <li v-for="(item, index) in items" :key="index" class="col categories__item">
        <a class="categories__item__link">
          <span class="categories__item__link__img-container">
            <b-img :src="$helpers.normalizeImageUrl(item.image)" fluid :alt="item.name" />
          </span>
          <span class="categories__item__link__label">{{ item.name }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Categories',
  computed: {
    items () {
      return this.$store.state.categories.items
    }
  }
}
</script>

<style lang="scss" scoped>
  .categories {
    @include rem("margin-top", 80px);

    &__title {
      color: #343434;
      font-weight: 600;
      @include font-computed(18px, 23px);
    }

    &__list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &__item {
      margin: 0;
      min-width: calc(50vw - 15px);
      max-width: calc(50vw - 15px);

      &__link {
        display: flex;
        align-items: center;
        height: 100%;
        background: #FFFFFF;
        border: 1px solid #D8D8D8;
        border-top: none;
        border-left: none;
        cursor: pointer;

        word-break: break-word;
        color: #343434;
        font-weight: 600;
        @include font-computed(12px, 16px);
        @include rem("padding", 3px);

        &:hover {
          background: darken(#FAFBFC, 2.5%);
          text-decoration: none;
          color: #00A589;
        }

        &__img-container {
          display: flex;
          height: max-content;
          @include rem("max-width", 30px);
          @include rem("margin-right", 5px);
          @include media-breakpoint-up(md) {
            @include rem("max-width", 40px);
          }
          @include media-breakpoint-up(xl) {
            @include rem("max-width", 60px);
          }
        }

        &__label {
          display: flex;
          align-items: center;
        }

        @include media-breakpoint-up(sm) {
          @include rem("padding", 12px);
          @include font-computed(16px, 20px);
        }
      }

      &:nth-of-type(2n+1) {
        @media (max-width: 575px) {
          a {
            border-left: 1px solid #D8D8D8;
          }
        }
      }

      &:nth-of-type(3n+1) {
        @media (min-width: 576px) and (max-width: 991px) {
          a {
            border-left: 1px solid #D8D8D8;
          }
        }
      }

      &:nth-of-type(5n+1) {
        @media (min-width: 991px) {
          a {
            border-left: 1px solid #D8D8D8;
          }
        }
      }

      &:first-child,
      &:nth-of-type(2) {
        a {
          border-top: 1px solid #D8D8D8;
        }
      }

      &:nth-of-type(3) {
        @include media-breakpoint-up(sm) {
          a {
            border-top: 1px solid #D8D8D8;
          }
        }
      }

      &:nth-of-type(4),
      &:nth-of-type(5) {
        @include media-breakpoint-up(lg) {
          a {
            border-top: 1px solid #D8D8D8;
          }
        }
      }

      @include media-breakpoint-up(sm) {
        min-width: calc(32vw - 15px);
        max-width: calc(32vw - 15px);
      }

      @media (min-width: 579px) {
        min-width: calc(39.2% - 30px);
        max-width: calc(39.2% - 30px);
      }

      @include media-breakpoint-up(md) {
        min-width: calc(37.65% - 30px);
        max-width: calc(37.65% - 30px);
      }

      @include media-breakpoint-up(lg) {
        min-width: calc(23.2% - 30px);
        max-width: calc(23.2% - 30px);
      }

      @include media-breakpoint-up(xl) {
        @include rem("min-width", 222px);
        @include rem("max-width", 222px);
      }
    }
  }
</style>
