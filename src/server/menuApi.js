import axios from 'axios'

export default {
  async query (p) {
    Object.keys(p).forEach(key => {
      if (!p[key]) delete p[key]
    })
    let data = await axios.get(`/api/menu`, { params: p })
    return data
  },
  async queryDw (p) {
    let data = await axios.get(`/api/menu/dw`, { params: p })
    return data
  },
  async queryId (p) {
    Object.keys(p).forEach(key => {
      if (!p[key]) delete p[key]
    })
    let data = await axios.get(`/api/menu/${p.id}`, { params: p })
    return data
  },
  async create (p) {
    let data = await axios.post(`/api/menu`, p)
    return data
  },
  async update (p) {
    let data = await axios.put(`/api/menu`, p)
    return data
  },
  async delete (p) {
    let data = await axios.delete(`/api/menu/${p.id}`, p)
    return data
  }
}
