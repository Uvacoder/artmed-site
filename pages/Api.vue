<template>
  <div>
    <h1>Teste API</h1>
    {{ ip }}
  </div>
</template>

<script>
export default {
  name: 'API',
  async asyncData ({ $api }) {
    // const ip = await $api.getBaseUrl()
    const endpoint = $api.EndPoints.categories
    const params = {}
    const ip = await $api.request(endpoint, params)
    return { ip }
  }
}
</script>
