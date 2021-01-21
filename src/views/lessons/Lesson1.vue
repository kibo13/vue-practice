<template>
  <div class="">
    <h4 class="mt-5 pb-2 title border-b">
      <span>Модуль #{{ id }} / </span>
      <app-loading v-if="isLoading" class="info" />
      <app-error-message v-if="error" :message="error" class="info" />
      <span class="info">
        {{ getLesson.title }}
      </span>
    </h4>
    <div class="mt-2">
      <!-- Start task -->
      <div>
        <span class="title">
          Задание:
        </span>
        <span class="info">
          необходимо реализовать обычную панель управления для выбора количества
          продуктов, которая состоит из двух кнопок и поля (input). При помощи
          кнопок увеличиваем (уменьшаем) количество товаров в input на 1. Поле
          input принимает числа в диапазоне от 1 до 10.
        </span>
      </div>
      <!-- END task -->

      <!-- Start detail -->
      <div class="info mt-2">
        <h4 class="title-mark">Решение:</h4>
        <div>
          Сначала создадим разметку, в которую поместим следующие элементы:
          <pre class="code">
      <code data-code="html">  
      <span><</span>button>+<span></</span>button>
      <span><</span>input type="number" />
      <span><</span>button>-<span></</span>button>
      </code>
          </pre>
        </div>
        <div>
          Далее объявим в data переменные: counter для подсчета количества продуктов, minValue и maxValue для задания диапазона чисел от 1 до 10. При помощи директивы <span class="title-mark">v-bind</span> привяжем переменные к полю input.
          <pre class="code">
      <code data-code="js">  
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
      <code data-code="html">  
      <span><</span>button>+<span></</span>button>
      <span><</span>input 
        type="number" 
        <span class="title-mark">v-bind:</span>min="minValue" 
        <span class="title-mark">v-bind:</span>max="maxValue" 
        <span class="title-mark">v-bind:</span>value="counter" 
      />
      <span><</span>button>-<span></</span>button>
      </code>
          </pre>
        </div>
        <div>
          Затем в <span class="title-mark">methods</span> создадим функции:  increaseCounter и decreaseCounter.
          Методы сначала проверяют вхождение текущего количества продуктов 
          в выше указанный диапазон (от 1 до 10), а после увеличивают (уменьшают) количество продуктов на 1. При помощи директивы <span class="title-mark">v-on</span> привяжем функции к кнопкам.
          <pre class="code">
      <code data-code="js">  
      <span class="title-mark">methods</span>: {
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
      </code>
          </pre>
          <pre class="code">
      <code data-code="html">  
      <span><</span>button <span class="title-mark">v-on:</span>click="increaseCounter">+<span></</span>button>
      <span><</span>input 
        type="number" 
        v-bind:min="minValue" 
        v-bind:max="maxValue" 
        v-bind:value="counter" 
      />
      <span><</span>button <span class="title-mark">v-on:</span>click="decreaseCounter">-<span></</span>button>
      </code>
          </pre>
        </div>
      </div>
      <!-- End detail -->

      <!-- Start result -->
      <div class="mt-4">
        <h4 class="title-mark">Результат:</h4>
        <h4 class="mb-1 text-sm md:text-base">
          Выберите количество продуктов:
        </h4>
        <button
          @click="increaseCounter"
          class="w-7 h-7 text-gray-400 border-2 border-gray-400 rounded rounded-r-none font-bold hover:bg-gray-400 hover:text-white slow"
        >
          +
        </button>
        <input
          type="number"
          :min="minValue"
          :max="maxValue"
          :value="counter"
          readonly
          class="border-t-2 border-b-2 border-gray-400"
        />
        <button
          @click="decreaseCounter"
          class="w-7 h-7 text-gray-400 border-2 border-gray-400 rounded rounded-l-none font-bold hover:bg-gray-400 hover:text-white slow"
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
