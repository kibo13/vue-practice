import courseApi from '@/api/course'

const state = {
  data: [],
  isLoading: false,
  error: null
}

const mutations = {
  getCourseStart(state) {
    state.isLoading = true
    state.data = []
  },

  getCourseSuccess(state, payload) {
    state.isLoading = false
    state.data = payload
  },

  getCourseFailure(state, payload) {
    state.isLoading = false
    state.error = payload
  }
}

const actions = {
  getCourse(context) {
    return new Promise(resolve => {
      context.commit('getCourseStart')
      courseApi
        .getCourse()
        .then(response => {
          context.commit('getCourseSuccess', response.data)
          resolve(response.data)
        })
        .catch(error => {
          context.commit('getCourseFailure', error)
        })
    })
  }
}

const getters = {
  getLessonById: state => id => {
    return state.data.find(lesson => lesson.id === id) || {}
  }
}

export default {
  mutations,
  state,
  actions,
  getters
}
