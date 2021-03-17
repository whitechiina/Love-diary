// 头像和背景图
const db = wx.cloud.database()
const productsCollection = db.collection('image')
const _ = db.command


Page({
  data: {
    xy: '',
    yy: '',
    bg: '',
    nowDate: "00年00天00时00分00秒", // 当前日期
    timer: '',
    color: {},
    list: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
      {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.timer = setInterval(this.setTime, 1000);
    let index = this.data.list[Math.floor((Math.random() * this.data.list.length))];
    this.setData({
        color: index.color,
      }),

      // 查询头像
      productsCollection.get().then(res => {
        // 获取默认存储的两张图片
        let piclist = res.data.reverse()
        console.log(piclist)
        this.setData({
          xy: piclist[0].xy,
          yy: piclist[0].yy,
          bg: piclist[0].bg
        })
      })
  },

  onUnload() {
    clearInterval(this.timer)
  },
  
  /**
   * 监听 TabBar 切换点击
   */
  onTabItemTap: function (item) {
    this.onLoad()
  },

  secondToDate(second) {
    if (!second) {
      return 0;
    }
    var time = new Array(0, 0, 0, 0, 0);
    if (second >= 365 * 24 * 3600) {
      time[0] = parseInt(second / (365 * 24 * 3600));
      second %= 365 * 24 * 3600;
    }
    if (second >= 24 * 3600) {
      time[1] = parseInt(second / (24 * 3600));
      second %= 24 * 3600;
    }
    if (second >= 3600) {
      time[2] = parseInt(second / 3600);
      second %= 3600;
    }
    if (second >= 60) {
      time[3] = parseInt(second / 60);
      second %= 60;
    }
    if (second > 0) {
      time[4] = second;
    }
    return time;
  },
  setTime() {
    //mouth要少一个月不然会出问题
    var create_time = Math.round(new Date(Date.UTC(2021, 1, 24, 0, 0, 0)).getTime() / 1000);
    var timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
    var currentTime = this.secondToDate((timestamp - create_time));
    var currentTimeHtml = currentTime[0] + '年' + currentTime[1] + '天' +
      currentTime[2] + '时' + currentTime[3] + '分' + currentTime[4] +
      '秒';
    this.setData({
      nowDate: currentTimeHtml
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    // 查询头像
    productsCollection.get().then(res => {
      // 获取默认存储的两张图片
      let piclist = res.data.reverse()
      console.log(piclist)
      this.setData({
        xy: piclist[0].xy,
        yy: piclist[0].yy,
        bg: piclist[0].bg
      })
    })
    // 关闭下拉动画
    wx.stopPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '我还是很喜欢你，像风走了八千里，不问归期。',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
      }
    }
  }
})