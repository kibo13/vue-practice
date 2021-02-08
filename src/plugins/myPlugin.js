import ScrollHandlerMixin from '@/mixins/scrollHandler'

export default {
  install(Vue) {
    Vue.mixin(ScrollHandlerMixin)
  }
}
