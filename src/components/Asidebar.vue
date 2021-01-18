<template>
  <div class="md:col-span-1 md:flex md:justify-end">
    <nav class="text-right w-full">
      <div class="flex justify-between items-center">
        <h1
          class="font-bold w-full text-left md:text-right p-4 border-b border-gray-100"
        >
          <router-link :to="{name: 'home'}">Практика по Vue.js</router-link>
        </h1>
        <div class="px-4 cursor-pointer md:hidden" id="burger">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
      </div>

      <div v-if="isLoading">Загрузка данных...</div>
      <div v-if="error">Что-то пошло не так</div>
      <ul v-if="lessons" id="menu" class="text-sm mt-2 hidden md:block">
        <li v-for="lesson in lessons" :key="lesson.id" class="flex justify-end">
          <router-link :to="{name: 'lesson', params: {slug: lesson.id}}">
            Урок {{ lesson.id }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Asidebar',

  computed: {
    ...mapState({
      isLoading: state => state.course.isLoading,
      error: state => state.course.error,
      lessons: state => state.course.data
    }),

    currentLesson() {
      return this.$route.params.slug || ''
    }
  },

  watch: {
    currentLesson() {
      this.fetchLesson()
    }
  },

  mounted() {
    this.fetchLesson()
  },

  methods: {
    fetchLesson() {
      this.$store.dispatch('getLesson', {
        slug: this.currentLesson
      })
    }
  }
}
</script>
