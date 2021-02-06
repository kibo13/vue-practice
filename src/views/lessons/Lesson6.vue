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
        <span class="title">Задание:&nbsp;</span>реализовать форму, в которой
        необходимо разместить различные элементы интерфейса(input, checkbox,
        radiobutton и select). Добавить валидацию элементам формы с помощью
        библиотеки vuelidate. Написать метод для события submit формы, который
        будет проверять форму на наличие ошибок при валидации. Если ошибок нет,
        перерисовать страничку и вывести успешное сообщение.
      </div>
      <!-- END task -->

      <!-- Start result -->
      <div class="mb-2">
        <form v-if="!isForm" @submit.prevent="checkForm">
          <div class="flex flex-col mb-2">
            <label for="login" class="px-1 title text-sm capitalize">
              Логин:
            </label>
            <input
              type="text"
              id="login"
              v-model.trim="form.login"
              :class="$v.form.login.$error ? 'is-invalid' : ''"
              class="input md:w-4/12"
            />
            <p
              v-if="$v.form.login.$dirty && !$v.form.login.required"
              class="invalid-feedback"
            >
              Обязательное поле
            </p>
            <p
              v-if="$v.form.login.$dirty && !$v.form.login.minLength"
              class="invalid-feedback"
            >
              Минимальная длина поля должна быть не менее
              {{ $v.form.login.$params.minLength.min }} символов
            </p>
          </div>
          <div class="flex flex-col mb-2">
            <label for="email" class="px-1 title text-sm capitalize">
              Почта:
            </label>
            <input
              type="email"
              id="email"
              v-model.trim="form.email"
              :class="$v.form.email.$error ? 'is-invalid' : ''"
              class="input md:w-4/12"
            />
            <p
              v-if="$v.form.login.$dirty && !$v.form.email.required"
              class="invalid-feedback"
            >
              Обязательное поле
            </p>
            <p
              v-if="$v.form.login.$dirty && !$v.form.email.email"
              class="invalid-feedback"
            >
              Введен некорректный E-mail
            </p>
          </div>
          <div class="flex flex-col mb-2">
            <label for="password" class="px-1 title text-sm capitalize">
              Пароль:
            </label>
            <input
              type="password"
              id="password"
              v-model.trim="form.password"
              :class="$v.form.password.$error ? 'is-invalid' : ''"
              class="input md:w-4/12"
            />
            <p
              v-if="$v.form.login.$dirty && !$v.form.password.required"
              class="invalid-feedback"
            >
              Обязательное поле
            </p>
            <p
              v-if="$v.form.login.$dirty && !$v.form.password.minLength"
              class="invalid-feedback"
            >
              Минимальная длина поля должна быть не менее
              {{ $v.form.password.$params.minLength.min }} символов
            </p>
          </div>
          <div class="flex flex-col mb-2">
            <label for="country" class="px-1 title text-sm capitalize">
              Страна:
            </label>
            <select id="country" class="input md:w-4/12" v-model="form.country">
              <option
                v-for="(country, i) in countries"
                :key="i"
                :value="country.value"
              >
                {{ country.label }}
              </option>
            </select>
          </div>
          <div class="flex flex-col mb-2">
            <label for="interest" class="px-1 title text-sm capitalize">
              Категории:
            </label>
            <select
              id="interest"
              class="input md:w-4/12"
              :class="$v.form.category.$error ? 'is-invalid' : ''"
              multiple
              v-model="form.category"
            >
              <option
                v-for="(category, i) in categories"
                :key="i"
                :value="category.value"
              >
                {{ category.label }}
              </option>
            </select>
            <p
              v-if="$v.form.category.$dirty && !$v.form.category.maxLength"
              class="invalid-feedback"
            >
              Не больше {{ $v.form.category.$params.maxLength.max }} категорий
            </p>
          </div>
          <div class="flex flex-col mb-2">
            <label for="gender" class="px-1 title text-sm capitalize">
              Пол:
            </label>
            <ul>
              <li class="flex items-center">
                <input
                  type="radio"
                  id="male"
                  class="mx-1"
                  value="male"
                  v-model="form.gender"
                />
                <label for="male">Мужской</label>
              </li>
              <li class="flex items-center">
                <input
                  type="radio"
                  id="female"
                  class="mx-1"
                  value="female"
                  v-model="form.gender"
                />
                <label for="female">Женский</label>
              </li>
            </ul>
          </div>
          <div class="flex flex-col mb-2">
            <label class="px-1 title text-sm">
              Пользовательское соглашение:
            </label>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="agree"
                class="mx-1"
                v-model="form.isAgree"
              />
              <label for="agree">Я принимаю условия</label>
            </div>
            <p
              v-if="$v.form.isAgree.$dirty && !$v.form.isAgree.mustBeTrue"
              class="invalid-feedback"
            >
              Необходимо принять условия пользовательского соглашения
            </p>
          </div>
          <button class="btn-primary">Отправить</button>
        </form>

        <div v-else class="shadow rounded">
          <h1 class="w-full text-center py-7 title md:text-xl">
            Добро пожаловать, {{ form.login }}!
          </h1>
        </div>
      </div>
      <!-- End result -->

      <!-- Start detail -->
      <div>
        <h4 class="title">Решение:</h4>
        <div>
          Библиотека <span class="title">Vuelidate</span> - библиотека для
          валидаций, которая не имеет ни обработчиков событий для полей, ни
          переводов для ошибок валидации. Пользователь описывает валидации в
          объекте validations. Затем библиотека создаст computed-поле $v с
          флагами валидации полей и функциями для изменения этих флагов.
          Установим библиотеку командой:
          <pre
            class="code-wrapper"
          ><code class="code">npm install vuelidate</code></pre>
        </div>
        <div>
          После успешной установки подключим библиотеку в проект, как
          <span class="title">mixins</span> - компонент, без секции template и
          секции style, внутри которого могут содержаться любые опции
          компонента(data, methods, computed, lifecycle hooks). Создадим в data
          переменную form - объект, содержащий свойства, которые будут привязаны
          к полям формы через директиву v-model. Объявим объект
          <span class="title">validations</span>, внутри которого будет
          находиться вся логика с валидацией. Также импортируем готовые методы
          из библиотеки.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">import {validationMixin} from 'vuelidate'</span><span class="block">import {required, minLength, maxLength, email} from 'vuelidate/lib/validators'  </span><br /><span class="block">export default {</span><span class="block">  name: 'app',</span><span class="block">  <span class="title">mixins</span>: [validationMixin],</span><br /><span class="block">  data() {</span><span class="block">    return {</span><span class="block">      form: {}</span><span class="block">    }</span><span class="block">  },</span><br /><span class="block">  <span class="title">validations</span>: {},</span><br /><span class="block">  methods: { &middot;&middot;&middot;</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          В объекте form создадим и опишем свойства для всех полей формы.
          Свойства: login, email и password - для полей input; country и
          category - для полей select; gender - для полей radiobutton; isAgree -
          для поля checkbox.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">data() {</span><span class="block">  return {</span><span class="block">    form: {</span><span class="block">      login: '',</span><span class="block">      email: '',</span><span class="block">      password: '',</span><span class="block">      gender: 'male',</span><span class="block">      country: 'Russia',</span><span class="block">      category: ['games'],</span><span class="block">      isAgree: false</span><span class="block">    }</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Чтобы полям добавить валидацию необходимо в объекте
          <span class="title">validations</span>
          написать структуру с сохранением имен переменных как в объекте data.
          Добавим валидацию для следующих полей: login, email, password,
          category и isAgree.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block"><span class="title">validations</span>: {</span><span class="block">  form: {</span><span class="block">    login: {required, minLength: minLength(3)},</span><span class="block">    email: {required, email},</span><span class="block">    password: {required, minLength: minLength(8)},  </span><span class="block">    category: {maxLength: maxLength(3)},</span><span class="block">    isAgree: {mustBeTrue: value => value}</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          В секции style cоздадим классы, чтобы немного стилизовать отображение
          ошибок при валидации.
          <pre
            class="code-wrapper "
          ><code :data-code=code.css class="code"><span class="block">.is-invalid {</span><span class="block">  border-width: 1px;</span><span class="block">  border-color: rgba(220, 38, 38, 1);  </span><span class="block">}</span><br /><span class="block">.invalid-feedback {</span><span class="block">  margin-top: 0.25rem;</span><span class="block">  padding: 0 0.125rem;</span><span class="block">  font-size: 0.875rem;</span><span class="block">  line-height: 1.25rem;</span><span class="block">  color: rgba(220, 38, 38, 1);</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Начнём с самого распространенного элемента формы - тег
          <span class="lighting">&lt;input&gt;</span>. Поместим в тег
          <span class="lighting">&lt;form&gt;</span> первые три поля: логин,
          почта и пароль. Привяжем свойства объекта form к этим полям через
          директиву v-model. Используем модификатор
          <span class="title">trim</span>, чтобы обрезать пробелы.
          <span class="title">Модификатор</span> - функция, которая выполняется
          перед тем, как значение запишется в переменную. Забиндим классы и
          добавим блоки для отображения сообщений об ошибках при валидации.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;form&gt;</span><span class="block italic">  &lt;!-- поле "Логин" --&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;label for="login"&gt;Логин:&lt;/label&gt;</span><span class="block">    &lt;input</span><span class="block">      type="text"</span><span class="block">      id="login"</span><span class="block">      v-model.<span class="title">trim</span>="form.login"</span><span class="block">      :class="$v.form.login.$error ? 'is-invalid' : ''"</span><span class="block">    /&gt;</span><span class="block">    &lt;p</span><span class="block">      v-if="$v.form.login.$dirty &amp;&amp; !$v.form.login.required"</span><span class="block">      class="invalid-feedback"</span><span class="block">    &gt;</span><span class="block">      Обязательное поле</span><span class="block">    &lt;/p&gt;</span><span class="block">    &lt;p</span><span class="block">      v-if="$v.form.login.$dirty &amp;&amp; !$v.form.login.minLength"</span><span class="block">      class="invalid-feedback"</span><span class="block">    &gt;</span><span class="block">      Минимальная длина поля должна быть не менее</span><span class="block">      {<span>{</span> $v.form.login.$params.minLength.min }} символов</span><span class="block">    &lt;/p&gt;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- поле "Почта" --&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;label for="email"&gt;Почта:&lt;/label&gt;</span><span class="block">    &lt;input</span><span class="block">      type="text"</span><span class="block">      id="email"</span><span class="block">      v-model.<span class="title">trim</span>="form.email"</span><span class="block">      :class="$v.form.email.$error ? 'is-invalid' : ''"</span><span class="block">    /&gt;</span><span class="block">    &lt;p</span><span class="block">      v-if="$v.form.email.$dirty &amp;&amp; !$v.form.email.required"</span><span class="block">      class="invalid-feedback"</span><span class="block">    &gt;</span><span class="block">      Обязательное поле</span><span class="block">    &lt;/p&gt;</span><span class="block">    &lt;p</span><span class="block">      v-if="$v.form.email.$dirty &amp;&amp; !$v.form.email.email"</span><span class="block">      class="invalid-feedback"</span><span class="block">    &gt;</span><span class="block">      Введен некорректный E-mail</span><span class="block">    &lt;/p&gt;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- поле "Пароль" --&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;label for="password"&gt;Пароль:&lt;/label&gt;</span><span class="block">    &lt;input</span><span class="block">      type="text"</span><span class="block">      id="password"</span><span class="block">      v-model.<span class="title">trim</span>="form.password"</span><span class="block">      :class="$v.form.password.$error ? 'is-invalid' : ''"</span><span class="block">    /&gt;</span><span class="block">    &lt;p</span><span class="block">      v-if="$v.form.password.$dirty &amp;&amp; !$v.form.password.required"  </span><span class="block">      class="invalid-feedback"</span><span class="block">    &gt;</span><span class="block">      Обязательное поле</span><span class="block">    &lt;/p&gt;</span><span class="block">    &lt;p</span><span class="block">      v-if="$v.form.password.$dirty &amp;&amp; !$v.form.password.minLength"  </span><span class="block">      class="invalid-feedback"</span><span class="block">    &gt;</span><span class="block">      Минимальная длина поля должна быть не менее</span><span class="block">      {<span>{</span> $v.form.password.$params.minLength.min }} символов</span><span class="block">    &lt;/p&gt;</span><span class="block">  &lt;/div&gt;</span><span class="block">&lt;/form&gt;</span></code></pre>
        </div>
        <div>
          Далее поработаем со списками или тегом
          <span class="lighting">&lt;select&gt;</span>. Создадим в data два
          массива countries и categories, внутрь которых поместим объекты.
          Каждый объект будет хранить два свойства label - значение, которое
          будет видеть пользователь, и value - значение, которое будет
          отправляться на сервер.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">data() {</span><span class="block">  return {</span><span class="block">    form: { &middot;&middot;&middot;</span><span class="block">    },</span><br /><span class="block">    countries: [</span><span class="block">      {</span><span class="block">        label: 'Россия',</span><span class="block">        value: 'Russia'</span><span class="block">      },</span><span class="block">      {</span><span class="block">        label: 'Белоруссия',</span><span class="block">        value: 'Belarus'</span><span class="block">      },</span><span class="block">      {</span><span class="block">        label: 'Казахстан',</span><span class="block">        value: 'Kazakhstan'</span><span class="block">      }</span><span class="block">    ],</span><br /><span class="block">    categories: [</span><span class="block">      {</span><span class="block">        label: 'Прогресс',</span><span class="block">        value: 'progress'</span><span class="block">      },</span><span class="block">      {</span><span class="block">        label: 'Культура',</span><span class="block">        value: 'culture'</span><span class="block">      },</span><span class="block">      {</span><span class="block">        label: 'Общество',</span><span class="block">        value: 'society'</span><span class="block">      },</span><span class="block">      {</span><span class="block">        label: 'Система',</span><span class="block">        value: 'system'</span><span class="block">      },</span><span class="block">      {</span><span class="block">        label: 'Власть',</span><span class="block">        value: 'power'</span><span class="block">      }</span><span class="block">    ]</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Создадим на форме два списка. Второму списку добавим атрибут
          <span class="title">multiple</span>, который позволит пользователю
          одновременно выбирать сразу несколько элементов списка. Привяжем
          свойства объекта form к спискам с помощью директивы v-model. Выведем
          опции для этих списков через директиву v-for. Второму списку забиндим
          класс и добавим блок для вывода сообщения об ошибке при валидации.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;form&gt;</span><span class="block italic">  &lt;!-- поле "Логин" --&gt;</span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- поле "Почта" --&gt;</span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- поле "Пароль" --&gt;</span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- раскрывающийся список --&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;label for="country"&gt;Страна:&lt;/label&gt;</span><span class="block">    &lt;select id="country" v-model="form.country"&gt;</span><span class="block">      &lt;option</span><span class="block">        v-for="(country, i) in countries"</span><span class="block">        :key="i"</span><span class="block">        :value="country.value"</span><span class="block">      &gt;</span><span class="block">        {<span>{ country.label }}</span></span><span class="block">      &lt;/option&gt;</span><span class="block">    &lt;/select&gt;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- cписок множественного выбора --&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;label for="interest"&gt;Категории:&lt;/label&gt;</span><span class="block">    &lt;select</span><span class="block">      id="interest"</span><span class="block">      :class="$v.form.category.$error ? 'is-invalid' : ''"</span><span class="block">      <span class="title">multiple</span></span><span class="block">      v-model="form.category"</span><span class="block">    &gt;</span><span class="block">      &lt;option</span><span class="block">        v-for="(category, i) in categories"</span><span class="block">        :key="i"</span><span class="block">        :value="category.value"</span><span class="block">      &gt;</span><span class="block">        {<span>{ category.label }}</span></span><span class="block">      &lt;/option&gt;</span><span class="block">    &lt;/select&gt;</span><span class="block">    &lt;p</span><span class="block">      v-if="$v.form.category.$dirty &amp;&amp; !$v.form.category.maxLength"</span><span class="block">      class="invalid-feedback"</span><span class="block">    &gt;</span><span class="block">      Не больше {<span>{</span> $v.form.category.$params.maxLength.max }} категорий  </span><span class="block">    &lt;/p&gt;</span><span class="block">  &lt;/div&gt;</span><span class="block">&lt;/form&gt;</span></code></pre>
        </div>
        <div>
          Далее поработаем с элементом checkbox. Этот элемент имеет два режима
          работы. Первый режим это когда элемент связывается с логической
          переменной через директиву v-model, то есть пользователь ставит флаг
          на элементе, тогда значение принимает true, и когда снимает флаг,
          значение принимает false. Второй режим это когда имеются несколько
          полей checkbox, связанных с одной переменной, тогда переменная должна
          быть массивом и туда должны попадать значения, которые записаны в
          атрибут value у самого поля checkbox.
        </div>
        <div>
          Добавим на форму поле checkbox, директивой v-model привяжем к этому
          полю свойство isAgree из объекта form и добавим блок для вывода
          сообщения об ошибке при валидации.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;form&gt;</span><span class="block italic">  &lt;!-- поле "Логин" --&gt;</span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- поле "Почта" --&gt;</span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- поле "Пароль" --&gt;</span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- раскрывающийся список --&gt;</span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- cписок множественного выбора --&gt;</span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- поле "Пользовательское соглашение" --&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;label&gt;Пользовательское соглашение:&lt;/label&gt;</span><span>    &lt;div&gt;</span><span class="block">      &lt;input</span><span class="block">        type="checkbox"</span><span class="block">        id="agree"</span><span class="block">        v-model="form.isAgree"</span><span class="block">      /&gt;</span><span class="block">      &lt;label for="agree"&gt;Я принимаю условия&lt;/label&gt;</span><span>    &lt;/div&gt;</span><span class="block">    &lt;p</span><span class="block">      v-if="$v.form.isAgree.$dirty &amp;&amp; !$v.form.isAgree.mustBeTrue"  </span><span class="block">      class="invalid-feedback"</span><span class="block">    &gt;</span><span class="block">      Необходимо принять условия пользовательского соглашения</span><span class="block">    &lt;/p&gt;</span><span class="block">  &lt;/div&gt;</span><span class="block">&lt;/form&gt;</span></code></pre>
        </div>
        <div>
          Далее поработаем с элементами radiobutton(радиокнопками). В принципе,
          поведение работы радиокнопок аналогично второму режиму работы
          checkbox. Единственное отличие - то, что активная радиокнопка только
          одна. Поэтому, сначала добавим на форму два элемента radiobutton и
          привяжем их к свойству gender объекта form, используя директиву
          v-model. Также добавим кнопку в конце формы, перед закрывающимся тегом
          <span class="lighting">form</span>.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;form&gt;</span><span class="block italic">  &lt;!-- поле "Логин" --&gt;</span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- поле "Почта" --&gt;</span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- поле "Пароль" --&gt;</span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- раскрывающийся список --&gt;</span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- cписок множественного выбора --&gt;</span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- поле "Пол" --&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;label&gt;Пол:&lt;/label&gt;</span><span class="block">    &lt;ul&gt;</span><span class="block">      &lt;li&gt;</span><span class="block">        &lt;input</span><span class="block">          type="radio"</span><span class="block">          id="male"</span><span class="block">          value="male"</span><span class="block">          v-model="form.gender"</span><span class="block">        &gt;</span><span class="block">        &lt;label for="male"&gt;Мужской&lt;/label&gt;</span><span class="block">      &lt;/li&gt;</span><span class="block">      &lt;li&gt;</span><span class="block">        &lt;input</span><span class="block">          type="radio"</span><span class="block">          id="female"</span><span class="block">          value="female"</span><span class="block">          v-model="form.gender"</span><span class="block">        &gt;</span><span class="block">        &lt;label for="female"&gt;Женский&lt;/label&gt;</span><span class="block">      &lt;/li&gt;</span><span class="block">    &lt;/ul&gt;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block italic">  &lt;!-- поле "Пользовательское соглашение" --&gt;  </span><span class="block">  &lt;div&gt; &middot;&middot;&middot;</span><span class="block">  &lt;/div&gt;</span><br /><span class="block">  &lt;button&gt;Отправить&lt;/button&gt;</span><span class="block">&lt;/form&gt;</span></code></pre>
        </div>
        <div>
          Теперь в methods создадим функцию checkForm, внутри которой будем
          вызывать метод <span class="title">touch</span>, запускающий валидацию
          на всех дочерних свойствах. И проверять наличие ошибок при валидации,
          если ошибок - нет, тогда выведем в консоль браузера сообщение.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">methods: {</span><span class="block">  checkForm() {</span><span class="block">    this.$v.form.$<span class="title">touch</span>()</span><span class="block">    if (!this.$v.form.$error) {</span><span class="block">      console.log('Валидация прошла успешно!')  </span><span class="block">    }</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Осталось отрисовать блок, который будет отображаться в случай
          отсутствия сообщений об ошибках при валидации. Для этого в data
          объявим логическую переменную isForm, отвечающую за перерисовку
          страницы в случай отсутствия ошибок при валидации. Добавим переменную
          isForm в метод checkForm. Затем поместим в тег
          <span class="lighting">form</span> переменную isForm и напишем событие
          @submit, в котором укажем метод checkForm. Поместим блок для вывода
          успешного сообщения, после тега <span class="lighting">form</span>.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">data() {</span><span class="block">  return {</span><span class="block">    form: { &middot;&middot;&middot;</span><span class="block">    },</span><br /><span class="block">    countries: [ &middot;&middot;&middot;</span><span class="block">    ],</span><br /><span class="block">    categories: [ &middot;&middot;&middot;</span><span class="block">    ],</span><br /><span class="block">    isForm: false</span><span class="block">  }</span><span class="block">}</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">methods: {</span><span class="block">  checkForm() {</span><span class="block">    this.$v.form.$<span class="title">touch</span>()</span><span class="block">    if (!this.$v.form.$error) {</span><span class="block">      this.isForm = true</span><span class="block">    }</span><span class="block">  }</span><span class="block">}</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;form v-if="!isForm" @submit.prevent="checkForm"&gt; &middot;&middot;&middot;  </span><span class="block">&lt;/form&gt;</span><span class="block">&lt;div v-else&gt;</span><span class="block">  &lt;h1&gt;Добро пожаловать, {<span>{</span> form.login }}!&lt;/h1&gt;</span><span class="block">&lt;/div&gt;</span></code></pre>
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
import {validationMixin} from 'vuelidate'
import {required, minLength, maxLength, email} from 'vuelidate/lib/validators'

export default {
  name: 'AppLesson6',
  components: {
    AppLoading,
    AppErrorMessage
  },

  mixins: [validationMixin],

  data() {
    return {
      id: 6,
      code: {html: 'html', js: 'js', css: 'css'},
      isForm: false,
      form: {
        login: '',
        email: '',
        password: '',
        gender: 'male',
        country: 'Russia',
        category: ['progress'],
        isAgree: false
      },
      countries: [
        {
          label: 'Россия',
          value: 'Russia'
        },
        {
          label: 'Белоруссия',
          value: 'Belarus'
        },
        {
          label: 'Казахстан',
          value: 'Kazakhstan'
        }
      ],
      categories: [
        {
          label: 'Прогресс',
          value: 'progress'
        },
        {
          label: 'Культура',
          value: 'culture'
        },
        {
          label: 'Общество',
          value: 'society'
        },
        {
          label: 'Система',
          value: 'system'
        },
        {
          label: 'Власть',
          value: 'power'
        }
      ]
    }
  },

  validations: {
    form: {
      login: {required, minLength: minLength(3)},
      email: {required, email},
      password: {required, minLength: minLength(8)},
      category: {maxLength: maxLength(3)},
      isAgree: {mustBeTrue: value => value}
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
    checkForm() {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.isForm = true
      }
    }
  }
}
</script>
