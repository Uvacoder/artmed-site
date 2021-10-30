<template>
  <div class="commom-navbar-container" :class="classModContainer">
    <div class="commom-navbar__logo" :class="classModLogo">
      <CommomLogo class="d-lg-none" />
    </div>
    <nav class="nav justify-content-end commom-navbar">
      <template v-for="(menu, index) in menus">
        <NuxtLink
          :key="index"
          class="nav-link"
          :to="menu.to"
        >
          <span class="nav-link-icon-container">
            <span v-if="menu.badged" class="nav-link-icon-container__badge-status" :class="{'nav-link-icon-container__badge-status--unread': menu.unread}" />
            <CommomSvgIcon :svg="menu.icon" class-style="nav-link-icon-container__icon" />
          </span>
          <span class="nav-link-label">{{ menu.label }}</span>
        </NuxtLink>
      </template>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    isDark: {
      type: Boolean,
      default: false
    },
    isIndex: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menus: [
        {
          to: '/notificacoes',
          icon: 'icon_notify_no',
          label: 'Notificações',
          badged: true,
          unread: false
        },
        {
          to: '/perfil',
          icon: 'icon_profile',
          label: 'Perfil',
          badged: null,
          unread: null
        }
      ]
    }
  },
  computed: {
    classModContainer () {
      return (this.isIndex) ? 'commom-navbar-container--index' : ''
    },
    classModLogo () {
      return (this.isIndex) ? 'commom-navbar__logo--index' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .commom-navbar-container {
    display: flex;
    align-content: space-between;
    justify-content: space-between;
    align-items: center;
    @include rem("padding-top", 20px);
    @include rem("margin-bottom", 20px);

    &--index {
      // justify-content: flex-end;
      @include media-breakpoint-up(sm) {
        @include rem("margin-bottom", 80px);
      }
    }
  }

  .commom-navbar {
    flex-wrap: nowrap;
    @include rem("margin-right", -10px);
  }

  .commom-navbar__logo {
    width: 100%;
    @include rem("max-width", 140px);
    & > .logo {
      display: initial;
    }
  }

  .nav-link,
  .nav-link-icon {
    display: flex;
  }

  .nav-link {
    font-weight: 600;
    color: var(--contrast);
    @include font-computed(18px, 23px);

    @include media-breakpoint-down(sm) {
      @include rem("padding", 10px);
    }

    &-icon-container {
      position: relative;

      &__badge-status {
        position: absolute;
        @include rem("top", -1px);
        @include rem("left", 11px);
        z-index: 2;
        display: none;
        @include rem("width", 10px);
        @include rem("height", 10px);
        color: #F84C5F;
        background-image: linear-gradient(#F84C5F,#F84C5F);
        background-clip: padding-box;
        border: 2px solid white;
        border-radius: 50%;

        &--unread {
          display: inline-block;
        }
      }

      &__icon {
        @include rem("width", 22px);
        @include rem("height", 22px);
        margin-right: 0;
        @include media-breakpoint-up(sm) {
          @include rem("margin-right", 12px);
        }
      }
    }

    &-label {
      display: none;
      @include media-breakpoint-up(sm) {
        display: initial;
      }
    }

    &:hover,
    &:active,
    &.active {
      color: var(--three);
      &::v-deep .nav-link-icon-container__icon {
        * {
          fill: var(--three);
        }
      }
    }
  }
</style>
