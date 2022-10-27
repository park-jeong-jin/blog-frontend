import axios from 'axios'

export default {
  async query (p) {
    Object.keys(p).forEach(key => {
      if (!p[key]) delete p[key]
    })
    const data = await axios.get(`/api/comment`, { params: p })
    return data
  },
  async queryDw (p) {
    Object.keys(p).forEach(key => {
      if (!p[key]) delete p[key]
    })
    const data = await axios.get(`/api/comment/dw`, { params: p })
    return data
  },
  async queryId (p) {
    Object.keys(p).forEach(key => {
      if (!p[key]) delete p[key]
    })
    const data = await axios.get(`/api/comment/${p.id}`, { params: p })
    return data
  },
  async create (p) {
    const data = await axios.post(`/api/comment`, p)
    return data
  },
  async update (p) {
    const data = await axios.put(`/api/comment`, p)
    return data
  },
  async delete (p) {
    const data = await axios.delete(`/api/comment/${p.id}`, p)
    return data
  }
}
