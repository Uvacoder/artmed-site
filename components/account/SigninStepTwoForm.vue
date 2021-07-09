<template>
  <b-form
    class="account-form"
    novalidate
    @submit.stop.prevent="onSubmit"
  >
    <AccountFormHeader
      title="Quase lá!"
      subtitle="Para melhorar sua experiência no aplicativo, por favor, preencha algumas informações."
    />
    <b-form-group
      id="experience-group"
      class="account-form__input-group"
      label="Experiência *"
      label-for="experience"
      :state="validateState('experience')"
    >
      <b-form-select
        id="experience"
        v-model="form.experience"
        :options="loadRegisterExperiences"
        value-field="id"
        text-field="name"
        :state="validateState('experience')"
        required
      />
    </b-form-group>

    <b-form-group
      id="area-group"
      class="account-form__input-group"
      label="Área *"
      label-for="area"
      :state="validateState('area')"
    >
      <b-form-select
        id="area"
        v-model="form.area"
        :options="options.area"
        value-field="id"
        text-field="name"
        :state="validateState('area')"
        required
      />
    </b-form-group>

    <template v-if="showSpeciality">
      <b-form-group
        id="speciality-group"
        class="account-form__input-group"
        label="Especialidade *"
        label-for="speciality"
        :state="validateState('speciality')"
      >
        <b-form-select
          id="speciality"
          v-model="form.speciality"
          :options="options.speciality"
          value-field="id"
          text-field="name"
          :disabled="(options.speciality.length <= 1)"
          :state="validateState('speciality')"
          required
        />
      </b-form-group>
    </template>

    <b-button
      class="account-form__btn--submit"
      type="submit"
      variant="primary"
      block
    >
      Concluir cadastro
    </b-button>
  </b-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, requiredIf } from 'vuelidate/lib/validators'

export default {
  name: 'SigninStepTwoForm',
  mixins: [validationMixin],
  props: {
    step: {
      type: Number,
      required: true
    },
    setup: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      stepState: undefined,
      form: {
        experience: null,
        area: null,
        speciality: null
      },
      options: {
        experience: [],
        area: [
          { id: null, name: 'Selecione' }
        ],
        speciality: []
      }
    }
  },
  computed: {
    showSpeciality () {
      return (this.form.experience !== null && parseInt(this.form.experience) !== 1 && this.form.area !== null)
    },
    specialityIsRequired () {
      return (parseInt(this.form.experience) !== 1)
    },
    loadRegisterExperiences () {
      let options = [{ id: null, name: 'Selecione' }, { id: '1', name: 'Estudante' }, { id: '2', name: 'Residente' }, { id: '4', name: 'Profissional' }]
      if (!this.$store.state.theme.config.psiMode) {
        options = this.$helpers.arrayInsertAt(options, 2, { id: '3', name: 'Técnico' })
      }
      return options
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
        required: requiredIf((form) => {
          return (parseInt(form.experience) !== 1)
        })
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
    'form.area': {
      async handler (val, oldVal) {
        if (val !== null) {
          await this.loadRegisterSpecialties(val)
        }
      },
      deep: true
    }
  },
  mounted () {
    this.loadRegisterAreas()
    this.initRegisterSpecialties()
  },
  methods: {
    async loadRegisterAreas () {
      const options = await this.$api.request(this.$api.EndPoints.signUpAreas, {})
      this.options.area = this.$helpers.arrayInsertAt(this.options.area, 1, options.data)
    },
    initRegisterSpecialties () {
      this.options.speciality = [{ id: null, name: 'Selecione' }]
    },
    async loadRegisterSpecialties (area) {
      this.initRegisterSpecialties()
      this.options.speciality[0].name = 'Carregando...'
      const endpoint = this.$api.EndPoints.signUpSpecialties
      endpoint.area = area
      const options = await this.$api.request(this.$api.EndPoints.signUpSpecialties, {})
      this.options.speciality = this.$helpers.arrayInsertAt(this.options.speciality, 1, options.data)
      this.options.speciality[0].name = 'Selecione'
    },
    validateState (field) {
      const { $dirty, $error } = this.$v.form[field]
      return $dirty ? !$error : null
    },
    resetForm () {
      this.form = {
        experience: null,
        area: null,
        speciality: null
      }

      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    async onSubmit () {
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }

      const token = this.$auth.$storage.getUniversal('tempToken')
      const endpoint = this.$api.EndPoints.updateUser
      endpoint.id = this.$helpers.extractUserId(token.access)
      endpoint.token = token
      const intExperience = parseInt(this.form.experience)
      const params = {
        op: 'update',
        degree: intExperience,
        area: this.form.area
      }

      if (intExperience !== 1) {
        params.specialty = this.form.specialty
      }

      await this.$api.request(endpoint, params)
        .then(() => {
          this.$auth.setUserToken(token)
            .then(() => {
              this.$auth.fetchUser()
              this.$auth.$storage.removeUniversal('tempToken')
            })
        })
        .catch((error) => {
          if (error.response) {
            const data = error.response.data
            this.$bvModal.msgBoxOk(`(${data.code}) - ${data.detail.id}: ${data.detail.message}`, this.$helpers.getModalOptions(this.$helpers.getString('alertSucessTitle')))
          }
        })
    }
  }
}
</script>

<style lang="scss">
  @include account-select();
</style>

<style lang="scss" scoped>
  .account-form {
    @include account-form();
  }
</style>
