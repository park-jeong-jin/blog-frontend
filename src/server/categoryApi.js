import axios from 'axios'

export default {
  async query (p) {
    Object.keys(p).forEach(key => {
      if (!p[key]) delete p[key]
    })
    let data = await axios.get(`/api/category`, { params: p })
    return data
  },
  async queryDw (p) {
    Object.keys(p).forEach(key => {
      if (!p[key]) delete p[key]
    })
    let data = await axios.get(`/api/category/dw`, { params: p })
    return data
  },
  async queryId (p) {
    Object.keys(p).forEach(key => {
      if (!p[key]) delete p[key]
    })
    let data = await axios.get(`/api/category/${p.id}`, { params: p })
    return data
  },
  async create (p) {
    let data = await axios.post(`/api/category`, p)
    return data
  },
  async update (p) {
    let data = await axios.put(`/api/category`, p)
    return data
  },
  async delete (p) {
    let data = await axios.delete(`/api/category/${p.id}`, p)
    return data
  }
}
