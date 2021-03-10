// pages/time/time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDate: "00年00天00时00分00秒", // 当前日期
    timer: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.timer = setInterval(this.setTime, 1000);
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
  onShareAppMessage: function () {

  }
})