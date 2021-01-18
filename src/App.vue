<template>
  <div id="root" class="text-gray-600 font-base">
    <div class="grid md:grid-cols-5">
      <asidebar />
      <!-- end asidebar -->

      <main class="md:col-span-4 px-16 py-6 bg-gray-100 ">
        <header>
          <h2 class="text-gray-700 text-3xl font-semibold">
            Практика по Vue.js
          </h2>
          <h3 class="text-md text-gray-500 font-semibold">
            Постигаем основные понятия, жизенный цикл компонентов, реактивность,
            пользовательские события, маршрутизация, глобальное хранилище,
            работа с формами, валидация...
          </h3>
        </header>

        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Asidebar from '@/components/Asidebar.vue'
export default {
  name: 'App',
  components: {Asidebar}
}
</script>
