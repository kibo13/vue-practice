<template>
  <div class="flex justify-between">
    <input
      type="text"
      class="my-2 mr-2 input w-full"
      v-model="searchText"
      placeholder="Поиск..."
    />
    <button @click="$emit('search', searchText)" class="btn-primary">
      Найти
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppSearch',
  data() {
    return {
      searchText: ''
    }
  }
}
</script>
