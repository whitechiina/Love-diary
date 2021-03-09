Page({
  data: {
    PageCur: 'time',  //当前页面
    nowDate: "", // 当前日期
    timer: '',
  },

  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },

  // 转发
  onShareAppMessage() {
    return {
      title: 'ColorUI-高颜值的小程序UI组件库',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})