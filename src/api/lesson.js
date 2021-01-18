import axios from '@/api/axios'

const getLesson = slug => {
  return axios.get(`/lessons/${slug}`)
}

export default {
  getLesson
}
