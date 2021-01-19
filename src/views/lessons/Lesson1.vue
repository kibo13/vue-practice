<template>
  <div>
    <h4 class="font-bold mt-5 pb-2 border-b">
      <span>Урок №{{ id }}</span>
      <span>{{ title }}</span>
    </h4>
    <div class="mt-4"></div>
  </div>
</template>

<script>
export default {
  name: 'AppLesson1',

  data() {
    return {
      id: 1
    }
  },

  computed: {
    title() {
      return this.$store.getters.lesson(this.id).title
    }
  }
}
</script>
