<template>
  <div>
    <h4 class="font-bold mt-5 pb-2 border-b">
      <span>Модуль #{{ id }} / </span>
      <app-loading
        v-if="isLoading"
        class="text-sm text-gray-400 font-semibold"
      />
      <app-error-message
        v-if="error"
        :message="error"
        class="text-sm text-gray-400 font-semibold"
      />
      <span class="text-sm text-gray-400 font-semibold">
        {{ getLesson.title }}
      </span>
    </h4>
    <div class="mt-4"></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppLoading from '@/components/Loading'
import AppErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'AppLesson4',
  components: {
    AppLoading,
    AppErrorMessage
  },

  data() {
    return {
      id: 4
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.course.isLoading,
      error: state => state.course.error
    }),

    getLesson() {
      return this.$store.getters.getLessonById(this.id)
    }
  }
}
</script>
