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
        <span class="title">Задание:&nbsp;</span> подключить библиотеку
        <a href="https://vuex.vuejs.org/ru/" target="_blank" class="link">
          Vuex
        </a>
        в задание из предыдущего модуля и настроить это централизованное
        хранилище данных. Реализовать передачу данных из хранилища в компоненты.
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
          Библиотека <span class="title">Vuex</span> служит централизованным
          хранилищем данных для всех компонентов приложения. Отличия этого
          хранилища от простого глобального объекта:
          <span class="title">первое</span> -
          <span class="border-b border-gray-300"
            >реактивность, то есть когда компоненты полагаются на его состояние,
            то они будут реактивно обновляться, если состояние хранилища
            изменяется</span
          >; <span class="title">второе</span> -
          <span class="border-b border-gray-300"
            >нельзя напрямую изменять состояние хранилища. Единственный способ
            внести изменения — явно вызвать мутацию</span
          >. Подключим библиотеку в проект следующей командой:
          <pre
            class="code-wrapper"
          ><code class="code">npm install vuex</code></pre>
        </div>
        <div>
          В корне приложения создадим директорию
          <span class="lighting">store</span>, внутри которой создадим файл
          index.js и подключим его в файл
          <span class="lighting">`./src/main.js`</span>.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// main.js</span><span class="block">import ...</span><span class="block">import <span class="title">store</span> from '@/store'</span><br /><span class="block">new Vue({</span><span class="block">  router,</span><span class="block">  <span class="title">store</span>,</span><span class="block">  render: h => h(App)</span><span class="block">}).$mount('#app')</span></code></pre>
        </div>
        <div>
          Перейдем к настройке глобального хранилища и для начала в
          <span class="lighting">`./src/store`</span> создадим директорию
          <span class="lighting">modules</span>, внутри которой создадим файл
          films.js. Зарегистрируем этот модуль в файле index.js.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// index.js</span><span class="block">import Vue from 'vue'</span><span class="block">import Vuex from 'vuex'</span><br /><span class="block">import <span class="title">films</span> from '@/store/modules/films'  </span><br /><span class="block">Vue.use(Vuex)</span><br /><span class="block">export default new Vuex.Store({</span><span class="block">  modules: {</span><span class="block">    <span class="title">films</span></span><span class="block">  }</span><span class="block">})</span></code></pre>
        </div>
        <div>
          Далее опишем структуру созданного модуля. Каждый модуль может
          содержать собственное состояние, мутации, действия, геттеры и даже
          встроенные подмодули. Импортируем массив фильмов в модуль films. Так
          как отсутствует сервер реализуем имитацию запроса на back-end, а
          именно создадим функцию getFilms, которая будет возвращать promise,
          внутри которого создадим определенную задержку с помощью функции
          setTimeout. После окончания этой задержки функцией resolve будем
          передавать массив films.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// films.js</span><span class="block">import films from '@/mocks/films'</span><br /><span class="block">const getFilms = time => {</span><span class="block">  return new Promise(resolve => {</span><span class="block">    setTimeout(() => {</span><span class="block">      resolve(films)</span><span class="block">    }, time)</span><span class="block">  })</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Далее добавим в модуль films объект <span class="title">state</span>,
          внутрь которого положим массив data. Объект
          <span class="title">state</span> похож на свойство data в структуре
          отдельных компонентов, за исключением того, что к
          <span class="title">state</span> можно получить доступ более чем из
          одного компонента, и, когда
          <span class="title">state</span> обновляется, все компоненты,
          обращающиеся к нему, также получат эти изменения.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// films.js</span><span class="block">...</span><br /><span class="block">const <span class="title">state</span> = {</span><span class="block">  data: []</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Далее добавим в модуль films объект
          <span class="title">mutations</span>, внутри которого создадим мутацию
          SET_FILMS, которая будет заносить информацию о фильмах в переменную
          data из state. В качестве аргументов мутация принимает два параметра:
          state и payload - это просто данные, которые будут использоваться для
          обновления состояния. Мутации - единственный способ, с помощью
          которого можно обновить state. Они выполняют одну и только одну задачу
          - <span class="border-b border-gray-300">установить состояние</span>.
          Мутации <span class="border-b border-gray-300">синхронны</span>, и
          поэтому мы не можем выполнять асинхронные задачи в них.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// films.js</span><span class="block">...</span><br /><span class="block">const <span class="title">mutations</span> = {</span><span class="block">  SET_FILMS(state, payload) {</span><span class="block">    state.data = payload</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Далее добавим в модуль films объект
          <span class="title">actions</span>, внутри которого создадим
          асинхронную функцию getFilms. Внутри этой функции напишем вызов
          функции getFilms, которую реализовали выше как имитацию запроса на
          back-end. Результат функции поместим в переменную films. Методом
          commit вызовем мутацию и в качестве аргументов укажем имя мутации
          SET_FILMS и переменную films. Действия косвенно изменяют хранилище при
          помощи метода вызова мутации - commit. Их главная особенность -
          <span class="border-b border-gray-300">асинхронность</span>, которая
          позволяет им обрабатывать такие вещи, как вызовы API, взаимодействие с
          пользователем и целые потоки действий.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// films.js</span><span class="block">...</span><br /><span class="block">const <span class="title">actions</span> = {</span><span class="block">  async getFilms(context, payload) {</span><span class="block">    try {</span><span class="block">      const films = await getFilms(payload)  </span><span class="block">      context.commit('SET_FILMS', films)</span><span class="block">    } catch (error) {</span><span class="block">      console.error(error)</span><span class="block">    }</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Экспортируем эти три объекта в модуль films.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// films.js</span><span class="block">...</span><br /><span class="block">export default {</span><span class="block">  state,</span><span class="block">  mutations,</span><span class="block">  actions</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Теперь осталось вызвать данный actions из какого-нибудь компонента.
          Для этого откроем корневой компонент App.vue и в методе жизненного
          цикла created обратимся к хранилищу через
          <span class="title">$store</span> и методом
          <span class="title">dispatch</span> вызовем actions, в который
          передадим имя actions getFilms и задержку.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// App.vue</span><span class="block">created() {</span><span class="block">  this.<span class="title">$store</span>.<span class="title">dispatch</span>('getFilms', 1000)  </span><span class="block">}</span></code></pre>
        </div>
        <div>
          Для получения списка фильмов и информации о каждом фильме по
          отдельности воспользуемся вспомогательной функцией
          <span class="title">mapState</span>, которую импортируем в компоненты
          Home.vue и Film.vue. Затем вызовем эту функцию в свойстве computed,
          где в качестве аргумента передадим объект. И для компонента Film.vue в
          свойстве computed добавим ещё одно свойство film, которое будет
          возвращать информацию об определенном фильме.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// Home.vue</span><span class="block">import {<span class="title">mapState</span>} from 'vuex'</span><br /><span class="block">export default {</span><span class="block">  name: 'Home',</span><span class="block">  computed: {</span><span class="block">    ...<span class="title">mapState</span>({</span><span class="block">      films: state => state.films.data  </span><span class="block">    })</span><span class="block">  }</span><span class="block">}</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// Film.vue</span><span class="block">import {<span class="title">mapState</span>} from 'vuex'</span><br /><span class="block">export default {</span><span class="block">  name: 'Film',</span><span class="block">  computed: {</span><span class="block">    ...<span class="title">mapState</span>({</span><span class="block">      films: state => state.films.data</span><span class="block">    }),</span><br /><span class="block">    film() {</span><span class="block">      return this.films.find(film => film.id == this.$route.params.id)  </span><span class="block">    }</span><span class="block">  }</span><span class="block">}</span></code></pre>
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
      id: 10,
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
