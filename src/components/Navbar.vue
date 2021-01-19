<template>
  <div>
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

      <ul id="menu" class="text-sm mt-2 hidden md:block">
        <li
          v-for="lesson in lessonsCount"
          :key="lesson"
          class="flex justify-end"
        >
          <router-link :to="{name: `lesson${lesson}`}">
            Урок {{ lesson }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'AppNavbar',

  computed: {
    ...mapGetters(['lessonsCount'])
  },

  methods: {
    ...mapActions(['fetchLessons'])
  },

  async mounted() {
    this.fetchLessons()
  }
}
</script>
