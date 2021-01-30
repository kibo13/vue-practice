<template>
  <div class="card py-2 px-4 flex flex-col items-start ">
    <p class="w-full flex justify-center">
      <img :src="imgUrl" alt="" />
    </p>
    <p>{{ title }}</p>
    <p class="title text-xl">{{ price }} &#8381;</p>
    <p class="text-xs">на складе {{ count }} шт.</p>
    <button class="btn-primary">
      В корзину
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppProductCard',
  props: {
    title: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    imgUrl: {
      type: String,
      required: false,
      default: require('@/assets/images/lesson_04/photo.png')
    }
  }
}
</script>
