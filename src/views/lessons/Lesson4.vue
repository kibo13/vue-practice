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
        <span class="title">Задание:&nbsp;</span>реализовать вывод списка имен и
        соответствующий поиск по ним. Выполнить задание с использованием props,
        emit и v-model.
      </div>
      <!-- END task -->

      <!-- Start result -->
      <div class="mb-2">
        <app-search @search="searchProducts" />
        <ul class="mt-2 grid md:grid-cols-3 gap-5">
          <li v-for="(product, i) in filteredProducts" :key="i">
            <app-product-card
              :title="product.title"
              :price="product.price"
              :img-url="product.imgUrl"
              :count="product.count"
            />
          </li>
        </ul>
      </div>
      <!-- End result -->

      <!-- Start detail -->
      <div>
        <h4 class="title">Решение:</h4>
        <div>
          Создадим в data два массива products и filteredProducts. Массив
          products содержит список объектов с произвольными данными,
          filteredProducts - пустой массив, в котором будут храниться найденные
          продукты.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">data() {</span><span class="block">  return {</span><span class="block">    filteredProducts: [],</span><span class="block">    products: [</span><span class="block">      {</span><span class="block">        title: 'Стол Оливиа',</span><span class="block">        price: 3990,</span><span class="block">        imgUrl: require('@/assets/images/olivia.png'),  </span><span class="block">        count: 17</span><span class="block">      },</span><span class="block">      {</span><span class="block">        title: 'Стол Ацтека',</span><span class="block">        price: 3650,</span><span class="block">        imgUrl: require('@/assets/images/aztec.png'),  </span><span class="block">        count: 21</span><span class="block">      },</span><span class="block">      {</span><span class="block">        title: 'Стол Линда',</span><span class="block">        price: 3744,</span><span class="block">        imgUrl: require('@/assets/images/linda.png'),  </span><span class="block">        count: 18</span><span class="block">      }</span><span class="block">    ]</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Так как продукты будут выводится из массива filteredProducts, а тот
          изначально пуст, то воспользуемся методом жизненного цикла - mounted и
          скопируем данные из массива products в массив filteredProducts.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">mounted() {</span><span class="block">  this.filteredProducts = this.products  </span><span class="block">}</span></code></pre>
        </div>
        <div>
          Далее создадим разметку для вывода списка продуктов, в которую
          поместим и зарегистрируем два компонента: ProductCard.vue и
          Search.vue. В компонент ProductCard.vue будем передавать
          <span class="title">props</span>(title, price, img-url и count), а из
          компонента Search.vue получать пользовательское событие через
          <span class="title">$emit</span>(search). Таким образом,
          <span class="title">props</span> предназначены для передачи данных из
          родительского компонента в дочерний компонент, а
          <span class="title">$emit</span> генерирует событие и посылает его
          вверх по иерархии компонентов.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;div id="app"&gt;</span><span class="block">  &lt;app-search @<span class="title">search</span>="searchProducts" /&gt;</span><span class="block">  &lt;ul&gt;</span><span class="block">    &lt;li v-for="(product, i) in filteredProducts" :key="i"&gt;  </span><span class="block">      &lt;app-product-card</span><span class="block">        :<span class="title">title</span>="product.title"</span><span class="block">        :<span class="title">price</span>="product.price"</span><span class="block">        :<span class="title">img-url</span>="product.imgUrl"</span><span class="block">        :<span class="title">count</span>="product.count"</span><span class="block">      /&gt;</span><span class="block">    &lt;/li&gt;</span><span class="block">  &lt;/ul&gt;</span><span class="block">&lt;/div&gt;</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">import AppProductCard from '@/components/ProductCard'  </span><span class="block">import AppSearch from '@/components/Search'</span><br /><span class="block">export default {</span><span class="block">  name: 'app',</span><span class="block">  components: {</span><span class="block">    AppProductCard,</span><span class="block">    AppSearch</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Компоненты зарегистрированы, осталось их создать. В папке
          <span class="lighting">`./src/components`</span> создадим два файла:
          ProductCard.vue и Search.vue. В файле ProductCard.vue описываем
          полученные <span class="title">props</span>(title, price, img-url и
          count), а в файле Search.vue создадим пользовательское
          событие(@click), которое будем передавать наверх(родительскому
          компоненту), используя <span class="title">$emit</span>. Также
          используем директиву <span class="title">v-model</span> для
          двунаправленного связывания данных с полем input через переменную
          searchText, то есть значение переменной searchText можно менять как в
          коде программы, так и через поле input.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block italic">&lt;!-- ProductCard.vue --&gt;</span><span class="block">&lt;div class="card"&gt;  </span><span class="block">  &lt;img :src="<span class="title">imgUrl</span>" alt=""/&gt;</span><span class="block">  &lt;p&gt;{<span>{ <span class="title">title</span> }</span>}&lt;/p&gt;</span><span class="block">  &lt;p&gt;{<span>{ <span class="title">price</span> }</span>}&lt;/p&gt;</span><span class="block">  &lt;p&gt;{<span>{ <span class="title">count</span> }</span>}&lt;/p&gt;</span><span class="block">  &lt;button class="btn"&gt;В корзину&lt;/button&gt;  </span><span class="block">&lt;/div&gt;</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// ProductCard.vue</span><span class="block">props: {</span><span class="block">  <span class="title">title</span>: {</span><span class="block">    type: String,</span><span class="block">    required: true</span><span class="block">  },</span><span class="block">  <span class="title">count</span>: {</span><span class="block">    type: Number,</span><span class="block">    required: true</span><span class="block">  },</span><span class="block">  <span class="title">price</span>: {</span><span class="block">    type: Number,</span><span class="block">    required: true</span><span class="block">  },</span><span class="block">  <span class="title">imgUrl</span>: {</span><span class="block">    type: String,</span><span class="block">    required: false,</span><span class="block">    default: require('@/assets/images/photo.png')  </span><span class="block">  },</span><span class="block">}</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block italic">&lt;!-- Search.vue --&gt;</span><span class="block">&lt;div&gt;  </span><span class="block">  &lt;input</span><span class="block">    type="text"</span><span class="block">    <span class="title">v-model</span>="searchText"</span><span class="block">    placeholder="Поиск..."</span><span class="block">  /></span><span class="block">  &lt;button @click="<span class="title">$emit</span>('search', searchText)" class="btn"&gt;Найти&lt;/button&gt;  </span><span class="block">&lt;/div&gt;</span></code></pre>
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block italic">// Search.vue</span><span class="block">data() {</span><span class="block">  return {</span><span class="block">    searchText: ''</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          В methods создадим и опишем функцию поиска - searchProducts.
          <pre
            class="code-wrapper"
          ><code :data-code=code.js class="code"><span class="block">methods: {</span><span class="block">  searchProducts(searchText) {</span><span class="block">    if (searchText) {</span><span class="block">      this.filteredProducts = this.products.filter(product =></span><span class="block">        product.title.toLowerCase().includes(searchText.toLowerCase())  </span><span class="block">      )</span><span class="block">    } else</span><span class="block">      this.filteredProducts = this.products</span><span class="block">    }</span><span class="block">  }</span><span class="block">}</span></code></pre>
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
import AppProductCard from '@/components/lesson_04/ProductCard'
import AppSearch from '@/components/lesson_04/Search'

export default {
  name: 'AppLesson4',
  components: {
    AppLoading,
    AppErrorMessage,
    AppProductCard,
    AppSearch
  },

  data() {
    return {
      id: 4,
      code: {html: 'html', js: 'js'},
      filteredProducts: [],
      products: [
        {
          title: 'Стол Оливиа',
          price: 3990,
          imgUrl: require('@/assets/images/lesson_04/olivia.png'),
          count: 17
        },
        {
          title: 'Стол Ацтека',
          price: 3650,
          imgUrl: require('@/assets/images/lesson_04/aztec.png'),
          count: 21
        },
        {
          title: 'Стол Линда',
          price: 3744,
          imgUrl: require('@/assets/images/lesson_04/linda.png'),
          count: 18
        }
      ]
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
    searchProducts(searchText) {
      if (searchText) {
        this.filteredProducts = this.products.filter(product =>
          product.title.toLowerCase().includes(searchText.toLowerCase())
        )
      } else {
        this.filteredProducts = this.products
      }
    }
  },

  mounted() {
    this.filteredProducts = this.products
  }
}
</script>
