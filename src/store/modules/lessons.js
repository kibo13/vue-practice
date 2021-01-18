import lessonsApi from '@/api/lessons'

const state = {
  data: null,
  isLoading: false,
  error: null
}

const mutations = {
  getLessonsStart(state) {
    state.isLoading = true
    state.data = null
  },

  getLessonsSuccess(state, payload) {
    state.isLoading = false
    state.data = payload
  },

  getLessonsFailure(state) {
    state.isLoading = false
  }
}

const actions = {
  getLessons(context) {
    return new Promise(resolve => {
      context.commit('getLessonsStart')
      lessonsApi
        .getLessons()
        .then(response => {
          context.commit('getLessonsSuccess', response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit('getLessonsFailure')
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
