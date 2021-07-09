<template>
  <CommomContent body="ProfileBody" />
</template>

<script>
// TODO: arrumar bug da home
export default {
  name: 'Perfil',
  auth: false,
  async asyncData (context) {
    if (context.$auth.loggedIn) {
      await Promise.all([
        await context.$auth.fetchUser()
      ])
    }
  }
}
</script>
