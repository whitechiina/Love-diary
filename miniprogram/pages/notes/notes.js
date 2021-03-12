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
          e.index = "新鲜事"
        }
        if (e.index == 3) {
          e.index = "吐槽"
        }
        if (e.index == 4) {
          e.index = "Miss"
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
        if (e.ind == 5) {
          e.ind = "bg-gradual-orange"
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
      console.log(res)
      res.data.forEach(e => {
        if (e.index == 0) {
          e.index = '日常'
        }
        if (e.index == 1) {
          e.index = "兴趣"
        }
        if (e.index == 2) {
          e.index = "新鲜事"
        }
        if (e.index == 3) {
          e.index = "吐槽"
        }
        if (e.index == 4) {
          e.index = "Miss"
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
        if (e.ind == 5) {
          e.ind = "bg-gradual-orange"
        }
      })
      this.setData({
        list: res.data.reverse()
      }, res => {
        wx.showToast({
          title: '数据下拉刷新完成',
          icon: 'success',
          duration: 2000
        })
        // 关闭下拉动画
        wx.stopPullDownRefresh()
      })
    })
  },

  //预览图片，放大预览
  preview(event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    //图片预览
    wx.previewMedia({
      current: src // 当前显示图片的http链接
    })
  },
  
  // 触底刷新
  onReachBottom() {
    let page = this.data.page + 20;
    productsCollection.skip(page).get().then(res => {
      res.data.forEach(e => {
        if (e.index == 0) {
          e.index = '日常'
        }
        if (e.index == 1) {
          e.index = "兴趣"
        }
        if (e.index == 2) {
          e.index = "新鲜事"
        }
        if (e.index == 3) {
          e.index = "吐槽"
        }
        if (e.index == 4) {
          e.index = "Miss"
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
        if (e.ind == 5) {
          e.ind = "bg-gradual-orange"
        }
      })
      let newdata = res.data;
      let olddata = this.data.list;
      this.setData({
        list: olddata.concat(newdata),
        page: page
      }, res => {
        wx.showToast({
          title: '数据触底加载完成',
          icon: 'success',
          duration: 2000
        })
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '我还是很喜欢你，像云漂泊九万里，不曾歇息。',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
      }
    }
  }
})