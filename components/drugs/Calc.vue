<template>
  <b-col cols="12" lg="4" offset-lg="4" class="calc">
    <div class="calc__header-container">
      <h2
        v-if="selectedSubstances.length < 1"
      >
        Para verificar as interações, selecione de 2 a 6 substâncias
      </h2>
      <div
        v-else
        class="calc__header-container__selected-substances"
      >
        <b-list-group>
          <b-list-group-item v-for="(substance, index) in selectedSubstances" :key="index">
            {{ substance.name }}
            <b-button
              variant="link"
              @click.prevent="removeDrug(substance)"
            >
              <CommomSvgIcon svg="icon_close" />
            </b-button>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>

    <!-- Modal -->
    <b-button
      v-b-modal.drug-select
      class="calc__btn calc__btn--modal"
      :class="{
        'calc__btn--hasSelected': hasSelected
      }"
      variant="primary"
      block
    >
      Selecione substâncias
    </b-button>

    <b-button
      v-if="showSearchBtn"
      class="calc__btn calc__btn--submit"
      variant="primary"
      block
      @click.prevent="loadDrugGuide(selected)"
    >
      Pesquisar interações
    </b-button>

    <!-- result -->
    <div v-if="searched && !isRequesting" class="calc__result">
      <div class="calc__result__header">
        {{ DrugGuideline.length }} resultados encontrados
        <b-button
          v-b-modal.drug-select
          variant="link"
          @click.prevent="unsellectAll()"
        >
          Nova pesquisa
        </b-button>
      </div>
      <p v-if="DrugGuideline.length <= 0">
        Não foram encontrados resultados para essa combinação de medicamentos em nossa base de dados. Pode ser que não haja interação entre esses medicamentos ou que ela ainda não tenha sido atualizada em nosso aplicativo.
      </p>
      <div
        v-else
        class="calc__result__drugs-guideline"
      >
        <b-list-group>
          <b-list-group-item
            v-for="(drug, index) in DrugGuideline"
            :key="index"
            :href="`/conteudo/${drug.id}`"
          >
            {{ drug.substance1.name }}
            <CommomSvgIcon svg="icon_arrows" />
            {{ drug.substance2.name }}
            <CommomSvgIcon v-if="drug.premium" svg="icon_locked" />
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>

    <b-modal
      id="drug-select"
      title="Selecionar substâncias"
      class="search"
      centered
      footer-class="modal-footer--custom"
    >
      <!-- search -->
      <template #default>
        <b-form-group
          id="query-group"
          class="search__input-group"
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
                class="search__btn search__input-group__btn search__input-group__btn--search"
                type="submit"
                variant="none"
                @click.prevent="load({ searchTerm: $v.searchTerm.$model, loadMore: false })"
              >
                Buscar
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <div class="calc__substances-container">
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="Substances"
              :aria-describedby="ariaDescribedby"
              name="flavour-1"
              value-field="id"
              text-field="name"
              stacked
            />
          </b-form-group>
          <infinite-loading v-if="Substances.length >= 20" @infinite="infiniteHandler" />
        </div>
      </template>
      <template #modal-footer="{ ok }">
        <b-button size="lg" variant="outline-success" class="btn--cancel" block @click.prevent="unsellectAll()">
          Limpar
        </b-button>
        <b-button size="lg" variant="success" block @click="ok()">
          Próximo
        </b-button>
      </template>
    </b-modal>
  </b-col>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { minLength } from 'vuelidate/lib/validators'

export default {
  name: 'DrugsCalc',
  mixins: [validationMixin],
  data () {
    return {
      showClear: false,
      selected: [],
      selectedSubstances: [],
      searched: false
    }
  },
  async fetch () {
    await this.load({ searchTerm: '', loadMore: false })
  },
  computed: {
    searchTerm: {
      get () {
        return this.$store.state.substances.searchTerm
      },
      set (value) {
        this.$store.commit('substances/SET_SEARCHTERM', value)
      }
    },
    Substances () {
      return this.$store.state.substances.items
    },
    isRequesting () {
      return this.$store.state.drugGuideline.isRequesting
    },
    DrugGuideline () {
      return this.$store.state.drugGuideline.items
    },
    hasSelected () {
      return (this.selected.length > 0)
    },
    showSearchBtn () {
      return (this.selected.length > 1 && this.selected.length <= 6)
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
    selected: {
      handler (val, oldVal) {
        for (let index = 0; index < this.$store.state.substances.items.length; index++) {
          if (val.includes(this.$store.state.substances.items[index].id)) {
            if (!this.selectedSubstances.includes(this.$store.state.substances.items[index])) {
              this.selectedSubstances.push(this.$store.state.substances.items[index])
            }
          }
        }
      },
      deep: true
    }
  },
  beforeDestroy () {
    if (this.$route.name !== 'busca' && this.$route.name !== 'busca-slug') {
      this.clear()
    }
  },
  validations: {
    searchTerm: {
      minLength: minLength(1)
    }
  },
  methods: {
    clear () {
      this.$store.commit('substances/SET_SEARCHTERM', '')
    },
    ...mapActions([
      'substances/load',
      'drugGuideline/load'
    ]),
    ...mapActions({
      load: 'substances/load',
      loadDrugGuideline: 'drugGuideline/load'
    }),
    infiniteHandler ($state) {
      this.load({ searchTerm: '', loadMore: true })
        .then((data) => {
          if (data.length > 0) {
            $state.loaded()
          } else {
            $state.complete()
          }
        })
    },
    loadDrugGuide (ids) {
      this.loadDrugGuideline({ ids })
        .then(() => {
          this.searched = true
        })
    },
    removeDrug (drug) {
      const index = this.selected.indexOf(drug.id)
      if (index > -1) {
        this.selectedSubstances.splice(index, 1)
        this.selected.splice(index, 1)
      }
    },
    unsellectAll () {
      this.selected = []
      this.selectedSubstances = []
    }
  }
}
</script>

<style lang="scss">
  #drug-select {
    .custom-checkbox {
      @include background-border();
      border-radius: 0;
      border-bottom: none;
      font-weight: 600;
      @include rem("font-size", 16px, 20px);
      background: var(--gray-1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include rem("min-height", 64px);
      padding-right: 1.5rem;
      width: 100%;
      &:first-child {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
      }
      &:last-child {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
      }
      .custom-control-label {
        width: calc(100% - 1.5rem);
        &::before,
        &::after {
          top: 0;
          left: auto;
          right: -1.5rem;
          width: 1.5625rem;
          height: 1.5625rem;
          border-radius: 1.5625rem;
        }

        &::before {
          border: 2px solid var(--three);
        }
      }
    }
    .custom-control-input:checked ~ .custom-control-label::before {
      color: #fff;
      border-color: var(--three);
      background-color: var(--three);
    }
    .modal-footer--custom {
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      .btn {
        @include account-form-btn();
        margin: 0;
        &:first-child {
          margin-right: 4px
        }
        &:last-child {
          margin-left: 4px
        }
        &--cancel {
          color: var(--three-darken);
          background-color: var(--background-fill);
          border-color: var(--three-darken);
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .calc {
    @include rem("margin-top", 60px);
    &__header-container {
      h2 {
        font-weight: normal;
        @include rem("font-size", 20px, 26px);
        color: var(--contrast);
        @include rem("margin-bottom", 16px);
      }
      &__selected-substances {
        .list-group-item {
          font-weight: 600;
          @include rem("font-size", 16px, 20px);
          background: var(--gray-1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:last-child {
            border-bottom: none;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
      }
    }
    &__btn {
      @include account-form-btn();
      &--modal {
        @include background-border();
        color: var(--three);
      }
      &--hasSelected {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
      &:focus, &.focus {
        box-shadow: none;
      }
    }
    &__result {
      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btn-link {
          padding-right: 0;
          color: var(--three);
        }
      }
      &__drugs-guideline {
        .list-group-item {
          font-weight: 600;
          @include rem("font-size", 16px, 20px);
          background: var(--gray-1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    &__substances-container {
      overflow-y: scroll;
      max-height: 50vh;
    }
  }
  .search {
    position: relative;

    &__input-group,
    &__form-control,
    &__btn {
      color: var(--three);
      background: var(--background-fill);
      border: none;
      @include rem("border-radius", 12px);
    }

    &__input-group {
      border: 1.4px solid var(--three);
      box-shadow: none;
      @include rem("border-radius", 12px);
      z-index: 3;
      @include rem("height", 50px);
      margin: 0 auto;
      @include rem("margin-bottom", 12px);

      .input-group {
        align-items: center;
      }

      &__btn {
        @include rem("font-size", 16.8px);
        @include rem("margin", 0px 12px);

        &--icon,
        &--clear {
          padding: 0;
        }

        &--icon {
          &::v-deep svg {
            @include rem("width", 22px);
            @include rem("height", 22px);
            path {
              fill: var(--three);
            }
          }
        }

        &--clear {
          @include rem("max-height", 47px);
          @include rem("font-size", 32px);
          @include rem("margin", 0px 12px);
        }

        &--search {
          color: var(--background-fill);
          background: var(--three);
          margin: 0;
          @include rem("padding", 12px);
          @include rem("right", -1.5px);
          @include rem("top", -1px);
        }
      }
    }

    &__form-control {
      background-color: transparent;
      color: var(--three);
      word-wrap: break-word;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      font-weight: 600;
      padding: 0;
      height: 48px;
      @include font-computed(25px, 32px);

      &::-webkit-input-placeholder { /* Edge */
        color: var(--three);
        font-weight: 600;
        @include font-computed(25px, 38px);
      }

      &:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: var(--three);
        font-weight: 600;
        @include font-computed(25px, 38px);
      }

      &::placeholder {
        color: var(--three);
        font-weight: 600;
        @include font-computed(25px, 38px);
      }

      &:focus {
        box-shadow: none;
      }
    }
  }
</style>
