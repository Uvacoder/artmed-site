<template>
  <section class="column-list-container">
    <CommomSectionTitleLink :title="title" :to="to" :link="link" :show-link="items.length > 0" />
    <HomeEmptySection
      v-if="items.length <= 0"
      :icon="icon"
      :text="text"
    />
    <HomeColumnList
      v-else
      :items="items"
      :to="toItem"
      :property="property"
      :icon="iconItem"
      :image="image"
    />
  </section>
</template>

<script>
export default {
  name: 'ColumnListContainer',
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: String,
      default: null,
      required: false
    },
    link: {
      type: String,
      default: null,
      required: false
    },
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    toItem: {
      type: String,
      default: null,
      required: false
    },
    property: {
      type: String,
      required: true
    },
    iconItem: {
      type: String,
      default: null,
      required: false
    },
    image: {
      type: String,
      default: null,
      required: false
    }
  }
}
</script>
