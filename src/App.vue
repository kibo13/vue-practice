<template>
  <div class="grid md:grid-cols-5 text-gray-600 font-base">
    <!-- Start navbar -->
    <app-navbar class="md:col-span-1 md:flex md:justify-end" />
    <!-- End navbar -->

    <main class="md:col-span-4 px-16 py-6 bg-gray-100 ">
      <!-- Start header -->
      <app-header />
      <!-- End header -->

      <!-- Start view -->
      <router-view />
      <!-- End view -->
    </main>
  </div>
</template>

<script>
import AppNavbar from '@/components/Navbar'
import AppHeader from '@/components/Header'

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppHeader
  }
}
</script>
