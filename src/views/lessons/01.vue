<template>
  <div class="info">
    <app-loading v-if="isLoading" class="my-2 py-2" />
    <app-error-message v-if="error" :message="error" class="my-2 py-2" />

    <div v-if="getLesson.id">
      <h4 class="my-2 py-2 border-b">
        <span class="title">Модуль #{{ getLesson.id }}&nbsp;/&nbsp;</span>
        <span>{{ getLesson.title }}</span>
      </h4>

      <!-- Start task -->
      <div class="mb-2">
        <span class="title">Задание:&nbsp;</span>реализовать простую панель
        управления для выбора количества продуктов, которая состоит из двух
        кнопок и поля (input). При помощи кнопок увеличиваем (уменьшаем)
        количество товаров в input на 1. Поле input принимает числа в диапазоне
        от 1 до 10.
      </div>
      <!-- END task -->

      <!-- Start result -->
      <div class="mb-2">
        <button
          @click="increaseCounter"
          class="w-7 border hover:shadow-inner slow"
        >
          +
        </button>
        <input
          type="number"
          :min="minValue"
          :max="maxValue"
          :value="counter"
          class="mx-1 border"
          readonly
        />
        <button
          @click="decreaseCounter"
          class="w-7 border hover:shadow-inner slow"
        >
          -
        </button>
      </div>
      <!-- End result -->

      <!-- Start detail -->
      <div>
        <h4 class="title">Решение:</h4>
        <div>
          Сначала создадим разметку, в которую поместим следующие элементы:
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;button&gt;+&lt;/button&gt;</span><span class="block">&lt;input type="number" /></span><span class="block">&lt;button&gt;-&lt;/button&gt;</span></code></pre>
        </div>
        <div>
          Далее объявим в data переменные: counter для подсчета количества
          продуктов, minValue и maxValue для задания диапазона чисел от 1 до 10.
          При помощи директивы <span class="title">v-bind</span> привяжем
          переменные к полю input.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">data() {</span><span class="block">  return {</span><span class="block">    counter: '',</span><span class="block">    minValue: 1,</span><span class="block">    maxValue: 10</span><span class="block">  }</span><span class="block">}</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;button&gt;+&lt;/button&gt;</span><span class="block">&lt;input type="number"</span><span class="block">  <span class="title">v-bind:</span>min="minValue"</span><span class="block">  <span class="title">v-bind:</span>max="maxValue"</span><span class="block">  <span class="title">v-bind:</span>value="counter"</span><span class="block">/&gt;</span><span class="block">&lt;button&gt;-&lt;/button&gt;</span></code></pre>
        </div>
        <div>
          Затем в <span class="title">methods</span> создадим функции:
          increaseCounter и decreaseCounter. Методы сначала проверяют вхождение
          текущего количества продуктов в выше указанный диапазон (от 1 до 10),
          а после увеличивают (уменьшают) количество продуктов на 1. При помощи
          директивы <span class="title">v-on</span> привяжем функции к кнопкам.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block"><span class="title">methods</span>: {</span><span class="block">  increaseCounter() {</span><span class="block">    if (this.counter &lt; this.maxValue) {  </span><span class="block">      this.counter++</span><span class="block">    }</span><span class="block">  }</span><br /><span class="block">  decreaseCounter() {</span><span class="block">    if (this.counter &gt; this.minValue) {  </span><span class="block">      this.counter--</span><span class="block">    }</span><span class="block">  }</span><span class="block">}</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;button <span class="title">v-on:</span>click="increaseCounter"&gt;+&lt;/button&gt;  </span><span class="block">&lt;input type="number"</span><span class="block">  <span class="title">v-bind:</span>min="minValue"</span><span class="block">  <span class="title">v-bind:</span>max="maxValue"</span><span class="block">  <span class="title">v-bind:</span>value="counter"</span><span class="block">/&gt;</span><span class="block">&lt;button <span class="title">v-on:</span>click="decreaseCounter"&gt;-&lt;/button&gt;  </span></code></pre>
        </div>
      </div>
      <!-- End detail -->
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppLoading from '@/components/Loading'
import AppErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'AppLesson1',
  components: {
    AppLoading,
    AppErrorMessage
  },

  data() {
    return {
      id: 1,
      code: {html: 'html', js: 'js'},
      counter: '',
      minValue: 1,
      maxValue: 10
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.course.isLoading,
      error: state => state.course.error
    }),

    getLesson() {
      return this.$store.getters.getLessonById(this.id)
    }
  },

  methods: {
    increaseCounter() {
      if (this.counter < this.maxValue) {
        this.counter++
      }
    },

    decreaseCounter() {
      if (this.counter > this.minValue) {
        this.counter--
      }
    }
  }
}
</script>
