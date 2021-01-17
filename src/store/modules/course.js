import courseApi from '@/api/course'

const state = {
  data: null,
  isLoading: false,
  error: null
}

const mutations = {
  getCourseStart(state) {
    state.isLoading = true
    state.data = null
  },

  getCourseSuccess(state, payload) {
    state.isLoading = false
    state.data = payload
  },

  getCourseFailure(state) {
    state.isLoading = false
  }
}

const actions = {
  getCourse(context) {
    return new Promise(resolve => {
      context.commit('getCourseStart')
      courseApi
        .getCourse()
        .then(response => {
          // console.log('response', response.data)
          context.commit('getCourseSuccess', response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit('getCourseFailure')
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
