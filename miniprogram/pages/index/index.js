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
      this.setData({
        list: res.data
      })
    })
  },

  // 进入详情-增加访问量
  detail: function (e) {
    productsCollection.doc(e.currentTarget.dataset.id).update({
      data: {
        view: _.inc(1)
      }
    })
  },

  // 删除数据
  delect(e) {
    console.log(e)
    productsCollection.doc(e.currentTarget.dataset.id).remove().then(res =>{
      console.log(res)
    })
  },
  
  // 下拉刷新
  onPullDownRefresh() {
    productsCollection.get().then(res => {
      this.setData({
        list: res.data
      },res => {
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
      },res => {
        console.log(res)
      })
    })
  }
})