<template>
  <nav class="footer-nav">
    <ul class="footer-nav__list">
      <li v-for="(menu, index) in menus" :key="index" class="footer-nav__item">
        <NuxtLink
          class="footer-nav__link"
          :to="menu.to"
        >
          {{ menu.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'FooterNav',
  data () {
    return {
      menus: [
        {
          to: '#',
          label: 'Faça seu cadastro'
        },
        {
          to: '#',
          label: 'Compartilhe o {{ app }} com amigos'
        },
        {
          to: '#',
          label: 'Conheça nossos autores'
        },
        {
          to: '#',
          label: 'Deixe um feedback'
        }
      ]
    }
  },
  computed: {
    app () {
      const app = (this.$store.state.theme.psiMode) ? 'PSI' : 'CLIN'
      return `Artmed+${app}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer-nav {
    &__list {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__item {
      padding: 24px 0;
      border-bottom: 1px solid #B7CAF4;

      &:last-child {
        border-bottom: none;
      }
    }

    &__link{
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      /* Light/PSI - 3 */
      color: #00A589;
    }
  }
</style>
