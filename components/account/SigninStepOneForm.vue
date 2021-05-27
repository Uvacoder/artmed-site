<template>
  <div class="account-form">
    <b-form
      class="account-form"
      novalidate
      @submit.stop.prevent="onSubmit"
    >
      <AccountFormHeader
        title="Nova conta"
        subtitle="Já tem um cadastro?"
        to="/login"
        to-label="Faça login"
      />

      <b-form-group
        id="name-group"
        class="account-form__input-group"
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

      <b-form-group
        id="phone-group"
        class="account-form__input-group"
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
        class="account-form__input-group"
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
              class="form-control__switchVisibility"
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
        class="account-form__input-group"
        label="Confirmar senha *"
        label-for="confirmPassword"
        :state="validateState('confirmPassword')"
      >
        <b-input-group class="mt-3">
          <b-form-input
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="form-control--password"
            :type="confirmPasswordFieldType"
            placeholder="Confirmar senha"
            :state="validateState('confirmPassword')"
            required
          />
          <b-input-group-append>
            <b-button
              class="form-control__switchVisibility"
              variant="link"
              @click="switchVisibility('confirmPassword')"
            >
              <b-icon :icon="(confirmPasswordFieldType == 'password') ? 'eye-fill' : 'eye-slash-fill'" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-button
        class="account-form__btn--submit"
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
  @include account-input();
</style>

<style lang="scss" scoped>
  .account-form {
    @include account-form();
  }
</style>
