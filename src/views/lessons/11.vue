<template>
  <div class="info">
    <app-loading v-if="isLoading" class="my-2 py-2" />
    <app-error-message v-if="error" :message="error" class="my-2 py-2" />

    <div v-if="getLesson.id">
      <h4 class="my-2 py-2 border-b">
        <span class="title">Модуль #{{ getLesson.id }}&nbsp;/&nbsp;</span>
        <span>{{ getLesson.title }}</span>
      </h4>
      <!-- Start task -->
      <div class="mb-2">
        <span class="title">Задание:&nbsp;</span>
      </div>
      <!-- END task -->

      <!-- Start result -->
      <div class="mb-2"></div>
      <!-- End result -->

      <!-- Start detail -->
      <div>
        <h4 class="title">Решение:</h4>
      </div>
      <!-- End detail -->
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppLoading from '@/components/Loading'
import AppErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'AppLesson9',
  components: {
    AppLoading,
    AppErrorMessage
  },

  data() {
    return {
      id: 11,
      code: {html: 'html', js: 'js'}
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
  },

  methods: {}
}
</script>
