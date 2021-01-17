<template>
  <div id="root" class="text-gray-600 font-base ">
    <div class="grid md:grid-cols-5 ">
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
          <ul id="menu" class="text-sm mt-2 hidden md:block">
            <li v-for="n in 11" :key="n" class="flex justify-end">
              <router-link v-if="n < 10" :to="{name: 'home'}" class="px-4 py-1">
                Урок №0{{ n }}
              </router-link>
              <router-link v-else :to="{name: 'home'}" class="px-4 py-1">
                Урок №{{ n }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <!-- end nav -->

      <main class="md:col-span-4 px-16 py-6 bg-gray-100 ">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
