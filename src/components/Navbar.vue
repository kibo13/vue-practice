<template>
  <div>
    <nav class="text-right w-full">
      <div class="flex justify-between items-center">
        <h1 class="w-full md:text-right font-bold border-b border-gray-100">
          <router-link :to="{name: 'home'}" class="block text-center p-4">
            Практика по Vue.js
          </router-link>
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

      <app-loading v-if="isLoading" />
      <app-error-message v-if="error" :message="error" />
      <ul v-if="lessons" id="menu" class="text-sm hidden md:block">
        <li
          v-for="lesson in lessons.length"
          :key="lesson"
          class="text-left border-b hover:bg-gray-100 transition ease-out duration-300"
        >
          <router-link
            :to="{name: `lesson${lesson}`}"
            class="block py-3 px-5"
            active-class="active"
          >
            Модуль #{{ lesson }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import AppLoading from '@/components/Loading'
import AppErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'AppNavbar',

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
  },

  mounted() {
    this.getCourse()
  },

  methods: {
    ...mapActions(['getCourse'])
  }
}
</script>
