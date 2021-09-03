<template>
  <CommomContent body="NotificationsBody" />
</template>

<script>
export default {
  name: 'Notificações',
  // auth: false,
  async asyncData (context) {
    await Promise.all([
      context.store.dispatch('notifications/load')
    ])
  }
}
</script>
