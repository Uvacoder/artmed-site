<template>
  <div class="contentRightSide">
    <CommomLogo class="d-block d-lg-none" />
    <AccountSlogan class="d-block d-lg-none" />
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
    }
  },
  data () {
    return {
      step: 1
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
  .contentRightSide {
    margin: auto;

    @include rem("max-width", 480px);

    @include media-breakpoint-up(lg) {
      @include rem("max-width", 370px);
    }

    &::v-deep .logo {
      margin: auto;
      margin-top: 8.5vh;
    }

    &::v-deep .slogan {
      color: #000000;

      font-style: normal;
      font-weight: normal;
      text-align: center;

      margin-bottom: 9vh;

      @include font-computed(20px, 26px);
      @include rem("padding-top", 10px);
    }

    &::v-deep .groupBtnStore {
      margin-top: auto;
      top: auto;
      bottom: 0px;
      text-align: center;

      @include rem("margin-bottom", 10px);

      &-title {
        font-style: normal;
        font-weight: 600;

        @include font-computed(20px, 26px);
      }
    }
  }
</style>
