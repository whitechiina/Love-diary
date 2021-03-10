// pages/shade/shade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    password: '',
    modalName: ''
  },

  loginForm(data) {
    if (data.detail.value.password == 'cgy' || data.detail.value.password == '陈格瑶' || data.detail.value.password == 'yy' || data.detail.value.password == 'YY') {
      this.setData({
        flag: false
      })
    } else {
      
    }
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})