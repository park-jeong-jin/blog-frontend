import _ from 'lodash'

export default {
  clear (object) {
    // _.clear(object)
  },
  copyTo (from, to) {
    if (to === undefined || to === null) {
      to = _.cloneDeep(from)
    } else {
      Object.keys(from).forEach(key => {
        to[key] = _.cloneDeep(from[key])
      })
    }
  },
  copyToPaging (from, to) {
    const keys = ['page', 'size']
    keys.forEach(key => {
      to[key] = _.cloneDeep(from[key])
    })
  }
}
