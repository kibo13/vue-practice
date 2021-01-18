<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'AppErrorMessage',
  props: {
    message: {
      type: String,
      required: false,
      default: 'Что-то пошло не так'
    }
  }
}
</script>
