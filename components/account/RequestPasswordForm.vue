<template>
  <b-form
    class="account-form"
    novalidate
    @submit.stop.prevent="onSubmit"
  >
    <AccountFormHeader
      title="Recuperar senha"
      subtitle="Insira seu email para recuperar sua senha."
    />

    <b-form-group
      id="email-group"
      class="account-form__input-group"
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
      class="account-form__btn--submit"
      type="submit"
      block
    >
      Recuperar
    </b-button>
    <NuxtLink
      to="/login"
      class="btn account-form__btn--cancel btn-outline-secondary btn-block"
    >
      Cancelar
    </NuxtLink>
  </b-form>
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
  @include account-input();
</style>

<style lang="scss" scoped>
  .account-form {
    @include account-form();

    &__btn--cancel {
      @include account-form-btn();
      color: #00A589;
      background-color: #ffffff;
      border-color: #00A589;

      display: flex;
      justify-content: center;
      align-items: center;

      &:not(:disabled):not(.disabled):active,
      &:not(:disabled):not(.disabled).active,
      .show > &.dropdown-toggle {
        color: darken(#00A589, 5%);
        background-color: darken(#ffffff, 5%);
        border-color: darken(#00A589, 5%);
      }
    }
  }
</style>
