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
        <span class="title">Задание:&nbsp;</span>реализовать онлайн-кинотеатр, в
        котором есть список фильмов и информация о каждом фильме по отдельности.
        Использовать библиотеку маршрутизации
        <a href="https://router.vuejs.org/ru/" target="_blank" class="link">
          Vue Router
        </a>
        .
      </div>
      <!-- END task -->

      <!-- Start result -->
      <div class="mb-2">
        <app-cinema />
      </div>
      <!-- End result -->

      <!-- Start detail -->
      <div>
        <h4 class="title">Решение:</h4>
        <div>
          Установим в проект библиотеку
          <span class="title">Vue Router</span> командой:
          <pre
            class="code-wrapper"
          ><code class="code">npm install vue-router</code></pre>
        </div>
        <div>
          После успешной установки подключим библиотеку в файл
          <span class="lighting">`./src/main.js`</span>.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// main.js</span><span class="block">import Vue from 'vue'</span><span class="block">import VueRouter from 'vue-router'</span><br /><span class="block">Vue.use(VueRouter)</span></code></pre>
        </div>
        <div>
          Создадим в папке
          <span class="lighting">`./src/views`</span> компоненты для отображения
          списка фильмов(Home.vue) и отдельного фильма(Film.vue). В зависимости
          от роута на котором находится пользователь будем показывать
          соответствующий компонент.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block italic">&lt;!-- Home.vue --&gt;</span><span class="block">&lt;section&gt;</span><span class="block">  &lt;h1&gt;Выбери фильм на свой вкус&lt;/h1&gt;</span><span class="block">  &lt;ul&gt;</span><span class="block">    &lt;li v-for="film in films" :key="film.id"&gt;</span><span class="block">      &lt;img :src="film.img" :alt="film.title" /&gt;</span><span class="block">      &lt;p&gt;{<span>{</span> film.title }}&lt;/p&gt;</span><span class="block">      &lt;p&gt;{<span>{</span> film.rating }}&lt;/p&gt;</span><span class="block">      &lt;router-link :to="{name: 'film', params: {id: film.id}}"&gt;  </span><span class="block">        Подробнее о фильме</span><span class="block">      &lt;/router-link&gt;</span><span class="block">    &lt;/li&gt;</span><span class="block">  &lt;/ul&gt;</span><span class="block">&lt;/section&gt;</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// Home.vue</span><span class="block">import films from '@/store/db'</span><br /><span class="block">export default {</span><span class="block">  name: 'Home',</span><span class="block">  data() {</span><span class="block">    return {</span><span class="block">      films</span><span class="block">    }</span><span class="block">  }</span><span class="block">}</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block italic">&lt;!-- Film.vue --&gt;</span><span class="block">&lt;section&gt;</span><span class="block">  &lt;h1&gt;{<span>{</span> film.title }}&lt;/h1&gt;</span><span class="block">  &lt;img :src="film.img" :alt="film.title" /&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;p&gt;Немного о сюжете:&lt;/p&gt;</span><span class="block">    &lt;p&gt;{<span>{</span> film.description }}&lt;/p&gt;</span><span class="block">  &lt;/div&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;p&gt;Рейтинг:&lt;/p&gt;</span><span class="block">    &lt;p&gt;{<span>{</span> film.rating }}&lt;/p&gt;</span><span class="block">  &lt;/div&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;p&gt;Актёрский состав:&lt;/p&gt;</span><span class="block">    &lt;p&gt;{<span>{</span> film.actors.join(', ') }}&lt;/p&gt;</span><span class="block">  &lt;/div&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;p&gt;Режиссеры:&lt;/p&gt;</span><span class="block">    &lt;p&gt;{<span>{</span> film.directors.join(', ') }}&lt;/p&gt;</span><span class="block">  &lt;/div&gt;</span><span class="block">&lt;/section&gt;</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// Film.vue</span><span class="block">import films from '@/store/db'</span><br /><span class="block">export default {</span><span class="block">  name: 'Film',</span><span class="block">  computed: {</span><span class="block">    film() {</span><span class="block">      return films.find(film => film.id == this.$route.params.id)  </span><span class="block">    }</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Далее в папке
          <span class="lighting">`./src/router`</span> создадим файл index.js, в
          который импортируем Vue Router и компоненты представления. Метод
          маршрутизатора принимает массив <span class="title">routes</span>,
          который состоит из объектов отдельных роутов. Каждый объект имеет
          несколько параметров: <span class="title">path</span> - путь, который
          отображается в адресной строке браузера;
          <span class="title">component</span> - компонент, который будет
          рендериться, когда пользователь перейдет по указанному
          <span class="title">path</span>; <span class="title">name</span> - имя
          роута.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// index.js</span><span class="block">import VueRouter from 'vue-router'</span><br /><span class="block">import Home from '@/views/Home'</span><span class="block">import Film from '@/views/Film'</span><br /><span class="block">export default new VueRouter({</span><span class="block">  <span class="title">routes</span>: [</span><span class="block">    {</span><span class="block">      <span class="title">path</span>: '/',</span><span class="block">      <span class="title">name</span>: 'home',</span><span class="block">      <span class="title">component</span>: Home</span><span class="block">    },</span><span class="block">    {</span><span class="block">      <span class="title">path</span>: '/:id',</span><span class="block">      <span class="title">name</span>: 'film',</span><span class="block">      <span class="title">component</span>: Film</span><span class="block">    }</span><span class="block">  ]</span><span class="block">})</span></code></pre>
        </div>
        <div>
          Подключим сконфигурированный роутер в файл
          <span class="lighting">`./src/main.js`</span>.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// main.js</span><span class="block">import ...</span><span class="block">import <span class="title">router</span> from '@/router'</span><br /><span class="block">Vue.use(VueRouter)</span><br /><span class="block">new Vue({</span><span class="block">  <span class="title">router</span>,</span><span class="block">  render: h => h(App)</span><span class="block">}).$mount('#app')</span></code></pre>
        </div>
        <div>
          Осталось указать корневой компонент, в который будут вставляться все
          view-компоненты в зависимости от роута. Для этого существует
          специальный тег <span class="lighting">&lt;router-view&gt;</span> -
          тег, содержащий все компоненты, и возвращает компонент,
          соответствующий текущему маршруту. Поместим этот тег в компонент
          App.vue.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block italic">&lt;!-- App.vue --&gt;</span><span class="block">&lt;div id="app"&gt;</span><span class="block">  &lt;<span class="title">router-view</span> /&gt;</span><span class="block">&lt;/div&gt;</span></code></pre>
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
import AppCinema from '@/components/Cinema'

export default {
  name: 'AppLesson9',
  components: {
    AppLoading,
    AppErrorMessage,
    AppCinema
  },

  data() {
    return {
      id: 9,
      code: {html: 'html', js: 'js'}
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

  methods: {}
}
</script>
