import lessonApi from '@/api/lesson'

const state = {
  data: null,
  isLoading: false,
  error: null
}

const mutations = {
  getLessonStart(state) {
    state.isLoading = true
    state.data = null
  },

  getLessonSuccess(state, payload) {
    state.isLoading = false
    state.data = payload
  },

  getLessonFailure(state) {
    state.isLoading = false
  }
}

const actions = {
  getLesson(context, {slug}) {
    return new Promise(resolve => {
      context.commit('getLessonStart')
      lessonApi
        .getLesson(slug)
        .then(response => {
          console.log(response.data)
          context.commit('getLessonSuccess', response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit('getLessonFailure')
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
