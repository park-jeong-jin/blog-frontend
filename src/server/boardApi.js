import axios from 'axios'

export default {
  async query (p) {
    Object.keys(p).forEach(key => {
      if (!p[key]) delete p[key]
    })
    let data = await axios.get(`/api/board`, { params: p })
    return data
  },
  async queryPaging (p) {
    Object.keys(p).forEach(key => {
      if (!p[key]) delete p[key]
    })
    let data = await axios.get(`/api/board/p`, { params: p })
    return data
  },
  async queryId (p) {
    Object.keys(p).forEach(key => {
      if (!p[key]) delete p[key]
    })
    let data = await axios.get(`/api/board/${p.id}`, { params: p })
    return data
  },
  async create (p) {
    let data = await axios.post(`/api/board`, p)
    return data
  },
  async update (p) {
    let data = await axios.put(`/api/board`, p)
    return data
  },
  async delete (p) {
    let data = await axios.delete(`/api/board/${p.id}`, p)
    return data
  }
}
