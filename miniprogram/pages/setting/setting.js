const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    userInfo: {
      type: Object
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeimage: function () {
      wx.navigateTo({
        url: '../change/change',
      })
    },
    photo: function () {
      wx.navigateTo({
        url: '../photo/photo',
      })
    },
    date: function () {
      wx.navigateTo({
        url: '../date/date',
      })
    }
  },

  // 页面不下拉
  onPageScroll: function (e) {
    if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '我还是很喜欢你，像日光洒满天地，温柔惬意。',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
      }
    }
  }
})