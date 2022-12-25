import axios from 'axios'

export default {
  async query (p) {
    Object.keys(p).forEach(key => {
      if (!p[key]) delete p[key]
    })
    let data = await axios.get(`/api/user`, { params: p })
    return data
  },
  async create (p) {
    let data = await axios.post(`/api/user`, p)
    return data
  },
  async update (p) {
    let data = await axios.put(`/api/user`, p)
    return data
  },
  async delete (p) {
    let data = await axios.delete(`/api/user/${p.id}`, p)
    return data
  },
  async login (p) {
    let data = await axios.post(`/api/user/login`, p)
    return data
  },
  async token (p) {
    let data = await axios.post(`/api/user/token`, p)
    return data
  }
}
