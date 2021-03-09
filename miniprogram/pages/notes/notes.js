const db = wx.cloud.database()
const productsCollection = db.collection('white')
const _ = db.command

Page({
  data: {
    list: [],
    page: 0
  },

  onLoad() {
    // 查询集合数据库
    productsCollection.get().then(res => {
      res.data.forEach(e => {
        if (e.index == 0) {
          e.index = '哈哈'
        } 
        if (e.index == 1) {
          e.index = "难过"
        }
        if (e.index == 2) {
          e.index = "面无表情"
        }
      })
      this.setData({
        list: res.data
      })
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    productsCollection.get().then(res => {
      res.data.forEach(e => {
        if (e.index == 0) {
          e.index = '哈哈'
        }
        if (e.index == 1) {
          e.index = "难过"
        }
        if (e.index == 2) {
          e.index = "面无表情"
        }
      })
      this.setData({
        list: res.data
      }, res => {
        console.log('数据下拉完成')
        // 关闭下拉动画
        wx.stopPullDownRefresh()
      })
    })
  },

  // 触底刷新
  onReachBottom() {
    let page = this.data.page + 20;
    productsCollection.skip(page).get().then(res => {
      let newdata = res.data;
      let olddata = this.data.list;
      this.setData({
        list: olddata.concat(newdata),
        page: page
      }, res => {
      })
    })
  }
})