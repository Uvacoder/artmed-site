<template>
  <header class="body-header" :class="{ 'body-header--post': isPost }">
    <template v-if="isPost">
      <b-avatar :text="$helpers.initialName(propertyPostedBy)" />
      <div class="body-header__title-subtitle">
        <h1
          class="body-header__title"
        >
          {{ propertyLabel }}
        </h1>
        <span class="body-header__title--sub">
          {{ $helpers.getElapsedInterval(propertySubLabel) }}
        </span>
      </div>
    </template>
    <template v-else>
      <h1 class="body-header__title">
        {{ propertyLabel }}
      </h1>
      <b-button-toolbar>
        <b-button-group>
          <b-button
            variant="link"
            class="body-header__favorite"
            :class="{ 'body-header__favorite--yes': isFavorite }"
            @click="favorite(isFavorite)"
          >
            Favoritar
          </b-button>
        </b-button-group>
      </b-button-toolbar>
    </template>
  </header>
</template>

<script>
// TODO: precisa informar que está logado para favoritar (criar modal com alert que redirecione par ao login)
import { mapActions } from 'vuex'
export default {
  name: 'BodyHeader',
  props: {
    isPost: {
      type: Boolean,
      default: false,
      required: false
    },
    propertyPostedBy: {
      type: String,
      default: undefined,
      required: false
    },
    propertyLabel: {
      type: String,
      required: true
    },
    propertySubLabel: {
      type: String,
      default: undefined,
      required: false
    },
    isFavorite: {
      type: String,
      default: null,
      required: false
    }
  },
  methods: {
    ...mapActions([
      'content/favoriteHandler'
    ]),
    ...mapActions({
      favoriteHandler: 'content/favoriteHandler'
    }),
    async favorite (state) {
      await this.favoriteHandler({ favoriteState: state, contentId: this.$route.params.id })
    }
  }
}
</script>

<style lang="scss" scoped>
  .body-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #D8D8D8;
    @include rem("margin-bottom", 12px);
    @include rem("padding-bottom", 12px);

    &__title {
      display: flex;
      align-items: center;
      background-size: 0;
      font-weight: 600;
      @include font-computed(30px, 38px, -0.3px);
      @include rem("margin-bottom", 0px);
      color: #1D1D1D;
    }

    &__favorite {
      display:block;
      width: 100%;
      height: 100%;
      @include rem("min-width", 18px);
      @include rem("height", 20px);
      text-indent: -999em;
      overflow: hidden;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      background-image: url('~/assets/images/icon_bookmark_no.svg');

      &:focus,
      &.focus {
        box-shadow: none;
      }

      &--yes {
        background-image: url('~/assets/images/icon_bookmark_yes.svg');
      }
    }

    &--post {
      justify-content: flex-start;

      .b-avatar {
        @include rem("width", 42px);
        @include rem("height", 42px);
        @include rem("margin-right", 10px);
      }

      .body-header__title {
        @include font-computed(18px, 18px, -0.3px);
        &--sub {
          font-weight: normal;
          @include font-computed(14px, 14px, -0.3px);
          color: #9B9B9B;
        }
      }
    }
  }
</style>
