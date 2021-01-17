<template>
  <div>
    <header>
      <h2 class="text-gray-700 text-3xl font-semibold">
        Практика по Vue.js
      </h2>
      <h3 class="text-md text-gray-500 font-semibold">
        Постигаем основные понятия, жизенный цикл компонентов, реактивность,
        пользовательские события, маршрутизация, глобальное хранилище, работа с
        формами, валидация...
      </h3>
    </header>
    <div>
      <h4 class="font-bold mt-5 pb-2 border-b">Список уроков</h4>
      <div class="mt-4 grid lg:grid-cols-3 gap-5">
        <!-- cards go here -->
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
export default {
  name: 'Home',

  computed: {
    ...mapState({
      isLoading: state => state.course.isLoading,
      error: state => state.course.error,
      lessons: state => state.course.data
    })
  },
  mounted() {
    this.$store.dispatch('getCourse')
  }
}
</script>
