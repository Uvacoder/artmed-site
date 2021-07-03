<template>
  <vue-horizontal-list :items="items" :options="options">
    <template #default="{ item }">
      <div class="small-box-carousel__item">
        <NuxtLink
          class="small-box-carousel__link"
          :to="`/conteudo/${$helpers.formatToSlug(item.content.id)}`"
        >
          <b-card
            :title="$helpers.truncateString($helpers.resolvePath(item, property, null), 24)"
            :img-src="$helpers.normalizeImageUrl($helpers.resolvePath(item, image, null))"
            :img-alt="$helpers.resolvePath(item, property, null)"
            img-height="60"
            img-top
            tag="article"
            class="small-box-carousel__card"
          />
        </NuxtLink>
      </div>
    </template>
  </vue-horizontal-list>
</template>

<script>
import VueHorizontalList from 'vue-horizontal-list'

export default {
  name: 'SmallBoxCarousel',
  components: {
    VueHorizontalList
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    property: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: null,
      required: false
    }
  },
  data () {
    return {
      options: {
        item: {
          padding: 6
        },
        responsive: [
          { end: 576, size: 2 },
          { start: 576, end: 768, size: 5 },
          { start: 768, size: 7 }
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
