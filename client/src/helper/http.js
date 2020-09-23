import axios from 'axios'

export default () => {
  return axios.create({
    headers: {
      'Content-Type': "multipart/form-data"
    }
  })
}