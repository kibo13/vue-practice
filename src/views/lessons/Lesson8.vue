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
      <div class="mb-2">
        <span class="title">Задание:&nbsp;</span>подключить переиспользуемый
        компонент модального окна из предыдущего модуля. Перенести метод
        определяющий, что контент проскроллен из данного компонента в миксин.
        Затем создать плагин и подключить в него миксин, чтобы тот стал доступен
        для каждого компонента(глобально). После проверить работу модального
        окна через глобальный миксин. Дополнительно необходимо создать простой
        текстовый редактор с возможностью форматирования текста, которой ввел
        пользователь. Для форматирования текста использовать сторонний пакет
        фильтров
        <a
          href="https://www.npmjs.com/package/marked"
          target="_blank"
          class="link"
          >marked</a
        >.
      </div>
      <!-- END task -->

      <!-- Start result -->
      <div class="mb-2">
        <div class="flex flex-col items-start">
          <button @click="openModal" class="btn-primary">
            Теория
          </button>
          <div class="w-full">
            <label for="text" class="px-1 title text-sm">Исходный текст:</label>
            <textarea
              id="text"
              class="h-20 w-full input resize-none"
              v-model="text"
            ></textarea>
          </div>
          <div class="w-full">
            <label class="px-1 title text-sm">Отфильтрованный текст:</label>
            <div
              class="w-full px-2 bg-white rounded break-words"
              :inner-html.prop="text | marked"
            ></div>
          </div>
        </div>
        <app-modal v-if="isModal" title="Теория" @close="isModal = false">
          <template v-slot:content>
            <ul class="flex flex-col">
              <li>
                <span class="title">Миксины</span> это объект, структура
                которого аналогична структуре компонента только миксин не
                содержит разделов template и style. При использовании
                компонентом миксина, все опции(методы и свойства) миксина
                «подмешиваются» к собственным опциям компонента. Если миксин и
                компонент содержат пересекающиеся опции, то приоритет отдается
                опциям компонента.
              </li>
              <li>
                <span class="title">Плагин</span> - это спeциальный мoдуль,
                который подключается к программе, чтобы расширить её
                возможности. Плагины позволяют добавить во Vue некоторую
                глобальную функциональность.
              </li>
              <li>
                <span class="title">Фильтры</span> - функции, которые находятся
                в объекте filters. Они позволяют отформатировать текст
                определенным образом перед его выводом на веб-страницу, то есть
                осуществляют предобработку значений. Фильтры могут быть
                глобальными, то есть использоваться для любого компонента в
                приложении. И также фильтры могут быть локальными, то есть
                определенными только для одного компонента. Когда у глобального
                фильтра такое же имя как и у локального, то локальный фильтр
                будет приоритетнее. Так как фильтры являются
                JavaScript-функциями, и потому могут принимать параметры.
              </li>
            </ul>
          </template>
        </app-modal>
      </div>
      <!-- End result -->

      <!-- Start detail -->
      <div>
        <h4 class="title">Решение:</h4>
        <div>
          Создадим разметку, в которую подключим компонент модального окна и
          создадим кнопку для вызова модального окна. И поместим внутрь другой
          произвольный контент для разнообразия.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;button @click="openModal"&gt;Теория&lt;/button&gt;</span><span class="block">&lt;app-modal v-if="isModal" title="Теория" @close="isModal = false"&gt;  </span><span class="block">  &lt;template v-slot:content&gt;</span><span class="block">    Контент...</span><span class="block">  &lt;/template&gt;</span><span class="block">&lt;/app-modal&gt;</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">import AppModal from '@/components/AppModal'  </span><br /><span class="block">export default {</span><span class="block">  name: 'app',</span><span class="block">  components: {</span><span class="block">    AppModal</span><span class="block">  },</span><br /><span class="block">  data() {</span><span class="block">    return {</span><span class="block">      isModal: false</span><span class="block">    }</span><span class="block">  },</span><br /><span class="block">  methods: {</span><span class="block">    openModal() {</span><span class="block">      this.isModal = true</span><span class="block">    }</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Создадим в <span class="lighting">`./src`</span> папку mixins, внутри
          которой создадим файл scrollHandler.js и перенесем туда метод
          onBodyScroll из компонента Modal.vue. Изменим имя метода на
          <span class="title">onScroll</span> и уберем refs. Так как в функцию
          при событии scroll передается event, то воспользуемся свойством
          target, чтобы получить доступ к DOM-элементу, на котором сработало это
          событие. Создадим метод <span class="title">onScrollEnd</span>,
          который будет выполняться тогда, когда пользователь проскроллит
          контент до конца. Поместим в него сообщение о том, что событие
          произошло, а в самом компоненте переопределим данный метод, в котором
          будем менять состояние кнопки. В разметке компонента Modal.vue уберем
          refs и изменим метод на <span class="title">onScroll</span>.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// scrollHandler.js</span><span class="block">export default {</span><span class="block">  methods: {</span><span class="block">    <span class="title">onScrollEnd</span>() {</span><span class="block">      console.warn('You must override onScrollEnd method')</span><span class="block">    },</span><br /><span class="block">    <span class="title">onScroll</span>(event) {</span><span class="block">      const content = event.target</span><span class="block">      if (content.clientHeight + content.scrollTop >= content.scrollHeight) {  </span><span class="block">        this.<span class="title">onScrollEnd</span>()</span><span class="block">      }</span><span class="block">    }</span><span class="block">  }</span><span class="block">}</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// Modal.vue</span><span class="block">methods: {</span><span class="block">  closeModal() { &middot;&middot;&middot;</span><span class="block">  },</span><br /><span class="block">  <span class="title">onScrollEnd</span>() {</span><span class="block">    this.isRead = true</span><span class="block">  }</span><span class="block">}</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block italic">&lt;!-- Modal.vue --&gt;</span><span class="block">&lt;div class="modal-bg"&gt;</span><span class="block">  &lt;div class="modal-form"&gt;</span><br /><span class="block italic">    &lt;!-- блок "Header" --&gt;</span><span class="block">    &lt;div class="modal-form__header"&gt; &middot;&middot;&middot;</span><span class="block">    &lt;/div&gt;</span><br /><span class="block italic">    &lt;!-- блок "Content" --&gt;</span><span class="block">    &lt;div</span><span class="block">      class="modal-form__content"</span><span class="block">      style="height: 200px; overflow-y: auto;"  </span><span class="block">      @scroll="<span class="title">onScroll</span>"</span><span class="block">    &gt;</span><span class="block">      &lt;slot name="content"&gt;&lt;/slot&gt;</span><span class="block">    &lt;/div&gt;</span><br /><span class="block italic">    &lt;!-- блок "Footer" --&gt;</span><span class="block">    &lt;div class="modal-form__footer"&gt; &middot;&middot;&middot;</span><span class="block">    &lt;/div&gt;</span><br /><span class="block">  &lt;/div&gt;</span><span class="block">&lt;/div&gt;</span></code></pre>
        </div>
        <div>
          Создадим в <span class="lighting">`./src`</span> папку plugins, внутри
          которой создадим файл myPlugin.js. Затем подключим внутрь этого
          плагина миксин, чтобы тот стал доступен глобально.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// myPlugin.js</span><span class="block">import ScrollHandlerMixin from '@/mixins/scrollHandler'  </span><br /><span class="block">export default {</span><span class="block">  install(Vue) {</span><span class="block">    Vue.mixin(ScrollHandlerMixin)</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Подключим плагин в файл <span class="lighting">`./src/main.js`</span>.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// main.js</span><span class="block">import ...</span><span class="block">import MyPlugin from '@/plugins/myPlugin'  </span><br /><span class="block">Vue.use(MyPlugin)</span><br /><span class="block">new Vue({</span><span class="block">  &middot;&middot;&middot;</span><span class="block">}).$mount('#app')</span></code></pre>
        </div>
        <div>
          Теперь реализуем текстовый редактор, но сперва установим в проект
          сторонний пакет фильтров
          <span class="title">marked</span> командой:
          <pre
            class="code-wrapper"
          ><code class="code">npm install marked</code></pre>
        </div>
        <div>
          После успешной установки подключим данный пакет в файл
          <span class="lighting">`./src/main.js`</span>.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// main.js</span><span class="block">import ...</span><span class="block">import marked from 'marked'</span><br /><span class="block">...</span><span class="block">Vue.filter('marked', marked)</span><br /><span class="block">new Vue({</span><span class="block">  &middot;&middot;&middot;</span><span class="block">}).$mount('#app')</span></code></pre>
        </div>
        <div>
          Создадим в разметке многострочное текстовое поле textarea, в которое
          пользователь будет вводить исходный текст. Объявим в data переменную
          text, которую привяжем к полю textarea при помощи директивы v-model.
          Чтобы пользователь смог вводить не только строки, но и html применим к
          блоку, в который будет выводиться отфильтрованный текст, свойство
          inner-html c модификаторов prop и передадим туда переменную text и
          фильтр <span class="title">marked</span>.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block italic">// Исходный текст</span><span class="block">&lt;div&gt;</span><span class="block">  &lt;label for="text"&gt;Исходный текст:&lt;/label&gt;</span><span class="block">  &lt;textarea id="text" v-model="text"&gt;&lt;/textarea&gt;  </span><span class="block">&lt;/div&gt;</span><br /><span class="block italic">// Отфильтрованный текст</span><span class="block">&lt;div&gt;</span><span class="block">  &lt;label&gt;Отфильтрованный текст:&lt;/label&gt;</span><span class="block">  &lt;div :inner-html.prop="text | <span class="title">marked</span>"&gt;&lt;/div&gt;</span><span class="block">&lt;/div&gt;</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">data() {</span><span class="block">  return {</span><span class="block">    isModal: false,</span><span class="block">    text: ''</span><span class="block">  }</span><span class="block">}</span></code></pre>
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
import AppModal from '@/components/Modal'

export default {
  name: 'AppLesson8',
  components: {
    AppLoading,
    AppErrorMessage,
    AppModal
  },

  data() {
    return {
      id: 8,
      code: {html: 'html', js: 'js'},
      isModal: false,
      text: `<p class="text-blue-500">Hello World</p>`
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

    getOffset() {
      let paddingOffset = 0
      if (this.isModal) {
        paddingOffset = window.innerWidth - document.body.offsetWidth + 'px'
      }
      return paddingOffset
    }
  },

  watch: {
    isModal() {
      if (this.isModal) {
        document.body.style.paddingRight = this.getOffset
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.paddingRight = 0
        document.body.style.overflow = 'auto'
      }
    }
  },

  methods: {
    openModal() {
      window.scrollTo(0, 0)
      this.isModal = true
    }
  }
}
</script>
