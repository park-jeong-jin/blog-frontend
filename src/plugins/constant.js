export default {
  role: {
    normal: 'NORMAL',
    admin: 'ADMIN',
    isAdmin: (role) => {
      return role === 'ADMIN'
    }
  },
  device: {
    mobile: 'MOBILE',
    tablet: 'TABLET',
    desktop: 'DESKTOP',
    getDevice: () => {
      if (window.innerWidth < 500 || window.innerHeight < 500) return 'MOBILE'
      if (window.innerWidth < 800 || window.innerHeight < 800) return 'TABLET'
      return 'DESKTOP'
    },
    isMobile: (device) => {
      return device === 'MOBILE'
    },
    isTablet: (device) => {
      return device === 'TABLET'
    },
    isDesktop: (device) => {
      return device === 'DESKTOP'
    }
  },
  editMode: {
    empty: 'EMPTY',
    read: 'READ',
    create: 'CREATE',
    update: 'UPDATE',
    delete: 'DELETE',
    isRead: (editMode) => { return ['EMPTY', 'READ'].includes(editMode) },
    isEdit: (editMode) => { return ['CREATE', 'UPDATE', 'DELETE'].includes(editMode) }
  },
  confirm: {
    yes: 'YES',
    no: 'NO',
    cancel: 'CANCEL'
  },
  message: {
    isDelete: '삭제하시겠습니까?'
  }
}
