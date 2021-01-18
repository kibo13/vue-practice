<template>
  <div>
    <div v-if="isLoading">Загрузка данных...</div>
    <div v-if="error">Что-то пошло не так</div>
    <div v-if="lesson">
      {{ lesson }}
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Lesson',
  computed: {
    ...mapState({
      isLoading: state => state.lesson.isLoading,
      error: state => state.lesson.error,
      lesson: state => state.lesson.data
    })
  },

  mounted() {
    this.$store.dispatch('getLesson', {
      slug: this.$route.params.slug
    })
  }
}
</script>
