import axios from '@/api/axios'

const getCourse = () => {
  return axios.get('/db.json')
}

export default {
  getCourse
}
