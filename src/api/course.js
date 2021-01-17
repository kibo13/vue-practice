import axios from '@/api/axios'

const getCourse = () => {
  return axios.get(`/lessons`)
}

export default {
  getCourse
}
