<template>
  <main class="container content__body">
    <CommomBodyHeader
      title="Notificações"
    />
    <CommomNavSection
      is-notification
      :items="Notifications"
      property-label="title"
      property-sub-label="date"
      property-chevron
    />
    <infinite-loading v-if="Notifications.length >= 20" @infinite="infiniteHandler" />
  </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Body',
  computed: {
    Notifications () {
      return this.$store.state.notifications.items
    }
  },
  methods: {
    ...mapActions([
      'notifications/load'
    ]),
    ...mapActions({
      notificationsLoad: 'notifications/load'
    }),
    infiniteHandler ($state) {
      this.notificationsLoad()
        .then((data) => {
          if (data.length > 0) {
            $state.loaded()
          } else {
            $state.complete()
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content__body {
    @include rem("margin-top", 12px);
  }
</style>
