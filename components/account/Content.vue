<template>
  <b-container fluid class="content">
    <b-row>
      <b-col v-if="isDesktop" col lg="4" class="d-none d-lg-block">
        <aside
          class="content-left-side"
          :style="{ backgroundImage: `${backgroundImage}` }"
        >
          <header>
            <CommomLogo force-dark />
            <AccountSlogan />
          </header>
          <footer>
            <AccountGroupBtnStore />
          </footer>
        </aside>
      </b-col>
      <b-col
        cols="12"
        lg="4"
        offset-lg="2"
        align-self="center"
        align-h="center"
      >
        <section class="content-right-side">
          <header v-if="!isDesktop" class="content-right-side__logo-slogan d-block d-lg-none">
            <CommomLogo />
            <AccountSlogan />
          </header>

          <section>
            <template v-if="action === 'forgetPassword'">
              <AccountRequestPasswordForm />
              <!-- <AccountGroupBtnStore class="d-block d-lg-none" /> -->
            </template>

            <template v-else-if="action === 'signin'">
              <template v-if="step === 1">
                <AccountSigninStepOneForm :step.sync="step" />
              </template>

              <template v-else>
                <AccountSigninStepTwoForm :step.sync="step" />
              </template>

              <!-- <AccountGroupBtnStore class="d-block d-lg-none" /> -->
            </template>

            <template v-else>
              <AccountLoginForm />
              <!-- <AccountGroupBtnStore class="d-block d-lg-none" /> -->
            </template>
          </section>

          <footer v-if="!isDesktop" class="content-right-side__logo-slogan d-block d-lg-none">
            <AccountGroupBtnStore />
          </footer>
        </section>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Content',
  props: {
    action: {
      type: String,
      default: 'login'
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
      step: 1
    }
  },
  computed: {
    backgroundImage () {
      return `url("${require(`~/assets/images/${this.$store.state.theme.config.app}/login_background.jpg`)}")`
    },
    window () {
      return this.$store.state.window
    },
    isDesktop () {
      return (this.$store.state.window.width === 0) ? true : (this.$store.state.window.width >= 992)
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    @include media-breakpoint-up(lg) {
      @include rem("margin-left", -15px);
      @include rem("margin-right", -15px);
    }
  }

  .content-left-side {
    position: relative;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: var(--three-darken-10);

    &::v-deep .logo,
    &::v-deep .slogan,
    &::v-deep .group-btn-store {
      @include rem("margin-left", 28px);
    }

    &::v-deep .logo {
      @include rem("margin-top", 64px);
      @include rem("margin-right", 78px);

      a {
        max-width: 309.71px;
      }
    }

    &::v-deep .slogan {
      color: #FFFFFF;
      @include font-computed(30px, 38px);
      @include rem("margin-top", 40px);
      @include rem("max-width", 332px);
    }

    &::v-deep .group-btn-store {
      @include rem("margin-bottom", 50px);
      @include rem("padding-right", 56px);

      &__title {
        color: #FFFFFF;
        font-weight: 600;
        @include font-computed(20px, 26px);
      }
    }
  }

  .content-right-side {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
    min-height: 100vh;

    @include rem("max-width", 480px);

    @include media-breakpoint-up(lg) {
      justify-content: center;
      @include rem("max-width", 370px);
    }

    &__logo-slogan {
      text-align: center;
      margin-top: 8.5vh;

      &::v-deep .slogan {
        color: #000000;
        @include font-computed(20px, 26px);
        @include rem("padding-top", 10px);
      }
    }

    &::v-deep form {
      // margin-top: 8.5vh;
      @include media-breakpoint-down(md) {
        @include rem("padding-top", 18px);
      }
    }

    &::v-deep .group-btn-store {
      width: 100%;
      text-align: center;
      @include rem("margin-top", 10px);
      @include rem("margin-bottom", 10px);

      &__title {
        font-weight: 600;
        @include font-computed(20px, 26px);
      }
    }
  }
</style>
