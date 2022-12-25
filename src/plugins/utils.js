import _ from 'lodash'

export default {
  debounce (func, delay) {
    return _.debounce(func, delay)
  },
  throttle (func, delay) {
    return _.throttle(func, delay)
  },
  clear (object) {
    // _.clear(object)
  },
  cloneDeep (item) {
    return _.cloneDeep(item)
  },
  convertPagination (item) {
    const copyKeys = ['page', 'size', 'totalPages', 'totalElements', 'first', 'last']
    let result = {}
    for (const key of copyKeys) {
      result[key] = item[key]
    }
    const copyReplaceKeys = [{ origin: 'page', replace: 'number' }]
    for (const key of copyReplaceKeys) {
      result[key.origin] = item[key.origin] || item[key.replace]
    }
    return result
  }
}
