<template>
  <nav class="nav justify-content-end commom-navbar">
    <template v-for="(menu, index) in menus">
      <NuxtLink
        :key="index"
        class="nav-link"
        :to="menu.to"
      >
        <span class="nav-link-icon-container">
          <span v-if="menu.badged" class="nav-link-icon-container__badge-status" :class="{'nav-link-icon-container__badge-status--unread': menu.unread}" />
          <CommomSvgIcon :svg="menu.icon" class="nav-link-icon-container__icon" />
        </span>
        {{ menu.label }}
      </NuxtLink>
    </template>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    isDark: {
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
    theme () {
      return (this.isDark) ? 'dark' : 'light'
    }
  }
}
</script>

<style lang="scss" scoped>
  .commom-navbar {
    @include rem("padding-top", 20px);
    @include rem("margin-bottom", 80px);
  }

  .nav-link,
  .nav-link-icon {
    display: flex;
  }

  .nav-link {
    font-weight: 600;
    color: #343434;
    @include font-computed(18px, 23px);

    &-icon-container {
      position: relative;

      &__badge-status {
        position: absolute;
        top: -1px;
        left: 11px;
        z-index: 2;
        display: none;
        width: 10px;
        height: 10px;
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
        @include rem("margin-right", 12px);
      }
    }

    &:hover,
    &:active,
    &.active {
      color: #00A589;
      &::v-deep .nav-link-icon-container__icon {
        * {
          fill: #00A589;
        }
      }
    }
  }
</style>
