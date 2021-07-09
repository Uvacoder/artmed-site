<template>
  <div class="content-right-side">
    <div class="content-right-side__logo-slogan d-block d-lg-none">
      <CommomLogo />
      <AccountSlogan />
    </div>

    <template v-if="action === 'forgetPassword'">
      <AccountRequestPasswordForm />
      <AccountGroupBtnStore class="d-block d-lg-none" />
    </template>

    <template v-else-if="action === 'signin'">
      <template v-if="step === 1">
        <AccountSigninStepOneForm :step.sync="step" />
        <AccountGroupBtnLoginSocial />
      </template>

      <template v-else>
        <AccountSigninStepTwoForm :step.sync="step" />
      </template>

      <AccountGroupBtnStore class="d-block d-lg-none" />
    </template>

    <template v-else>
      <AccountLoginForm />
      <AccountGroupBtnLoginSocial />
      <AccountGroupBtnStore class="d-block d-lg-none" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'ContentRightSide',
  props: {
    isClin: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: 'login',
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
      step: 1
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-right-side {
    position: relative;
    margin: auto;
    min-height: calc(100vh - 8.5vh);

    @include rem("max-width", 480px);

    @include media-breakpoint-up(lg) {
      min-height: auto;
      @include rem("max-width", 370px);
    }

    &__logo-slogan {
      text-align: center;
      margin-top: 8.5vh;

      &::v-deep .slogan {
        color: #000000;
        margin-bottom: 9vh;
        @include font-computed(20px, 26px);
        @include rem("padding-top", 10px);
      }
    }

    &::v-deep .group-btn-store {
      bottom: 0px;
      width: 100%;
      text-align: center;
      @include rem("margin-top", 10px);
      @include rem("margin-bottom", 10px);

      &__title {
        font-weight: 600;
        @include font-computed(20px, 26px);
      }

      @include media-breakpoint-up(md) {
        position: absolute;
      }
    }
  }
</style>
