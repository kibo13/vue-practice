<template>
  <div>
    <h4 class="font-bold mt-5 pb-2 border-b">Список уроков</h4>
    <app-loading v-if="isLoading" />
    <app-error-message v-if="error" :message="error" />
    <div v-if="lessons" class="mt-4 grid lg:grid-cols-3 gap-5">
      <div
        v-for="lesson in lessons"
        :key="lesson.id"
        class="card hover:shadow-lg transition ease-out duration-500"
      >
        <div class="m-4">
          <router-link :to="{name: `lesson${lesson.id}`}" class="font-bold"
            >Модуль #{{ lesson.id }}</router-link
          >
          <span class="block text-gray-500 text-sm">{{ lesson.title }}</span>
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
