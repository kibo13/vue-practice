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
        <span class="title">Задание:&nbsp;</span>имеется картинка, к которой
        необходимо применить различные css классы и стили (фильтры, изменение
        размеров картинки, поворот картинки на определенный угол от 0&deg; до
        360&deg;). Также необходимо добавить кнопку, которая будет скрывать
        (показывать) картинку и менять текст внутри себя (при открытой картинке
        текст - "Спрятать", при закрытой картинке текст - "Показать").
      </div>
      <!-- END task -->

      <!-- Start result -->
      <div class="mb-2">
        <div class="grid md:grid-cols-2">
          <div class="flex bg-white">
            <img
              v-if="isVisible"
              src="@/assets/images/lesson_03/idea.jpg"
              alt="Тут должна быть картинка"
              class="w-full object-cover"
              :class="imgFilters"
              :style="[getSizes, getDegree]"
            />
            <p v-else class="w-full flex items-center justify-center">
              Тут могла быть Ваша реклама :)
            </p>
          </div>
          <div class="flex flex-col px-0 pt-2 md:pt-0 md:px-4">
            <div class="mb-1 grid grid-cols-3 gap-1.5">
              <button
                :class="imgFilters.contrast ? 'active' : ''"
                @click="imgFilters.contrast = !imgFilters.contrast"
                class="btn"
              >
                Контраст
              </button>
              <button
                :class="imgFilters.blur ? 'active' : ''"
                @click="imgFilters.blur = !imgFilters.blur"
                class="btn"
              >
                Размытие
              </button>
              <button
                :class="imgFilters.shadow ? 'active' : ''"
                @click="imgFilters.shadow = !imgFilters.shadow"
                class="btn"
              >
                Тень
              </button>
            </div>
            <div>
              <h5 class="title">Размер</h5>
              <div>
                <label for="width" class="block text-xs">
                  Ширина: {{ imgSizes.currentWidth }}px
                </label>
                <input
                  type="range"
                  id="width"
                  :min="imgSizes.minWidth"
                  :max="imgSizes.maxWidth"
                  :value="imgSizes.currentWidth"
                  @input="imgSizes.currentWidth = $event.target.value"
                  class="w-full"
                />
              </div>
              <div>
                <label for="height" class="block text-xs">
                  Высота: {{ imgSizes.currentHeight }}px
                </label>
                <input
                  type="range"
                  id="height"
                  :min="imgSizes.minHeight"
                  :max="imgSizes.maxHeight"
                  :value="imgSizes.currentHeight"
                  @input="imgSizes.currentHeight = $event.target.value"
                  class="w-full"
                />
              </div>
            </div>
            <div>
              <h5 class="title">Поворот</h5>
              <div>
                <label for="angle" class="block text-xs">
                  Угол: {{ imgRotate.currentDeg }}&deg;
                </label>
                <input
                  type="range"
                  id="angle"
                  :min="imgRotate.minDeg"
                  :max="imgRotate.maxDeg"
                  :value="imgRotate.currentDeg"
                  @input="imgRotate.currentDeg = $event.target.value"
                  class="w-full"
                />
              </div>
            </div>
            <button @click="isVisible = !isVisible" class="w-24 btn">
              {{ getBtnText }}
            </button>
          </div>
        </div>
      </div>
      <!-- End result -->

      <!-- Start detail -->
      <div>
        <h4 class="title">Решение:</h4>
        <div>
          Объявим в data все необходимые переменные: isVisible - состояние
          видимости картинки, imgFilters - объект, содержащий состояния
          фильтров, которые будут добавлены к картинке в виде классов, imgSizes
          и imgRotate - объекты, которые будут применены к картинке в виде
          стилей.
          <pre
            class="code-wrapper "
          ><code :data-code=code.js class="code"><span class="block">data() {</span><span class="block">  return {</span><span class="block">    isVisible: true,</span><span class="block">    imgFilters: {</span><span class="block">      contrast: false,</span><span class="block">      blur: false,</span><span class="block">      shadow: false</span><span class="block">    },</span><span class="block">    imgSizes: {</span><span class="block">      maxWidth: 340,</span><span class="block">      maxHeight: 480,</span><span class="block">      currentWidth: 200,</span><span class="block">      currentHeight: 200</span><span class="block">    },</span><span class="block">    imgRotate: {</span><span class="block">      maxDeg: 360,</span><span class="block">      currentDeg: 0</span><span class="block">    }</span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Опишем стили для фильтров объекта imgFilters.
          <pre
            class="code-wrapper "
          ><code :data-code=code.css class="code"><span class="block italic">// фильтр "Контраст"</span><span class="block">.contrast {</span><span class="block">  filter: contrast(200%);</span><span class="block">}</span><br /><span class="block italic">// фильтр "Размытие"</span><span class="block">.blur {</span><span class="block">  filter: blur(5px);</span><span class="block">}</span><br /><span class="block italic">// фильтр "Тень"</span><span class="block">.shadow {</span><span class="block">  filter: drop-shadow(16px 16px 10px black);  </span><span class="block">}</span></code></pre>
        </div>
        <div>
          В свойстве computed создадим три метода: getSizes, getDegree и
          getBtnText. Первые два метода возвращают текущие значения для
          изменения размера и поворота картинки, последний метод возвращает
          текст для кнопки, отвечающей за скрытие (показ) картинки, взависимости
          от состояния видимости картинки.
          <pre
            class="code-wrapper "
          ><code :data-code=code.js class="code"><span class="block">computed: {</span><span class="block">  getSizes() {</span><span class="block">    return {</span><span class="block">      width: `${this.imgSizes.currentWidth}px`,  </span><span class="block">      height: `${this.imgSizes.currentHeight}px`  </span><span class="block">    }</span><span class="block">  },</span><br /><span class="block">  getDegree() {</span><span class="block">    return {</span><span class="block">      transform: `rotate(${this.imgRotate.currentDeg}deg)`  </span><span class="block">    }</span><span class="block">  },</span><br /><span class="block">  getBtnText() {</span><span class="block">    return this.isVisible ? 'Спрятать' : 'Показать'  </span><span class="block">  }</span><span class="block">}</span></code></pre>
        </div>
        <div>
          Осталось создать разметку и передать туда все переменные из data и
          computed.
          <pre
            class="code-wrapper"
          ><code :data-code=code.html class="code"><span class="block">&lt;div&gt;</span><span class="block">  &lt;img</span><span class="block">    v-if="isVisible"</span><span class="block">    src="@/assets/images/lesson_03/idea.jpg"  </span><span class="block">    :class="imgFilters"</span><span class="block">    :style="[getSizes, getDegree]"</span><span class="block">  /&gt;</span><span class="block">&lt;/div&gt;</span><br /><span class="block">&lt;div&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;button</span><span class="block">      :class="imgFilters.contrast ? 'active' : ''"</span><span class="block">      @click="imgFilters.contrast = !imgFilters.contrast"&gt;  </span><span class="block">      Контраст</span><span class="block">    &lt;/button&gt;</span><span class="block">    &lt;button</span><span class="block">      :class="imgFilters.blur ? 'active' : ''"</span><span class="block">      @click="imgFilters.blur = !imgFilters.blur"&gt;  </span><span class="block">      Размытие</span><span class="block">    &lt;/button&gt;</span><span class="block">    &lt;button</span><span class="block">      :class="imgFilters.shadow ? 'active' : ''"</span><span class="block">      @click="imgFilters.shadow = !imgFilters.shadow"&gt;  </span><span class="block">      Тень</span><span class="block">    &lt;/button&gt;</span><span class="block">  &lt;/div&gt;</span><span class="block">&lt;/div&gt;</span><br /><span class="block">&lt;div&gt;</span><span class="block">  &lt;h5&gt;Размер&lt;/h5&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;label&gt;</span><span class="block">      Ширина: {<span>{</span> imgSizes.currentWidth <span>}</span>}px</span><span class="block">    &lt;/label&gt;</span><span class="block">    &lt;input</span><span class="block">      type="range"</span><span class="block">      :min="imgSizes.minWidth"</span><span class="block">      :max="imgSizes.maxWidth"</span><span class="block">      :value="imgSizes.currentWidth"</span><span class="block">      @input="imgSizes.currentWidth = $event.target.value"  </span><span class="block">    /&gt;</span><span class="block">  &lt;/div&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;label&gt;</span><span class="block">      Высота: {<span>{</span> imgSizes.currentHeight <span>}</span>}px</span><span class="block">    &lt;/label&gt;</span><span class="block">    &lt;input</span><span class="block">      type="range"</span><span class="block">      :min="imgSizes.minHeight"</span><span class="block">      :max="imgSizes.maxHeight"</span><span class="block">      :value="imgSizes.currentHeight"</span><span class="block">      @input="imgSizes.currentHeight = $event.target.value"  </span><span class="block">    /&gt;</span><span class="block">  &lt;/div&gt;</span><span class="block">&lt;/div&gt;</span><br /><span class="block">&lt;div&gt;</span><span class="block">  &lt;h5&gt;Поворот&lt;/h5&gt;</span><span class="block">  &lt;div&gt;</span><span class="block">    &lt;label&gt;</span><span class="block">      Угол: {<span>{</span> imgRotate.currentDeg <span>}</span>}&deg;</span><span class="block">    &lt;/label&gt;</span><span class="block">    &lt;input</span><span class="block">      type="range"</span><span class="block">      :min="imgRotate.minDeg"</span><span class="block">      :max="imgRotate.maxDeg"</span><span class="block">      :value="imgRotate.currentDeg"</span><span class="block">      @input="imgRotate.currentDeg = $event.target.value"  </span><span class="block">    /&gt;</span><span class="block">  &lt;/div&gt;</span><span class="block">&lt;/div&gt;</span><br /><span class="block">&lt;button @click="isVisible = !isVisible"&gt;</span><span class="block">  {<span>{</span> getBtnText }}</span><span class="block">&lt;/button&gt;</span></code></pre>
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
  name: 'AppLesson3',
  components: {
    AppLoading,
    AppErrorMessage
  },

  data() {
    return {
      id: 3,
      code: {html: 'html', js: 'js', css: 'css'},
      isVisible: true,
      imgFilters: {
        contrast: false,
        blur: false,
        shadow: false
      },
      imgSizes: {
        maxWidth: 340,
        maxHeight: 480,
        currentWidth: 200,
        currentHeight: 200
      },
      imgRotate: {
        maxDeg: 360,
        currentDeg: 0
      }
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

    getSizes() {
      return {
        width: `${this.imgSizes.currentWidth}px`,
        height: `${this.imgSizes.currentHeight}px`
      }
    },

    getDegree() {
      return {
        transform: `rotate(${this.imgRotate.currentDeg}deg)`
      }
    },

    getBtnText() {
      return this.isVisible ? 'Спрятать' : 'Показать'
    }
  },

  methods: {}
}
</script>

<style scoped>
.btn {
  height: 2rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #4b515d;
  border: 1px solid #4b515d;
  transition: 0.3s;
}

.btn:hover {
  background: #4b515d;
  color: #fff;
}

.btn.active {
  background: #4b515d;
  color: #fff;
}

.contrast {
  filter: contrast(200%);
}

.blur {
  filter: blur(5px);
}

.shadow {
  filter: drop-shadow(16px 16px 10px black);
}
</style>
