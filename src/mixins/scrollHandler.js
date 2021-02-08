export default {
  methods: {
    onScrollEnd() {
      console.warn('You must override onScrollEnd method')
    },

    onScrollStart() {
      console.warn('You must override onScrollStart method')
    },

    onScroll(event) {
      const content = event.target
      if (content.clientHeight + content.scrollTop >= content.scrollHeight) {
        this.onScrollEnd()
      } else {
        this.onScrollStart()
      }
    }
  }
}
