<template>
  <b-form
    class="search"
    novalidate
    @submit.stop.prevent="onSubmit"
  >
    <b-form-group
      id="query-group"
      class="search__input-group"
      :class="{'search__input-group--open': hasResult}"
      label-for="email"
      :state="validateState('query')"
    >
      <b-input-group>
        <b-input-group-prepend>
          <b-button
            type="submit"
            class="search__btn search__btn--search"
          >
            <CommomSvgIcon svg="icon_search" />
          </b-button>
        </b-input-group-prepend>

        <b-form-input
          id="query"
          v-model="form.query"
          type="text"
          class="search__form-control"
          placeholder="Pesquisar"
          :state="validateState('query')"
          required
        />

        <b-input-group-append v-if="showClear">
          <b-button
            class="search__btn search__btn--clear"
            @click="clear()"
          >
            <b-icon icon="x" />
          </b-button>
        </b-input-group-append>
      </b-input-group>

      <div v-if="hasResult" class="search__sugestion-container">
        <div class="search__sugestion-box">
          <div class="search__sugestion-box__divider" />
          <ul class="search__sugestion-box__list" role="listbox">
            <li class="search__sugestion-box__list-item" role="presentation">
              <div class="search__sugestion-box__list-item-container">
                <div class="search__sugestion-box__list-item-icon" />
                <div class="search__sugestion-box__list-item-text-container" role="option">
                  <div class="search__sugestion-box__list-item-text">
                    <span class="search__sugestion-box__list-item-text__line search__sugestion-box__list-item-text__line--one">Diabetes melito</span>
                    <span class="search__sugestion-box__list-item-text__line search__sugestion-box__list-item-text__line--two">Outras doenças e psicofármacos</span>
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
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Search',
  mixins: [validationMixin],
  props: {},
  data () {
    return {
      form: {
        query: ''
      },
      hasResult: false,
      showClear: false
    }
  },
  computed: {},
  watch: {
    'form.query': {
      handler (val, oldVal) {
        if (val !== null) {
          this.hasResult = this.showClear = (val.length > 0)
        } else {
          this.hasResult = this.showClear = false
        }
      },
      deep: true
    }
  },
  validations: {
    form: {
      query: {
        required
      }
    }
  },
  methods: {
    validateState (field) {
      const { $dirty, $error } = this.$v.form[field]
      return $dirty ? !$error : null
    },
    clear () {
      this.form = {
        query: null
      }

      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    onSubmit () {
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }

      alert('Form submitted!')
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
      border-radius: 12px;
    }

    &__input-group {
      border: 1.4px solid #00A589;
      box-shadow: none;
      border-radius: 12px;
      z-index: 3;
      @include rem("height", 66px);
      margin: 0 auto;

      &--open {
        border-bottom: none;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    &__btn {
      font-size: 16.8px;
      @include rem("padding", 19px 12px 19px 20px);

      &--search {
        &::v-deep svg {
          width: 22px;
          height: 22px;
          path {
            fill: #00A589;
          }
        }
      }

      &--clear {
        font-size: 32px;
        @include rem("padding", 9px 8px 5px 8px);
      }
    }

    &__form-control {
      background-color: transparent;
      color: #00A589;
      word-wrap: break-word;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      margin-top: 6px;
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
      margin-top: -1px;
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
      border-radius: 0 0 12px 12px;
      padding-bottom: 4px;
      overflow: hidden;
      left: -1px;
      position: relative;
      border-top: none;

      &__divider {
        border: 1px solid #00A589;
        margin: 0 20px 0 20px;
      }

      &__list {
        margin: 0;
        padding: 0;
        list-style: none;
        flex: auto;
        padding-bottom: 8px;
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
          margin: 0 20px 0 14px;
          padding-top: 12px;
        }

        &-icon {
          -webkit-mask-image: url("~/assets/images/icon_search.svg");
          mask-image: url("~/assets/images/icon_search.svg");
          background-color: #000000;
          background-size: 22px;
          min-height: 22px;
          min-width: 22px;
          height: 22px;
          width: 22px;
          display: flex;
          align-items: center;
          margin: 0 13px 0 6px;
        }

        &-text-container {
          display: flex;
          flex: auto;
          flex-direction: column;
          min-width: 0;
          padding: 6px 0;
        }

        &-text {
          display: flex;
          font-size: 16px;
          color: #212121;
          flex: auto;
          word-break: break-word;
          flex-direction: column;
          padding-right: 8px;

          &__line {
            display: flex;

            &--one {
              font-weight: 600;
              font-size: 25px;
              line-height: 32px;
            }
            &--two {
              font-size: 16px;
              line-height: 20px;
            }
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
