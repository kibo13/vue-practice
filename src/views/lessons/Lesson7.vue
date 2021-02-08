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
        <span class="title">Задание:&nbsp;</span>реализовать вызов модального
        окна при клике на кнопку. Внутрь модального окна поместить произвольный
        контент и кнопку «Прочитал», которая по умолчанию неактивна. Содержимое
        контента должно прокручиваться. Написать логику, при которой кнопка
        "Прочитал" станет активной тогда, когда пользователь прокрутит
        содержимое контента до конца. Выполнить задание с применением slots и
        refs.
      </div>
      <!-- END task -->

      <!-- Start result -->
      <div class="mb-2">
        <span class="title">Жизненный цикл компонентов</span> - некоторая
        последовательность этапов, которая позволяет узнать когда компонент
        создается, добавляется в модель DOM, обновляется или уничтожается.
        <button @click="openModal" class="link text-sm">
          Читать далее &rarr;
        </button>
        <app-modal
          v-if="isModal"
          title="Хуки жизненного цикла"
          @close="isModal = false"
        >
          <template v-slot:content>
            <ul class="flex flex-col">
              <li>
                Между этими этапами вызываются функции, называемые
                <span class="title">хуками жизненного цикла</span>, с помощью
                которых можно выполнять свой код на определённых этапах.
              </li>
              <li>
                Ниже представлена диаграмма жизненного цикла.
                <img
                  src="@/assets/images/lesson_07/lifecycle.png"
                  class="object-cover"
                  alt=""
                />
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
          В data объявим логическую переменную isModal, отвечающую за
          показ(скрытие) модального окна и напишем метод openModal для вызова
          модального окна. Создадим разметку с произвольным текстом и кнопкой,
          на которую повесим метод openModal. Подключим компонент Modal.vue,
          добавим в вёрстку и повесим на него переменную isModal. Также
          передадим в компонент props(title) и привяжем событие @close.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">import AppModal from '@/components/AppModal'  </span><br /><span class="block">export default {</span><span class="block">  name: 'app',</span><span class="block">  components: {</span><span class="block">    AppModal</span><span class="block">  },</span><br /><span class="block">  data() {</span><span class="block">    return {</span><span class="block">      isModal: false</span><span class="block">    }</span><span class="block">  },</span><br /><span class="block">  methods: {</span><span class="block">    openModal() {</span><span class="block">      this.isModal = true</span><span class="block">    }</span><span class="block">  }</span><span class="block">}</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;span&gt;Жизненный цикл...&lt;/span&gt;</span><span class="block">&lt;button @click="openModal"&gt;Читать далее &rarr;&lt;/button&gt;</span><span class="block">&lt;app-modal</span><span class="block">  v-if="isModal"</span><span class="block">  title="Хуки жизненного цикла"</span><span class="block">  @close="isModal = false"</span><span class="block">/&gt;</span></code></pre>
        </div>
        <div>
          Затем в папке
          <span class="lighting">`./src/components`</span>создадим файл
          Modal.vue, внутри которого опишем props(title) и сгенерируем событие
          @close. Также в data создадим логическую переменную isRead, при помощи
          которой будем менять состояние кнопки "Прочитал".
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// Modal.vue</span><span class="block">props: {</span><span class="block">  title: {</span><span class="block">    type: String,</span><span class="block">    required: true</span><span class="block">  }</span><span class="block">},</span><br /><span class="block">data() {</span><span class="block">  return {</span><span class="block">    isRead: false</span><span class="block">  }</span><span class="block">},</span><br /><span class="block">methods: {</span><span class="block">  closeModal() {</span><span class="block">    this.$emit('close')</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Создадим разметку для модального окна, которую разделим на 3 части:
          header, content и footer. В блок "Header" поместим props title и
          кнопку "&#10006;", на которую повесим метод closeModal. Блоку
          "Content" зададим стили (высоту 200px и прокрутку), повесим на событие
          @scroll метод onBodyScroll и установим
          <span class="title">ref</span> - ссылка(параметр), с помощью которого
          будем ссылаться на текущий блок и управлять им. Внутрь блока поместим
          <span class="title">slots</span> - элементы в компоненте, которые
          заменяются контентом, который передается через родительский компонент.
          Они записываются, как обычный html-тег и имеют атрибут name, который
          по умолчанию имеет значение default. В блоке "Footer" будет
          расположена кнопка "Прочитал", на которую повесим метод closeModal и к
          атрибуту disabled привяжем переменную not isRead.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;div class="modal-bg"&gt;</span><span class="block">  &lt;div class="modal-form"&gt;</span><br /><span class="block italic">    &lt;!-- блок "Header" --&gt;</span><span class="block">    &lt;div class="modal-form__header"&gt;</span><span class="block">      &lt;h2&gt;{<span>{</span> title }}&lt;/h2&gt;</span><span class="block">      &lt;button @click="closeModal"&gt;&#10006;&lt;/button&gt;</span><span class="block">    &lt;/div&gt;</span><br /><span class="block italic">    &lt;!-- блок "Content" --&gt;</span><span class="block">    &lt;div</span><span class="block">      class="modal-form__content"</span><span class="block">      style="height: 200px; overflow-y: auto;"  </span><span class="block">      <span class="title">ref</span>="modalBody"</span><span class="block">      @scroll="onBodyScroll"</span><span class="block">    &gt;</span><span class="block">      &lt;<span class="title">slot</span> name="content"&gt;&lt;/<span class="title">slot</span>&gt;</span><span class="block">    &lt;/div&gt;</span><br /><span class="block italic">    &lt;!-- блок "Footer" --&gt;</span><span class="block">    &lt;div class="modal-form__footer"&gt;</span><span class="block">      &lt;button</span><span class="block">        @click="closeModal"</span><span class="block">        :disabled="!isRead"</span><span class="block">      &gt;</span><span class="block">        Прочитал</span><span class="block">      &lt;button&gt;</span><span class="block">    &lt;/div&gt;</span><br /><span class="block">  &lt;/div&gt;</span><span class="block">&lt;/div&gt;</span></code></pre>
        </div>
        <div>
          Теперь напишем метод onBodyScroll, которой будет переводить кнопку
          "Прочитал" в активное состояние, когда пользователь прокрутит
          содержимое контента до конца. Для того, чтобы определить сколько
          проскроллил пользователь, необходимо 3 параметра: scrollHeight - общая
          высота содержимого контента, clientHeight - высота видимой
          области(200px), и scrollTop - количество px, которые проскроллил
          пользователь. Получим все эти свойства при помощи выше установленной
          ссылки - <span class="title">ref</span>. И делаем проверку, если сумма
          clientHeight и scrollTop больше(равна) scrollHeight, то пользователь
          прокрутил содержимое контента до конца и кнопка "Прочитал" станет
          активной.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// Modal.vue</span><span class="block">methods: {</span><span class="block">  closeModal() { &middot;&middot;&middot;</span><span class="block">  },</span><br /><span class="block">  onBodyScroll() {</span><span class="block">    const modalBody = this.$<span class="title">refs</span>.modalBody</span><span class="block">    if (modalBody.clientHeight + modalBody.scrollTop >= modalBody.scrollHeight) {  </span><span class="block">      this.isRead = true</span><span class="block">    }</span><span class="block">  },</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Осталось изменить разметку в родительском компоненте, а именно
          передать содержимое в контент модального окна. Для этого откроем
          компонент <span class="lighting">app-modal</span> и внутрь поместим
          тег <span class="lighting">template</span>, которому укажем имя
          slot(content) через директиву <span class="title">v-slot</span>. И
          передадим произвольный контент.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;span&gt;Жизненный цикл...&lt;/span&gt;</span><span class="block">&lt;button @click="openModal"&gt;Читать далее &rarr;&lt;/button&gt;</span><span class="block">&lt;app-modal</span><span class="block">  v-if="isModal"</span><span class="block">  title="Хуки жизненного цикла"</span><span class="block">  @close="isModal = false"</span><span class="block">&gt;</span><span class="block">  &lt;template <span class="title">v-slot</span>:content&gt;</span><span class="block">    &lt;ul&gt;</span><span class="block">      &lt;li&gt;</span><span class="block">        Между этими этапами вызываются...</span><span class="block">      &lt;/li&gt;</span><span class="block">      &lt;li&gt;</span><span class="block">        &lt;img src="@/assets/images/lifecycle.png" alt="" /&gt;  </span><span class="block">      &lt;/li&gt;</span><span class="block">    &lt;/ul&gt;</span><span class="block">  &lt;/template&gt;</span><span class="block">&lt;/app-modal&gt;</span></code></pre>
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
  name: 'AppLesson7',
  components: {
    AppLoading,
    AppErrorMessage,
    AppModal
  },

  data() {
    return {
      id: 7,
      code: {html: 'html', js: 'js'},
      isModal: false
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
