<template>
  <b-form
    class="account-form"
    novalidate
    @submit.stop.prevent="onSubmit"
  >
    <AccountFormHeader
      title="Bem-vindo!"
      subtitle="Novo por aqui?"
      to="/cadastro"
      to-label="Cadastre-se grátis"
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
        class="account-form__form-control"
        placeholder="Seu email"
        :state="validateState('email')"
        required
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
            @click="switchVisibility()"
          >
            <b-icon :icon="(passwordFieldType == 'password') ? 'eye-fill' : 'eye-slash-fill'" />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>

    <div class="account-form__link">
      <NuxtLink to="/recuperar-senha">
        Recuperar senha
      </NuxtLink>
    </div>

    <b-button
      class="account-form__btn--submit"
      type="submit"
      variant="primary"
      block
    >
      Entrar
    </b-button>

    <AccountGroupBtnLoginSocial />
  </b-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  props: {},
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      passwordFieldType: 'password'
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
    async onSubmit ({ redirect }) {
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }

      const login = {
        username: this.form.email,
        password: this.form.password
      }

      try {
        await this.$auth.loginWith('custom', { data: login })
      } catch (error) {
        if (error.response) {
          const data = error.response.data
          this.$bvModal.msgBoxOk(`(${data.code}) - ${data.detail.id}: ${data.detail.message}`, this.$helpers.getModalOptions(this.$helpers.getString('alertSucessTitle')))
        }
      }
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

    &__link {
      text-align: center;
      @include rem("margin-top", 16px);
      @include rem("margin-bottom", 16px);
    }
  }
</style>
