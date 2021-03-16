const app = getApp()
const db = wx.cloud.database()
const rabot = db.collection('rabot')

Page({
  InputBottom: 0,
  /**
   * 页面的初始数据
   */
  data: {
    my: '',
    centendata: [{
      is_show_right: 2,
      text: '终于等到你,还好我没放弃･ᴗ･'
    }],
    scrollTop: 0
  },

  onLoad: function() {
    this.bottom();
  },

  // 获取hei的id节点然后屏幕焦点调转到这个节点
  bottom: function () {
    var query = wx.createSelectorQuery()
    query.select('#hei').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      wx.pageScrollTo({
        scrollTop: res[0].bottom  // #the-id节点的下边界坐标
      })
      res[1].scrollTop // 显示区域的竖直滚动位置
    })
  },

  getApi(message) {
    let that = this
    wx.request({
      url: app.config.api + 'API/lt.php',
      data: {
        text: message
      },
      method: 'get',
      success(res) {
        if (res.data.text == '未知的错误！') {
          res.data.text = '不是很懂你的意思•́.•̀，要不等我去问问瑶瑶~'
        }
        that.data.centendata.push({
          is_show_right: 2,
          text: res.data.text
        })
        that.setData({
          centendata: that.data.centendata
        })
        console.log(that.data.centendata)
        that.bottom();
      }
    })
  },

  send() {
    // 存贮信息
    rabot.add({
      data: {
        message: this.data.my
      }
    }).then(res => {
      console.log(res)
    }),
    // 处理数据赋值
    this.data.centendata.push({
      is_show_right: 1,
      text: this.data.my
    })
    this.setData({
      centendata: this.data.centendata
    })
    this.getApi(this.data.my)
    this.bottom();
    this.setData({
      my: ''
    })
  },

  InputBlur(e) {
    this.setData({
      my: e.detail.value
    })
  },

  onShareAppMessage: function (res) {
    return {
      title: '你想问我什么？',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
      }
    }
  },

  // 页面不下拉
  onPageScroll: function (e) {
    if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
})