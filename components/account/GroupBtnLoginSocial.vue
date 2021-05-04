<template>
  <div class="groupBtnLoginSocial">
    <div class="groupBtnLoginSocial-or">
      <span>ou</span>
    </div>
    <b-row no-gutters class="groupBtnLoginSocial-btns">
      <b-col
        class="col"
        cols="12"
        md="4"
      >
        <AccountBtnLoginSocial social="Facebook" />
      </b-col>

      <b-col
        class="col"
        cols="12"
        md="4"
      >
        <AccountBtnLoginSocial social="Google" />
      </b-col>

      <b-col
        class="col"
        cols="12"
        md="4"
      >
        <AccountBtnLoginSocial social="Apple" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'GroupBtnLoginSocial',
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
  .groupBtnLoginSocial {
    &-or {
      position: relative;
      color: #343434;
      text-align: center;
      font-style: normal;
      font-weight: 600;

      @include font-computed(20px, 26px);
      @include rem("margin-bottom", 10px);

      &::before {
        content: '';
        position: absolute;
        border: 1px solid #000000;
        top: 50%;
        left: 0;
        width: 100%;
      }

      span {
        background-color: #ffffff;
        position: relative;
        display: inline-block;

        @include rem("padding", 0 15px);
        @include rem("margin-right", 15px);
        @include rem("top", -2px);
      }
    }

    &-btns {
      @include rem("padding-top", 10px);

      @include media-breakpoint-up(md) {
        & > .col{
          @include rem("padding-left", 4.5px);
          @include rem("padding-right", 4.5px);
        }

        & > .col:first-child {
          @include rem("padding-left", 0px);
          @include rem("padding-right", 4.5px);
        }

        & > .col:last-child {
          @include rem("padding-left", 4.5px);
          @include rem("padding-right", 0px);
        }
      }
    }
  }
</style>
