<template>
  <div>
    <h1 class="loginForm-title">
      Quase lá!
    </h1>
    <h2 class="loginForm-signin-link">
      Para melhorar sua experiência no aplicativo, por favor, preencha algumas informações.
    </h2>
    <b-form
      class="loginForm-form"
      novalidate
      @submit.stop.prevent="onSubmit"
    >
      <b-form-group
        id="experience-group"
        class="loginForm-form-input-group"
        label="Experiência *"
        label-for="experience"
        :state="validateState('experience')"
      >
        <b-form-select
          id="experience"
          v-model="form.experience"
          :options="options.experience"
          :state="validateState('experience')"
          required
        />
      </b-form-group>

      <b-form-group
        id="area-group"
        class="loginForm-form-input-group"
        label="Área *"
        label-for="area"
        :state="validateState('area')"
      >
        <b-form-select
          id="area"
          v-model="form.area"
          :options="options.area"
          :state="validateState('area')"
          required
        />
      </b-form-group>

      <template v-if="showSpeciality">
        <b-form-group
          id="speciality-group"
          class="loginForm-form-input-group"
          label="Especialidade *"
          label-for="speciality"
          :state="validateState('speciality')"
        >
          <b-form-select
            id="speciality"
            v-model="form.speciality"
            :options="options.speciality"
            :state="validateState('speciality')"
            required
          />
        </b-form-group>
      </template>

      <b-button
        class="loginForm-form-submit"
        type="submit"
        variant="primary"
        block
      >
        Concluir cadastro
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, requiredUnless } from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  props: {
    step: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      stepState: undefined,
      showSpeciality: false,
      form: {
        experience: null,
        area: null,
        speciality: null
      },
      options: {
        experience: [
          { value: null, text: 'Selecione' },
          { value: '1', text: 'Estudante' },
          { value: '3', text: 'Técnico' },
          { value: '2', text: 'Residente' },
          { value: '4', text: 'Profissional' }
        ],
        area: [
          { value: null, text: 'Selecione' }
        ],
        speciality: [
          { value: null, text: 'Selecione' }
        ]
      }
    }
  },
  computed: {
    specialityIsRequired () {
      return (parseInt(this.form.experience) !== 1)
    }
  },
  validations: {
    form: {
      experience: {
        required
      },
      area: {
        required
      },
      speciality: {
        required: requiredUnless('specialityIsRequired')
      }
    }
  },
  watch: {
    step (val, oldVal) {
      this.stepState = val
    },
    stepState (val, oldVal) {
      this.$emit('update:step', val)
    },
    'form.experience': {
      handler (val, oldVal) {
        this.showSpeciality = (parseInt(val) !== 1)
      },
      deep: true
    }
  },
  methods: {
    validateState (field) {
      const { $dirty, $error } = this.$v.form[field]
      return $dirty ? !$error : null
    },
    resetForm () {
      this.form = {
        experience: null,
        area: null,
        speciality: null,
        otherSpeciality: null
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
    },
    onBack () {
      this.stepState = 1
    }
  }
}
</script>

<style lang="scss">
  .form-control {
    border: 1px solid #D8D8D8;

    @include rem("border-radius", 6px);
    @include rem("padding", 14px 12px);
    @include rem("height", 50px);

    &::-webkit-input-placeholder { /* Edge */
      color: #A5A5A5;

      font-style: normal;
      font-weight: 600;

      @include font-computed(16px, 20px);
    }

    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #A5A5A5;

      font-style: normal;
      font-weight: 600;

      @include font-computed(16px, 20px);
    }

    &::placeholder {
      color: #A5A5A5;

      font-style: normal;
      font-weight: 600;

      @include font-computed(16px, 20px);
    }

    &--password {
      border-right: none;
    }
  }

  .was-validated
  .form-control:invalid,
  .form-control.is-invalid {
    &::-webkit-input-placeholder { /* Edge */
      color: #dc3545;
    }

    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #dc3545;
    }

    &::placeholder {
      color: #dc3545;
    }
  }

  .loginForm-form-switchVisibility {
    border: 1px solid #D8D8D8;
    border-left: none;
    color: #A5A5A5;

    @include rem("border-radius", 6px);
  }

  .is-invalid .loginForm-form-switchVisibility {
    border-color: #dc3545;
  }

  .is-valid .loginForm-form-switchVisibility {
    border-color: #28a745;
  }

  .custom-select {
    border: 1px solid #D8D8D8;
    color: #28a745;
    background: #FAFBFC;
    text-align-last: center;
    text-align: center;

    @include rem("border-radius", 6px);
    @include rem("padding", 14px 12px);
    @include rem("height", 50px);

    &::-webkit-input-placeholder { /* Edge */
      color: #28a745;

      font-style: normal;
      font-weight: 600;

      @include font-computed(16px, 20px);
    }

    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #28a745;

      font-style: normal;
      font-weight: 600;

      @include font-computed(16px, 20px);
    }

    &::placeholder {
      color: #28a745;

      font-style: normal;
      font-weight: 600;

      @include font-computed(16px, 20px);
    }

    &--password {
      border-right: none;
    }
  }

  .was-validated
  .custom-select:invalid,
  .custom-select.is-invalid {
    &::-webkit-input-placeholder { /* Edge */
      color: #dc3545;
    }

    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #dc3545;
    }

    &::placeholder {
      color: #dc3545;
    }
  }
</style>

<style lang="scss" scoped>
  .loginForm {
    &-title {
      color: #000000;
      font-style: normal;
      font-weight: bold;

      @include font-computed(24px, 32px);
    }

    &-signin-link {
      font-style: normal;
      font-weight: normal;
      color: #343434;

      @include font-computed(18px, 24px);
      @include rem("margin-bottom", 17px);

      a {
        color: #00A589;
      }
    }

    &-form {
      @include rem("padding-top", 17px);

      &-input-group {
        &::v-deep label {
          color: #343434;
          font-style: normal;
          font-weight: 600;

          @include font-computed(15px, 19px);
        }
      }

      &-recoveryPassword {
        text-align: center;

        @include rem("margin-top", 16px);
        @include rem("margin-bottom", 16px);

        a {
          color: #00A589;
          font-style: normal;
          font-weight: 600;

          @include font-computed(16px, 20px);
        }
      }

      &-submit {
        color: #FFFFFF;

        background-color: #00A589;
        border-color: #00A589;

        font-style: normal;
        font-weight: 600;
        text-align: center;

        @include font-computed(16px, 20px);
        @include rem("border-radius", 6px);
        @include rem("height", 50px);
        @include rem("margin-bottom", 15px);

        &:not(:disabled):not(.disabled):active,
        &:not(:disabled):not(.disabled).active,
        .show > &.dropdown-toggle {
          background-color: darken(#00A589, 5%);
          border-color: darken(#00A589, 5%);
        }
      }

      &-cancel {
        color: #00A589;

        background-color: #ffffff;
        border-color: #00A589;

        font-style: normal;
        font-weight: 600;

        display: flex;
        justify-content: center;
        align-items: center;

        @include font-computed(16px, 20px);
        @include rem("border-radius", 6px);
        @include rem("height", 50px);
        @include rem("margin-top", 4px);

        &:not(:disabled):not(.disabled):active,
        &:not(:disabled):not(.disabled).active,
        .show > &.dropdown-toggle {
          color: darken(#00A589, 5%);
          background-color: darken(#ffffff, 5%);
          border-color: darken(#00A589, 5%);
        }
      }
    }

    @include media-breakpoint-up(lg) {
      &-title {
        @include font-computed(40px, 52px);
      }

      &-signin-link {
        @include font-computed(20px, 26px);
      }
    }
  }
</style>
