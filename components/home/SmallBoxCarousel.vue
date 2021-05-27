<template>
  <vue-horizontal-list :items="items" :options="options">
    <template #default="{ item }">
      <div class="small-box-carousel__item">
        <NuxtLink
          class="small-box-carousel__link"
          :to="item.to"
        >
          <b-card
            tag="article"
            class="small-box-carousel__card"
          >
            <b-card-text>
              <CommomSvgIcon :svg="item.icon" class="small-box-carousel__icon" />
              {{ item.title }}
            </b-card-text>
          </b-card>
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
