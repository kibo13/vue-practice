<template>
  <div class="flex justify-between">
    <input
      type="text"
      class="my-2 mr-2 px-2 py-1 w-full shadow-sm rounded"
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
