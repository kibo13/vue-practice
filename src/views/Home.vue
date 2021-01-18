<template>
  <div>
    <app-loading v-if="isLoading" />
    <app-error-message v-if="error" />
    <div v-if="lessons">
      <h4 class="font-bold mt-5 pb-2 border-b">Список уроков</h4>
      <div class="mt-4 grid lg:grid-cols-3 gap-5">
        <div v-for="lesson in lessons" :key="lesson.id" class="card">
          <div class="m-4">
            <span class="font-bold">Урок №{{ lesson.id }}</span>
            <span class="block text-gray-500 text-sm">{{ lesson.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppLoading from '@/components/Loading'
import AppErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'Home',

  components: {
    AppLoading,
    AppErrorMessage
  },

  computed: {
    ...mapState({
      isLoading: state => state.lessons.isLoading,
      error: state => state.lessons.error,
      lessons: state => state.lessons.data
    })
  },
  mounted() {
    this.$store.dispatch('getLessons')
  }
}
</script>
