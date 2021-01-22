<template>
  <div class="info">
    <h4 class="mt-5 pb-2 title border-b">Список уроков</h4>
    <app-loading v-if="isLoading" />
    <app-error-message v-if="error" :message="error" />
    <div v-if="lessons" class="mt-4 grid lg:grid-cols-3 gap-5">
      <div v-for="lesson in lessons" :key="lesson.id" class="card">
        <div class="m-4">
          <router-link :to="{name: `lesson${lesson.id}`}" class="title">
            Модуль #{{ lesson.id }}
          </router-link>
          <span class="block text-sm">{{ lesson.title }}</span>
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
  name: 'AppHome',

  components: {
    AppLoading,
    AppErrorMessage
  },

  computed: {
    ...mapState({
      isLoading: state => state.course.isLoading,
      error: state => state.course.error,
      lessons: state => state.course.data
    })
  }
}
</script>
