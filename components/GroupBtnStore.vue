<template>
  <div>
    Baixe agora o app!
    <BtnStoreApple/>
    <BtnStoreAndroid/>
  </div>
</template>

<script>
import BtnStoreAndroid from './BtnStoreAndroid.vue'
export default {
  components: { BtnStoreAndroid },
  name: 'GroupBtnStore',
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="sass" scoped></style>
