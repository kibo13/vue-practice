<template>
  <div>
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
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'AppHome',

  computed: {
    ...mapGetters(['lessons'])
  }
}
</script>
