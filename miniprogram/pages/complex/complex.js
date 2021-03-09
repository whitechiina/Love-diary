// pages/complex/complex.js
const db = wx.cloud.database()
const productsCollection = db.collection('white')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  // 查询
  simple() {
    productsCollection.get().then(res => {
      console.log(res)
      this.setData({
        list: res.data
      })
    })
  },

  // 唯一
  only(e) {
    productsCollection.where({
      title: "卢本伟牛逼",
    }).get().then(res=> {
      this.setData({
        list: res.data
      })
    })
  }

})