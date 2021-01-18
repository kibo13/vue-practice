import axios from '@/api/axios'

const getLessons = () => {
  return axios.get(`/lessons`)
}

export default {
  getLessons
}
