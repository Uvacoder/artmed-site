<template>
  <div>
    <b-form-group class="filter-categories">
      <template #label>
        <h3 class="filter-categories__label">
          Filtro:
        </h3>
        <b-form-checkbox
          v-model="allSelected"
          aria-describedby="categorias"
          aria-controls="categorias"
          button
          button-variant="none"
          class="filter-categories__btn--all"
          @change="toggleAll"
        >
          Todos
        </b-form-checkbox>
      </template>

      <template #default="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="SelectedCategories"
          :aria-describedby="ariaDescribedby"
          class="btn-group-toggle btn-group-vertical bv-no-focus-ring filter-categories__btn-options"
          stacked
          buttons
          button-variant="none"
        >
          <b-form-checkbox
            v-for="option in Categories"
            :key="option.id"
            :value="option.id"
            :style="option.style"
          >
            {{ option.name }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </template>
    </b-form-group>
    {{ SelectedCategories }}
  </div>
</template>

<script>
export default {
  name: 'FilterCategories',
  // props: {
  //   isNotification: {
  //     type: Boolean,
  //     default: false,
  //     required: false
  //   },
  //   items: {
  //     type: Array,
  //     required: true
  //   },
  //   propertyImage: {
  //     type: String,
  //     default: undefined,
  //     required: false
  //   },
  //   propertyLabel: {
  //     type: String,
  //     required: true
  //   },
  //   propertySubLabel: {
  //     type: String,
  //     default: undefined,
  //     required: false
  //   },
  //   propertyLocked: {
  //     type: String,
  //     default: undefined,
  //     required: false
  //   },
  //   propertyChevron: {
  //     type: Boolean,
  //     default: false,
  //     required: false
  //   }
  // },
  data () {
    return {
      allSelected: false
    }
  },
  computed: {
    SelectedCategories: {
      get () {
        return this.$store.state.search.selectedCategories
      },
      set (value) {
        this.$store.commit('search/SET_SELECTEDCATEGORIES', value)
      }
    },
    Categories () {
      return this.$store.state.categories.items.map((x) => {
        const elm = {
          id: x.id,
          name: x.name,
          style: { backgroundImage: `url(${this.$helpers.normalizeImageUrl(x.image)})` }
        }
        return elm
      })
    }
  },
  watch: {
    SelectedCategories (newValue, oldValue) {
      if (newValue.length === 0) {
        this.allSelected = false
        const query = Object.assign({}, this.$router.query)
        delete query.param
        this.$router.replace({ query })
      } else if (newValue.length === this.Categories.length) {
        this.allSelected = true
        this.$router.push({ query: { ...this.$router.query, categorias: this.SelectedCategories.join(',') } })
      } else {
        this.allSelected = false
        this.$router.push({ query: { ...this.$router.query, categorias: this.SelectedCategories.join(',') } })
      }
      this.$emit('filtered')
    }
  },
  methods: {
    toggleAll (checked) {
      this.SelectedCategories = checked ? this.Categories.slice().map((x) => { return x.id }) : []
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-categories {
    display: flex;
    flex-direction: column;

    &__label {
      font-weight: 600;
      @include font-computed(18px, 41px);
      color: #343434;
      margin-bottom: 0;
    }

    &__btn--all {
      width: 100%;
      &::v-deep > label {
        @include background-border();
        @include rem("padding-top", 8px);
        @include rem("padding-bottom", 8px);
        display: flex;
        text-align: left;
        align-items: center;
        font-weight: 600;
        @include font-computed(16px, 34px);
        color: #343434;

        &:focus,
        &.focus,
        &.active {
          box-shadow: none;
        }
      }
    }

    &__btn-options {
      &::v-deep > label {
        @include background-border();
        position: relative;
        display: flex;
        text-align: left;
        align-items: center;
        background-size: 0;
        font-weight: 600;
        @include font-computed(16px, 20px);
        color: #343434;
        @include rem("padding-top", 8px);
        @include rem("padding-bottom", 8px);
        @include rem("margin-right", 2.5px);

        &::before,
        &::after {
          content: '';
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        &::before {
          background-image: inherit;
          @include rem("min-width", 34px);
          @include rem("height", 34px);
        }

        &::after {
          margin-left: auto;
          @include rem("min-width", 19px);
          @include rem("height", 15px);
        }

        &:focus,
        &.focus,
        &.active {
          box-shadow: none;
        }

        &.active {
          &::after {
            background-image: url('~/assets/images/icon_checked.svg');
          }
        }
      }
    }
  }
</style>
