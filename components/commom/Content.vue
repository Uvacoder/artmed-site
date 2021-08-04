<template>
  <div class="content">
    user: {{ $auth.user }}
    <CommomHeader />
    <component :is="body" />
    <CommomFooter />
  </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    body: {
      type: String,
      required: true
    }
  }
}
</script>
