// pages/time/time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    ],
    bgimages: [
      {
        img: 'https://cdn.nlark.com/yuque/0/2021/jpeg/428808/1615386507499-8ab26615-fd88-46df-84a3-f985eb636b6b.jpeg'
      },
      {
        img: 'https://cdn.nlark.com/yuque/0/2021/jpeg/428808/1615386506874-7f44cc2a-a78c-4807-bdbf-0cf025120461.jpeg'
      },
      {
        img: 'https://cdn.nlark.com/yuque/0/2021/jpeg/428808/1615386506093-55b74082-cc86-468b-9cc6-946dde9f0fc3.jpeg'
      },
      {
        img: 'https://cdn.nlark.com/yuque/0/2021/jpeg/428808/1615386505106-129dbfba-2865-494a-95df-545137da02d8.jpeg'
      },
      {
        img: 'https://cdn.nlark.com/yuque/0/2021/jpeg/428808/1615386504128-5d9023eb-b6ed-47d3-b113-e786bf2759b0.jpeg'
      },
      {
        img: 'https://cdn.nlark.com/yuque/0/2021/jpeg/428808/1615386502899-a74096af-990f-4ba5-a745-010b7cb57cd7.jpeg'
      },
      {
        img: 'https://cdn.nlark.com/yuque/0/2021/jpeg/428808/1615386501924-28ac2b33-a693-4d4f-912a-3aea432cfa58.jpeg'
      }
    ],
    bg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.timer = setInterval(this.setTime, 1000);
    let index = this.data.list[Math.floor((Math.random() * this.data.list.length))];
    let bg = this.data.bgimages[Math.floor((Math.random() * this.data.bgimages.length))];
    this.setData({
      color: index.color,
      bg: bg.img
    })
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