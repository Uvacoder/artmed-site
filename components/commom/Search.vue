<template>
  <b-form
    class="search"
    novalidate
    @submit.stop.prevent="goToSearch"
  >
    <b-form-group
      id="query-group"
      class="search__input-group"
      :class="{ 'search__input-group--small': !isIndex, 'search__input-group--open': (hasResult && hasFocus) }"
      label-for="email"
    >
      <b-input-group>
        <b-input-group-prepend>
          <CommomSvgIcon svg="icon_search" class="search__btn search__input-group__btn search__input-group__btn--icon" />
        </b-input-group-prepend>

        <b-form-input
          id="query"
          v-model="$v.searchTerm.$model"
          type="text"
          class="search__form-control"
          placeholder="Pesquisar"
          debounce="300"
          aria-autocomplete="both"
          aria-haspopup="false"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          aria-label="Pesquisar"
          required
          @focus="hasFocus = true"
        />

        <b-input-group-append>
          <b-button
            v-if="showClear"
            variant="none"
            class="search__btn search__input-group__btn search__input-group__btn--clear"
            @click="clear()"
          >
            <b-icon icon="x" />
          </b-button>
          <b-button
            v-if="!isIndex"
            class="search__btn search__input-group__btn search__input-group__btn--search"
            type="submit"
            variant="none"
          >
            Buscar
          </b-button>
        </b-input-group-append>
      </b-input-group>

      <div v-if="hasResult && hasFocus" class="search__sugestion-container">
        <div class="search__sugestion-box">
          <div class="search__sugestion-box__divider" />
          <ul class="search__sugestion-box__list" role="listbox">
            <li
              v-for="(typeAhead, index) in typeAheadList"
              :key="index"
              class="search__sugestion-box__list-item"
              role="presentation"
            >
              <div class="search__sugestion-box__list-item-container">
                <div class="search__sugestion-box__list-item-icon" />
                <div class="search__sugestion-box__list-item-text-container" role="option">
                  <div class="search__sugestion-box__list-item-text">
                    <NuxtLink
                      class="search__sugestion-box__list-item-text__line search__sugestion-box__list-item-text__line--one"
                      :to="{ name: 'busca-slug', params: { slug: $helpers.formatToSlug(typeAhead) } }"
                    >
                      {{ typeAhead }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </b-form-group>
  </b-form>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Search',
  mixins: [validationMixin],
  props: {
    isIndex: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hasFocus: false,
      hasResult: false,
      showClear: false
    }
  },
  computed: {
    searchTerm: {
      get () {
        return this.$store.state.search.searchTerm
      },
      set (value) {
        this.$store.commit('search/SET_SEARCHTERM', value)
      }
    },
    typeAheadList () {
      return this.$store.state.search.typeAheadList
    }
  },
  watch: {
    searchTerm: {
      handler (val, oldVal) {
        if (val !== null && val !== '') {
          const hasSearchTerm = (val.length > 0)
          this.showClear = hasSearchTerm
          if (hasSearchTerm && this.hasFocus) { this.loadTypeAhead(val) }
        } else {
          this.clear()
          this.showClear = false
        }
      },
      deep: true
    },
    hasFocus: {
      handler (val, oldVal) {
        if (val !== null && val !== '') {
          const hasSearchTerm = (this.searchTerm.length > 0)
          if (val && hasSearchTerm) { this.loadTypeAhead(this.searchTerm) }
        }
      },
      deep: true
    },
    typeAheadList: {
      handler (val, oldVal) {
        this.hasResult = (val !== null && val.length > 0 && this.searchTerm.length > 0)
      },
      deep: true
    }
  },
  validations: {
    searchTerm: {
      minLength: minLength(1)
    }
  },
  beforeDestroy () {
    if (this.$route.name !== 'busca' && this.$route.name !== 'busca-slug') {
      this.clear()
    }
  },
  methods: {
    clear () {
      this.$store.commit('search/SET_TYPEAHEADLIST', [])
      this.$store.commit('search/SET_SEARCHTERM', '')
    },
    ...mapActions({
      loadTypeAhead: 'search/loadTypeAhead'
    }),
    goToSearch () {
      if (this.searchTerm === undefined || this.searchTerm === '') { return }
      let route = { name: 'busca-slug', params: { slug: this.$helpers.formatToSlug(this.searchTerm) } }
      if (this.$router.currentRoute.name === 'categorias-id') {
        route = { name: 'busca-slug', params: { slug: this.$helpers.formatToSlug(this.searchTerm) }, query: { categorias: this.$router.currentRoute.params.id } }
      }
      this.$router.push(route)
      // let route = { name: 'busca-slug', params: { slug: this.$helpers.formatToSlug(this.searchTerm) } }
      // if (this.searchTerm === undefined || this.searchTerm === '') {
      //   route = { name: 'busca' }
      // }
      // let route = { name: 'busca-slug', params: { slug: this.$helpers.formatToSlug(this.searchTerm) } }
      // if (this.searchTerm === undefined || this.searchTerm === '') {
      //   route = { name: 'busca' }
      // }
      // this.$router.push(route)
    }
  }
}
</script>

<style lang="scss" scoped>
  .search {
    position: relative;

    &__input-group,
    &__form-control,
    &__btn {
      color: #00A589;
      background: #FFFFFF;
      border: none;
      @include rem("border-radius", 12px);
    }

    &__input-group {
      border: 1.4px solid #00A589;
      box-shadow: none;
      @include rem("border-radius", 12px);
      z-index: 3;
      @include rem("height", 66px);
      margin: 0 auto;

      &__btn {
        @include rem("font-size", 16.8px);
        @include rem("margin", 19px 12px 19px 20px);

        &--icon,
        &--clear {
          padding: 0;
        }

        &--icon {
          &::v-deep svg {
            @include rem("width", 22px);
            @include rem("height", 22px);
            path {
              fill: #00A589;
            }
          }
        }

        &--clear {
          @include rem("font-size", 32px);
          @include rem("margin", 9px 8px 5px 8px);
        }
      }

      &--small {
        @include rem("height", 56px);

        & .search__input-group__btn--icon {
          @include rem("margin", 15px 12px 13px 20px);
        }

        & .search__input-group__btn--clear {
          @include rem("margin", 4px 8px 2px 8px);
        }

        & .search__input-group__btn--search {
          color: #FFFFFF;
          background: #00A589;
          margin: 0;
          @include rem("border-top-right-radius", 10px);
          @include rem("border-bottom-right-radius", 10px);
          @include rem("padding-left", 28px);
          @include rem("padding-right", 28px);
        }

        & .search__form-control {
          @include rem("margin-top", 2px);
        }
      }

      &--open {
        border-bottom: none;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    &__form-control {
      background-color: transparent;
      color: #00A589;
      word-wrap: break-word;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      @include rem("margin-top", 6px);
      font-weight: 600;
      @include font-computed(25px, 32px);

      &::-webkit-input-placeholder { /* Edge */
        color: #00A589;
        font-weight: 600;
        @include font-computed(25px, 38px);
      }

      &:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #00A589;
        font-weight: 600;
        @include font-computed(25px, 38px);
      }

      &::placeholder {
        color: #00A589;
        font-weight: 600;
        @include font-computed(25px, 38px);
      }

      &:focus {
        box-shadow: none;
      }
    }

    &__sugestion-container {
      position: absolute;
      width: 100%;
      text-align: left;
      @include rem("margin-top", -1px);
      z-index: 3;
      cursor: default;
      -webkit-user-select: none;
    }

    &__sugestion-box {
      background: #fff;
      display: flex;
      flex-direction: column;
      list-style-type: none;
      margin: 0;
      padding: 0;
      border: 1.4px solid #00A589;
      @include rem("border-radius", 0 0 12px 12px);
      @include rem("padding-bottom", 4px);
      overflow: hidden;
      @include rem("left", -1px);
      position: relative;
      border-top: none;

      &__divider {
        border: 1px solid #00A589;
        @include rem("margin", 0 20px 0 20px);
      }

      &__list {
        margin: 0;
        padding: 0;
        list-style: none;
        flex: auto;
        @include rem("padding-bottom", 8px);
      }

      &__list-item {
        display: flex;
        align-items: center;
        min-width: 0;
        padding: 0;

        &-container {
          flex: auto;
          display: flex;
          align-items: center;
          @include rem("margin", 0 20px 0 14px);
          @include rem("padding-top", 12px);
        }

        &-icon {
          -webkit-mask-image: url("~/assets/images/icon_search.svg");
          mask-image: url("~/assets/images/icon_search.svg");
          background-color: #000000;
          @include rem("background-size", 22px);
          @include rem("min-height", 22px);
          @include rem("min-width", 22px);
          @include rem("height", 22px);
          @include rem("width", 22px);
          display: flex;
          align-items: center;
          @include rem("margin", 0 13px 0 6px);
        }

        &-text-container {
          display: flex;
          flex: auto;
          flex-direction: column;
          min-width: 0;
          @include rem("padding", 6px 0);
        }

        &-text {
          display: flex;
          flex: auto;
          flex-direction: column;
          @include rem("padding-right", 8px);

          &__line {
            font-weight: 600;
            word-break: break-word;
            color: #212121;
            @include font-computed(25px, 32px);
          }
        }

        &:hover {
          cursor: pointer;

          * {
            color: #00A589;
          }

          .search__sugestion-box__list-item-icon {
            background-color: #00A589;
          }
        }
      }
    }
  }
</style>
