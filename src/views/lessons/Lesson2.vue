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
        <span class="title">Задание:&nbsp;</span>необходимо реализовать вывод
        списка имен и соответствующий поиск по ним. Поиск не должен реагировать
        на регистр.
      </div>
      <!-- END task -->

      <!-- Start detail -->
      <div class="mt-2">
        <h4 class="title">Решение:</h4>
        <div>
          Создадим в data следующие переменные: list - простой массив, который
          будет содержать несколько произвольных имен и search - пустая строка,
          которая будет получать данные, вводимые через input.
          <pre
            class="code-wrapper "
          ><code :data-code=code.js class="code"><span class="block">data() {</span><span class="block">  return {</span><span class="block">    list: ['Артём', 'Алина', 'Евгений', 'Александр', 'Анна'],  </span><span class="block">    search: ''</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Далее в свойстве <span class="title">computed</span> создадим метод
          поиска - getPersonByName. Данный метод перебирает массив list,
          сравнивая каждый элемент person с содержимым в переменной поля search,
          и возвращает новый массив элементов, которые соответствуют результату
          поиска. Чтобы поиск не реагировал на регистр используем метод
          toLowerCase.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block title">computed: {</span><span class="block">  getPersonByName() {</span><span class="block">    const search = this.search.toLowerCase()</span><span class="block">    let list = this.list</span><span class="block">    let persons = []</span><br /><span class="block">    list.forEach(person => {</span><span class="block">     if (person.toLowerCase().indexOf(search) != -1) persons.push(person)  </span><span class="block">    })</span><br /><span class="block">    return persons</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Теперь создадим разметку, добавим поле input и список ul для поиска и
          отображения списка имен. Используем директиву
          <span class="title">v-model</span> для двунаправленного связывания
          данных с полем input через переменную search, то есть значение
          переменной search можно менять как в коде программы, так и через поле
          input. Список имен выводим, используя директиву
          <span class="title">v-for</span>.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;div&gt;</span><span class="block">  &lt;input</span><span class="block">    type="text"</span><span class="block">    <span class="title">v-model</span>="search" </span><span class="block">    placeholder="Поиск..."</span><span class="block">  /></span><span class="block">&lt;/div&gt;</span><span class="block">&lt;ul&gt;</span><span class="block">  &lt;li <span class="title">v-for</span>="(person, i) in getPersonByName" :key="i" class="p-1"&gt;  </span><span class="block">    {<span>{</span> person <span>}</span>}</span><span class="block">  &lt;/li&gt;</span><span class="block">&lt;/ul&gt;</span></code></pre>
        </div>
      </div>
      <!-- End detail -->

      <!-- Start result -->
      <div class="mt-4">
        <h4 class="title">Результат:</h4>
        <div class="my-2">
          <input
            type="text"
            v-model="search"
            class="px-2 py-1 rounded border"
            placeholder="Поиск..."
          />
        </div>
        <ul>
          <li v-for="(person, i) in getPersonByName" :key="i" class="p-1">
            {{ person }}
          </li>
        </ul>
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
  name: 'AppLesson2',
  components: {
    AppLoading,
    AppErrorMessage
  },

  data() {
    return {
      id: 2,
      code: {html: 'html', js: 'js'},
      list: ['Артём', 'Алина', 'Евгений', 'Александр', 'Анна'],
      search: ''
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.course.isLoading,
      error: state => state.course.error
    }),

    getLesson() {
      return this.$store.getters.getLessonById(this.id)
    },

    getPersonByName() {
      const search = this.search.toLowerCase()
      let list = this.list
      let persons = []

      list.forEach(person => {
        if (person.toLowerCase().indexOf(search) != -1) persons.push(person)
      })

      return persons
    }
  },

  methods: {}
}
</script>
