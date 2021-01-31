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
        <span class="title">Задание:&nbsp;</span>реализовать простую форму, в
        которую пользователь будет вводить произвольные данные. Создать окно для
        отображения данных, введенных пользователем. Добавить дополнительное
        поле с кнопкой, куда пользователь будет вводить новое значение, которое
        должно реактивно добавляться на страницу в форму в виде нового поля
        input.
      </div>
      <!-- END task -->

      <!-- Start result -->
      <div class="mb-2">
        <div class="grid md:grid-cols-2 gap-2">
          <div
            class="form-l5 mt-2 px-4 py-3 border rounded relative"
            data-tip="General information"
          >
            <div
              v-for="(fieldValue, fieldKey) in formFields"
              :key="fieldKey"
              class="mb-2 flex flex-col"
            >
              <label :for="fieldKey" class="px-1 title text-sm capitalize">
                {{ fieldKey }}:
              </label>
              <input
                type="text"
                :id="fieldKey"
                class="input"
                v-model="formFields[fieldKey]"
                :placeholder="fieldKey"
                autocomplete="off"
              />
            </div>
          </div>
          <div
            class="form-l5 mt-2 px-4 py-3 border rounded relative"
            data-tip="Preview"
          >
            <ul class="flex flex-col px-2 py-1 h-full bg-white rounded">
              <li
                v-for="(fieldValue, fieldKey) in formFields"
                :key="fieldKey"
                class="text-sm"
              >
                <span class=" title capitalize">{{ fieldKey }}:</span>
                {{ fieldValue }}
              </li>
            </ul>
          </div>
          <div
            class="form-l5 md:col-span-2 mt-2 px-4 py-3 border rounded relative"
            data-tip="Additional window"
          >
            <div class="grid grid-cols-3 gap-2">
              <input
                type="text"
                class="input my-2 col-start-1 col-end-3"
                v-model="additionalField"
                placeholder="New value"
                autocomplete="off"
              />
              <button @click="addNewField" class="btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>
      <!-- End result -->

      <!-- Start detail -->
      <div>
        <h4 class="title">Решение:</h4>
        <div>
          Создадим в дата объект formFields, внутри которого три свойства,
          соответствующие полям input и строку additionalField – название
          дополнительного поля, которое будет добавляться в объект formFields.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">data() {</span><span class="block">  return {</span><span class="block">    formFields: {</span><span class="block">      name: '',</span><span class="block">      email: '',</span><span class="block">      phone: ''</span><span class="block">    },</span><span class="block">    additionalField: ''</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Далее создадим разметку, которая будет состоять из трех блоков. Первый
          блок - форма с полями input, куда пользователь будет вводить
          информацию, второй блок - окно предпросмотра информации, которую ввел
          пользователь и третьй блок - дополнительное поле input с кнопкой,
          через которое пользователь будет добавлять новое поле input в первый
          блок. Для первого блока, директивой v-for пройдемся по ключам объекта
          formFields и выведем список свойств и с помощью директивы v-model
          свяжем значения полей input c соответствующими свойствами. Для второго
          блока, снова воспользуемся директивой v-for, чтобы вывести значения,
          которые записаны в каждом из свойств. И для третьего блока, директивой
          v-model привяжем переменную additionalField к полю input и добавим на
          кнопку пользовательское событие @click через директиву v-on, в котором
          укажем метод addNewField.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block italic title">// Первый блок</span><span class="block">&lt;div data-tip="General information"&gt;</span><span class="block">  &lt;div</span><span class="block">    v-for="(fieldValue, fieldKey) in formFields"</span><span class="block">    :key="fieldKey"</span><span class="block">  &gt;</span><span class="block">    &lt;label :for="fieldKey"&gt;</span><span class="block">      {<span>{</span> fieldKey }}</span><span class="block">    &lt;/label&gt;</span><span class="block">    &lt;input</span><span class="block">      type="text"</span><span class="block">      :id="fieldKey"</span><span class="block">      v-model="formFields[fieldKey]"</span><span class="block">      :placeholder="fieldKey"</span><span class="block">    /&gt;</span><span class="block">  &lt;/div&gt;</span><span class="block">&lt;/div&gt;</span><br /><span class="block italic title">// Второй блок</span><span class="block">&lt;div data-tip="Preview"&gt;</span><span class="block">  &lt;ul</span><span class="block">    &lt;li</span><span class="block">      v-for="(fieldValue, fieldKey) in formFields"  </span><span class="block">      :key="fieldKey"</span><span class="block">    &gt;</span><span class="block">      {<span>{</span> fieldKey }}: {<span>{</span> fieldValue }}</span><span class="block">    &lt;/li&gt;</span><span class="block">  &lt;/ul&gt;</span><span class="block">&lt;/div&gt;</span><br /><span class="block italic title">// Третий блок</span><span class="block">&lt;div data-tip="Additional window"&gt;</span><span class="block">  &lt;div</span><span class="block">    &lt;input</span><span class="block">      type="text"</span><span class="block">      v-model="additionalField"</span><span class="block">      placeholder="New value"</span><span class="block">    /&gt;</span><span class="block">    &lt;button @click="addNewField"&gt;Add&lt;/button&gt;</span><span class="block">  &lt;/div&gt;</span><span class="block">&lt;/div&gt;</span></code></pre>
        </div>
        <div>
          В methods создадим функцию addNewField, которая будет добавлять новый
          ключ в объект formFields.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">methods: {</span><span class="block">  addNewField() {</span><span class="block">    this.formFields[this.additionalField] = '',  </span><span class="block">    console.log(this.formFields)</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          И если открыть консоль браузера и попробовать добавить новое поле, то
          в консоли увидим, что в объект formFields будет добавлен новый ключ,
          но в шаблон это новое поле не отрендерится. Это одна из основых
          проблем реактивности во Vue -
          <span class="border-b border-gray-300"
            >изменение элемента массива по индексу</span
          >, другая проблема -
          <span class="border-b border-gray-300"
            >отсутствие возможности следить за добавлением новых свойств в
            объект</span
          >. Вместо этого Vue предлагает использовать функцию
          <span class="title">$set</span> аналог функции defineProperty. Функция
          принимает три аргумента: первый - объект, второй - свойство, которое
          хотим добавить(изменить) и третий - значение, которое хотим установить
          данному свойству. Перепишем код метода addNewField, используя функцию
          <span class="title">$set</span>. Теперь новое свойство реактивно
          добавляется на страницу и оно полностью реактивно, то есть
          <span class="title">реактивность</span> это когда пользователь
          выполняет манипуляций с данными, переменные в data, computed, watch
          меняются и шаблоны, которые используют эти переменные обновляются.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">methods: {</span><span class="block">  addNewField() {</span><span class="block">    this.<span class="title">$set</span>(this.formFields, this.additionalField, '')  </span><span class="block">  }</span><span class="block">}</span></code></pre>
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
  name: 'AppLesson5',
  components: {
    AppLoading,
    AppErrorMessage
  },

  data() {
    return {
      id: 5,
      code: {html: 'html', js: 'js'},
      formFields: {
        name: '',
        email: '',
        phone: ''
      },
      additionalField: ''
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
    addNewField() {
      this.$set(this.formFields, this.additionalField, '')
    }
  }
}
</script>

<style scoped>
.form-l5::before {
  content: attr(data-tip);
  position: absolute;
  top: -12px;
  left: 12px;
  font-size: 13px;
  font-weight: bold;
  color: #000;
}
</style>
