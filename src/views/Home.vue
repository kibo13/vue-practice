<template>
  <div class="info">
    <h4 class="mt-5 pb-2 title border-b">Список уроков</h4>
    <app-loading v-if="isLoading" />
    <app-error-message v-if="error" :message="error" />
    <div v-if="lessons" class="mt-4 grid lg:grid-cols-3 gap-5">
      <div v-for="lesson in lessons" :key="lesson.id" class="card flex">
        <router-link :to="{name: `lesson${lesson.id}`}" class="p-4">
          <h5 class="title">Модуль #{{ lesson.id }}</h5>
          <p class="block text-sm">{{ lesson.title }}</p>
        </router-link>
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
