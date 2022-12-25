import Alert from '@/components/global/Alert'
import Modal from '@/components/global/Modal'
import Spinner from '@/components/global/Spinner'
import Pagination from '@/components/global/Pagination'

export default {
  install: (app, options) => {
    app.component('Alert', Alert)
    app.component('Modal', Modal)
    app.component('Spinner', Spinner)
    app.component('Pagination', Pagination)
  }
}
