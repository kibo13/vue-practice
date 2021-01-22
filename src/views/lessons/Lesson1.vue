<template>
  <div class="info">
    <h4 class="mt-5 pb-2 border-b">
      <span class="title">Модуль #{{ id }}&nbsp;/&nbsp;</span>
      <app-loading v-if="isLoading" />
      <app-error-message v-if="error" :message="error" />
      <span>{{ getLesson.title }}</span>
    </h4>
    <div class="mt-2">
      <!-- Start task -->
      <div>
        <span class="title">Задание:&nbsp;</span>необходимо реализовать обычную
        панель управления для выбора количества продуктов, которая состоит из
        двух кнопок и поля (input). При помощи кнопок увеличиваем (уменьшаем)
        количество товаров в input на 1. Поле input принимает числа в диапазоне
        от 1 до 10.
      </div>
      <!-- END task -->

      <!-- Start detail -->
      <div class="mt-2">
        <h4 class="title">Решение:</h4>
        <div>
          Сначала создадим разметку, в которую поместим следующие элементы:
          <pre class="code">
      <code :data-code=code.html>  
      &lt;button&gt;+&lt;/button&gt;
      &lt;input type="number" />
      &lt;button&gt;-&lt;/button&gt;
      </code>
          </pre>
        </div>
        <div>
          Далее объявим в data переменные: counter для подсчета количества
          продуктов, minValue и maxValue для задания диапазона чисел от 1 до 10.
          При помощи директивы <span class="title">v-bind</span> привяжем
          переменные к полю input.
          <pre class="code">
      <code :data-code=code.js>  
      data() {
        return {
          counter: '',
          minValue: 1,
          maxValue: 10
        }
      }
      </code>
          </pre>
          <pre class="code">
      <code :data-code=code.html>  
      &lt;button&gt;+&lt;/button&gt;
      &lt;input
        type="number" 
        <span class="title">v-bind:</span>min="minValue" 
        <span class="title">v-bind:</span>max="maxValue" 
        <span class="title">v-bind:</span>value="counter" 
      />
      &lt;button&gt;-&lt;/button&gt;
      </code>
          </pre>
        </div>
        <div>
          Затем в <span class="title">methods</span> создадим функции:
          increaseCounter и decreaseCounter. Методы сначала проверяют вхождение
          текущего количества продуктов в выше указанный диапазон (от 1 до 10),
          а после увеличивают (уменьшают) количество продуктов на 1. При помощи
          директивы <span class="title">v-on</span> привяжем функции к кнопкам.
          <pre class="code">
      <code :data-code=code.js>  
      <span class="title">methods</span>: {
        increaseCounter() {
          if (this.counter &lt; this.maxValue) {
            this.counter++
          }
        },

        decreaseCounter() {
          if (this.counter &gt; this.minValue) {
            this.counter--
          }
        }
      }
      </code>
          </pre>
          <pre class="code">
      <code :data-code=code.html>  
      &lt;button <span class="title">v-on:</span>click="increaseCounter"&gt;+&lt;/button&gt;
      &lt;input
        type="number" 
        v-bind:min="minValue" 
        v-bind:max="maxValue" 
        v-bind:value="counter" 
      />
      &lt;button <span class="title">v-on:</span>click="decreaseCounter"&gt;-&lt;/button&gt;
      </code>
          </pre>
        </div>
      </div>
      <!-- End detail -->

      <!-- Start result -->
      <div class="mt-4">
        <h4 class="title">Результат:</h4>
        <h4 class="mb-1">
          Выберите количество продуктов:
        </h4>
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
