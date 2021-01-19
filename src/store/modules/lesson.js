const actions = {
  async fetchLessons(context) {
    const response = await fetch(
      `https://my-json-server.typicode.com/kibo13/demo/lessons`
    )

    const lessons = await response.json()
    context.commit('fetchLessonsSuccess', lessons)
  }
}

const mutations = {
  fetchLessonsSuccess(state, lessons) {
    state.data = lessons
  }
}

const state = {
  data: []
}

const getters = {
  lessons: state => state.data,
  lesson: state => id => state.data.find(lesson => lesson.id === id) || {},
  lessonsCount: state => state.data.length
}

export default {
  actions,
  mutations,
  state,
  getters
}
