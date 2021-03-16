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
    changeimage: function() {
      wx.navigateTo({
        url: '../change/change',
      })
    },
    photo: function() {
      wx.navigateTo({
        url: '../photo/photo',
      })
    }
  }
})