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
        :options="options.experience"
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
  @include account-select();
</style>

<style lang="scss" scoped>
  .account-form {
    @include account-form();
  }
</style>
