<template>
  <vue-horizontal-list :items="items" :options="options">
    <template #default="{ item }">
      <div class="big-box-carousel__item">
        <NuxtLink
          class="big-box-carousel__link"
          :to="{ name: 'conteudo-id', params: { id: $helpers.getContentUrlId(item.url) } }"
        >
          <b-card
            :title="item.title"
            :img-src="$helpers.normalizeImageUrl(item.image)"
            :img-alt="item.title"
            img-width="340"
            img-top
            tag="article"
            class="big-box-carousel__card"
          />
        </NuxtLink>
      </div>
    </template>
  </vue-horizontal-list>
</template>

<script>
import VueHorizontalList from 'vue-horizontal-list'
// TODO: definir as rotas de acordo com o conteudo
export default {
  name: 'BigBoxCarousel',
  components: {
    VueHorizontalList
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      options: {
        item: {
          padding: 6
        },
        responsive: [
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 2 },
          { start: 768, size: 3 }
        ],
        list: {
          windowed: 1140,
          padding: 12
        },
        position: {
          start: 0
        },
        autoplay: { play: false, repeat: true, speed: 2500 }
      }
    }
  }
}
</script>
