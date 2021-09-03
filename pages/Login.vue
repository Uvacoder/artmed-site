<template>
  <main>
    <AccountContent action="login" />
  </main>
</template>

<script>
export default {
  name: 'Login',
  // auth: 'guest',
  async asyncData (context) {
    await Promise.all([
      context.$auth.logout()
    ])
  }
}
</script>
