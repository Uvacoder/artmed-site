<template>
  <div>
    <h1 class="requestPasswordForm-title">
      Recuperar senha
    </h1>
    <h2 class="requestPasswordForm-signin-link">
      Insira seu email para procurar sua senha.
    </h2>
    <b-form
      class="requestPasswordForm-form"
      novalidate
      @submit.stop.prevent="onSubmit"
    >
      <b-form-group
        id="email-group"
        class="requestPasswordForm-form-input-group"
        label="Email *"
        label-for="email"
        :state="validateState('email')"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Seu email"
          :state="validateState('email')"
          required
        />
      </b-form-group>

      <b-button
        class="requestPasswordForm-form-submit"
        type="submit"
        block
      >
        Recuperar
      </b-button>
      <NuxtLink
        to="/login"
        class="btn requestPasswordForm-form-cancel btn-outline-secondary btn-block"
      >
        Cancelar
      </NuxtLink>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'RequestPasswordForm',
  mixins: [validationMixin],
  props: {},
  data () {
    return {
      form: {
        email: ''
      }
    }
  },
  computed: {},
  validations: {
    form: {
      email: {
        required
      },
      password: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    switchVisibility () {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    validateState (field) {
      const { $dirty, $error } = this.$v.form[field]
      return $dirty ? !$error : null
    },
    resetForm () {
      this.form = {
        email: null,
        password: null
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
</style>

<style lang="scss" scoped>
  .requestPasswordForm {
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
        @include rem("margin-bottom", 4px);

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
