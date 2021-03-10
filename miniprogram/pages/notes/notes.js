const db = wx.cloud.database()
const productsCollection = db.collection('white')
const _ = db.command

Page({
  data: {
    list: [],
    page: 0
  },

  // 点赞
  click: function(e) {
    let id = e.currentTarget.dataset.id;
    //向云函数中传递参数
    productsCollection.doc(e.currentTarget.dataset.id).update({
      data: {
        view: _.inc(1)
      }
    }).then((res)=> {
      //数据库更新成功之后获取结果
      let updated = res.stats.updated;
      if (updated) {
        //进行cloneListData的拷贝
        let cloneListData = [...this.data.list]
        //构建循环，获取cloneListData，然后进行自增
        for (let i = 0; i < cloneListData.length; i++) {
          if (cloneListData[i]._id == id) {
            cloneListData[i].view++;
          }
        }
        console.log(cloneListData)
        this.setData({
          //更新listData下的links
          list: cloneListData
        })
      }
    })
  },

  onLoad() {
    // 查询集合数据库
    productsCollection.get().then(res => {
      res.data.forEach(e => {
        if (e.index == 0) {
          e.index = '日常'
        } 
        if (e.index == 1) {
          e.index = "兴趣"
        }
        if (e.index == 2) {
          e.index = "美食"
        }
        if (e.index == 3) {
          e.index = "吐槽"
        }
        if (e.ind == 0) {
          e.ind = 'bg-gradual-red'
        }
        if (e.ind == 1) {
          e.ind = "bg-gradual-green"
        }
        if (e.ind == 2) {
          e.ind = "bg-gradual-blue"
        }
        if (e.ind == 3) {
          e.ind = "bg-gradual-purple"
        }
        if (e.ind == 4) {
          e.ind = "bg-gradual-pink"
        }
      })
      this.setData({
        list: res.data.reverse(),
      })
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    productsCollection.get().then(res => {
      res.data.forEach(e => {
        if (e.index == 0) {
          e.index = '日常'
        }
        if (e.index == 1) {
          e.index = "兴趣"
        }
        if (e.index == 2) {
          e.index = "美食"
        }
        if (e.index == 3) {
          e.index = "吐槽"
        }
        if (e.ind == 0) {
          e.ind = 'bg-gradual-red'
        }
        if (e.ind == 1) {
          e.ind = "bg-gradual-green"
        }
        if (e.ind == 2) {
          e.ind = "bg-gradual-blue"
        }
        if (e.ind == 3) {
          e.ind = "bg-gradual-purple"
        }
        if (e.ind == 4) {
          e.ind = "bg-gradual-pink"
        }
      })
      this.setData({
        list: res.data.reverse()
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