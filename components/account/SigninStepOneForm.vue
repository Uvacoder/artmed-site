<template>
  <div>
    <h1 class="loginForm-title">
      Nova conta
    </h1>
    <h2 class="loginForm-signin-link">
      Já tem um cadastro?
      <NuxtLink to="/login">
        Faça login
      </NuxtLink>
    </h2>
    <b-form
      class="loginForm-form"
      novalidate
      @submit.stop.prevent="onSubmit"
    >
      <b-form-group
        id="name-group"
        class="loginForm-form-input-group"
        label="Nome *"
        label-for="name"
        :state="validateState('name')"
      >
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Seu nome"
          :state="validateState('name')"
          required
        />
      </b-form-group>

      <b-form-group
        id="email-group"
        class="loginForm-form-input-group"
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

      <b-form-group
        id="phone-group"
        class="loginForm-form-input-group"
        label="Telefone (opcional)"
        label-for="phone"
      >
        <b-form-input
          id="phone"
          v-model="form.phone"
          type="text"
          placeholder="Seu telefone"
        />
      </b-form-group>

      <b-form-group
        id="password-group"
        class="loginForm-form-input-group"
        label="Senha *"
        label-for="password"
        :state="validateState('password')"
      >
        <b-input-group class="mt-3">
          <b-form-input
            id="password"
            v-model="form.password"
            class="form-control--password"
            :type="passwordFieldType"
            placeholder="Sua senha"
            :state="validateState('password')"
            required
          />
          <b-input-group-append>
            <b-button
              class="loginForm-form-switchVisibility"
              variant="link"
              @click="switchVisibility('password')"
            >
              <b-icon :icon="(passwordFieldType == 'password') ? 'eye-fill' : 'eye-slash-fill'" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <b-form-group
        id="confirmPassword-group"
        class="loginForm-form-input-group"
        label="Confirmar senha *"
        label-for="confirmPassword"
        :state="validateState('confirmPassword')"
      >
        <b-input-group class="mt-3">
          <b-form-input
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="form-control--confirmPassword"
            :type="confirmPasswordFieldType"
            placeholder="Confirmar senha"
            :state="validateState('confirmPassword')"
            required
          />
          <b-input-group-append>
            <b-button
              class="loginForm-form-switchVisibility"
              variant="link"
              @click="switchVisibility('confirmPassword')"
            >
              <b-icon :icon="(confirmPasswordFieldType == 'password') ? 'eye-fill' : 'eye-slash-fill'" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-button
        class="loginForm-form-submit"
        type="submit"
        variant="primary"
        block
      >
        Criar conta
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

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
      form: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      },
      passwordFieldType: 'password',
      confirmPasswordFieldType: 'password'
    }
  },
  computed: {},
  validations: {
    form: {
      name: {
        required
      },
      email: {
        required
      },
      password: {
        required,
        minLength: minLength(3)
      },
      confirmPassword: {
        required,
        minLength: minLength(3)
      }
    }
  },
  watch: {
    step (val, oldVal) {
      this.stepState = val
    },
    stepState (val, oldVal) {
      this.$emit('update:step', val)
    }
  },
  methods: {
    switchVisibility (field) {
      if (field === 'password') {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      } else {
        this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password'
      }
    },
    validateState (field) {
      const { $dirty, $error } = this.$v.form[field]
      return $dirty ? !$error : null
    },
    resetForm () {
      this.form = {
        name: null,
        email: null,
        phone: null,
        password: null,
        confirmPassword: null
      }

      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    onSubmit () {
      // this.$v.form.$touch()
      // if (this.$v.form.$anyError) {
      //   return
      // }
      this.stepState = 2
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

    &--password,
    &--confirmPassword {
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
