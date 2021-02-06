<template>
  <div class="modal-bg">
    <div class="modal-form">
      <div class="modal-form__header">
        <h2 class="title text-base md:text-lg">{{ title }}</h2>
        <button @click="closeModal" class="hover:text-gray-600 slow">
          &#10006;
        </button>
      </div>
      <div
        style="height: 200px"
        class="modal-form__content"
        ref="modalBody"
        @scroll="onBodyScroll"
      >
        <slot name="content"></slot>
      </div>
      <div class="modal-form__footer">
        <button
          class="my-2 px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          :class="{'hover:bg-blue-600': isRead}"
          :disabled="!isRead"
          @click="closeModal"
        >
          Прочитал
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',

  props: {
    title: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      isRead: false
    }
  },

  methods: {
    closeModal() {
      this.$emit('close')
    },

    onBodyScroll() {
      const modalBody = this.$refs.modalBody
      if (
        modalBody.clientHeight + modalBody.scrollTop >=
        modalBody.scrollHeight
      ) {
        this.isRead = true
      } else {
        this.isRead = false
      }
    }
  }
}
</script>
