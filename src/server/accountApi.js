import axios from 'axios'

export default {
  async login (p) {
    let data = await axios.post(`/api/account/login`, p)
    return data
  }
}
