<template>
  <main class="container content__body">
    <b-row>
      <b-col md="3">
        <div class="avatar-container">
          <b-avatar
            variant="primary"
            :text="$helpers.initialName(avatar.name)"
          />
          <h4>{{ avatar.name }}</h4>
          <span class="avatar-container__email">{{ avatar.email }}</span>
        </div>
      </b-col>
      <b-col md="9">
        <CommomNavSection
          :items="links"
          property-label="name"
          property-chevron
        />
        <b-button
          v-if="user"
          variant="link"
          class="btn--logout"
          block
          @click="logout"
        >
          Sair
        </b-button>
      </b-col>
    </b-row>
  </main>
</template>

<script>
export default {
  name: 'Body',
  data () {
    return {
      links: [
        { name: 'Suporte', url: '#' },
        { name: 'Política de Privacidade', url: '#' },
        { name: 'Termos de Uso', url: '#' }
      ]
    }
  },
  computed: {
    avatar () {
      return (this.user) ? this.user : this.placeholder
    },
    user () {
      return this.$store.state.auth.user
    },
    placeholder () {
      return { name: this.$store.state.theme.config.appName, email: this.$store.state.theme.config.appEmail }
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
  .content__body {
    @include rem("margin-top", 32px);
    @include rem("margin-bottom", 32px);

    .avatar-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      @include rem("margin-bottom", 16px);
      .b-avatar {
        background-color: var(--four);
        @include rem("width", 120px);
        @include rem("height", 120px);
        @include font-computed(40px, 40px);
        @include rem("margin-bottom", 16px);
      }
      h4 {
        font-weight: 500;
        @include font-computed(24px, 31px);
        color: var(--contrast);
      }
      &__email {
        @include font-computed(16px, 20px);
        color: var(--gray-4);
        opacity: 0.65;
      }
    }

    .btn--logout {
      color: red;
      @include font-computed(20px, 26px);
      @include background-border();
    }
  }
</style>
