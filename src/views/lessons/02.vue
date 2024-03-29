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
        <span class="title">Задание:&nbsp;</span>реализовать вывод списка имен и
        соответствующий поиск по ним. Поиск не должен реагировать на регистр.
      </div>
      <!-- END task -->

      <!-- Start result -->
      <div class="mb-2">
        <div>
          <input
            type="text"
            @input="searchText = $event.target.value"
            class="input w-full md:w-auto"
            placeholder="Поиск..."
          />
        </div>
        <ul>
          <li v-for="(name, i) in getFilteredNames" :key="i" class="px-1 pt-1">
            {{ name }}
          </li>
        </ul>
      </div>
      <!-- End result -->

      <!-- Start detail -->
      <div>
        <h4 class="title">Решение:</h4>
        <div>
          Создадим в data следующие переменные: names - простой массив, который
          будет содержать несколько произвольных имен и searchText - пустая
          строка, которая будет получать данные, вводимые через input.
          <pre
            class="code-wrapper "
          ><code :data-code=code.js class="code"><span class="block">data() {</span><span class="block">  return {</span><span class="block">    names: ['Артём', 'Алина', 'Евгений', 'Александр', 'Анна'],  </span><span class="block">    searchText: ''</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Далее в свойстве <span class="title">computed</span> создадим метод -
          getFilteredNames. Данный метод возвращает отфильтрованный массив names
          по значению в переменной searchText. Чтобы поиск не реагировал на
          регистр используем метод toLowerCase.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block title">computed: {</span><span class="block">  getFilteredNames() {</span><span class="block">    return this.names.filter(name => name.toLowerCase().includes(this.searchText.toLowerCase()))  </span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Теперь создадим разметку, добавим поле input и список ul для поиска и
          отображения списка имен. Используем директиву
          <span class="title">v-on</span> для обработки данных, которые вводит
          пользователь через input. Список имен выводим, используя директиву
          <span class="title">v-for</span>.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;div&gt;</span><span class="block">  &lt;input</span><span class="block">    type="text"</span><span class="block">    <span class="title">v-on</span>:input="searchText = $event.target.value" </span><span class="block">    placeholder="Поиск..."</span><span class="block">  /></span><span class="block">&lt;/div&gt;</span><span class="block">&lt;ul&gt;</span><span class="block">  &lt;li <span class="title">v-for</span>="(name, i) in getFilteredNames" :key="i" class="p-1"&gt;  </span><span class="block">    {<span>{</span> name <span>}</span>}</span><span class="block">  &lt;/li&gt;</span><span class="block">&lt;/ul&gt;</span></code></pre>
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
  name: 'AppLesson2',
  components: {
    AppLoading,
    AppErrorMessage
  },

  data() {
    return {
      id: 2,
      code: {html: 'html', js: 'js'},
      names: ['Артём', 'Алина', 'Евгений', 'Александр', 'Анна'],
      searchText: ''
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

    getFilteredNames() {
      return this.names.filter(name =>
        name.toLowerCase().includes(this.searchText.toLowerCase())
      )
    }
  },

  methods: {}
}
</script>
