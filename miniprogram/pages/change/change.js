// 修改头像和背景图
const db = wx.cloud.database()
const productsCollection = db.collection('image')
const _ = db.command


Page({

  /**
   * 页面的初始数据
   */
  data: {
    xy: '',
    yy: '',
    bg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查询集合数据库
    productsCollection.get().then(res => {
      // 获取默认存储的两张图片
      console.log(res)
      let piclist = res.data.reverse()
      this.setData({
        xy: piclist[0].xy,
        yy: piclist[0].yy,
        bg: piclist[0].bg
      })
    })

  },
  // 更换xy
  xy() {
    var that = this;
    wx.chooseImage({ //选择图片
      count: 1, //规定选择图片的数量，默认9
      sizeType: ['original'], //规定图片的尺寸， 原图/压缩图
      sourceType: ['album', 'camera'], //从哪里选择图片， 相册/相机
      success: (chooseres) => { //接口调用成功的时候执行的函数
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + "-" + Math.floor(Math.random() * 1000), //云储存的路径及文件名
          filePath: chooseres.tempFilePaths[0], //要上传的图片/文件路径 这里使用的是选择图片返回的临时地址
          success: (uploadres) => { //上传图片到云储存成功
            // 图片获取赋值
            console.log(uploadres)
            that.setData({
              xy: uploadres.fileID
            })
            wx.showLoading({ //显示加载提示框 不会自动关闭 只能wx.hideLoading关闭
              title: "图片上传中", //提示框显示的提示信息
              mask: true, //显示透明蒙层，防止触摸。为true提示的时候不可以对屏幕进行操作，不写或为false时可以操作屏幕
              success: function () {
                wx.hideLoading() //让提示框隐藏、消失
              }
            });
          },
          fail: (err) => {
            console.log(err)
          }
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  // 更换yy
  yy() {
    var that = this;
    wx.chooseImage({ //选择图片
      count: 1, //规定选择图片的数量，默认9
      sizeType: ['original'], //规定图片的尺寸， 原图/压缩图
      sourceType: ['album', 'camera'], //从哪里选择图片， 相册/相机
      success: (chooseres) => { //接口调用成功的时候执行的函数
        console.log(chooseres)
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + "-" + Math.floor(Math.random() * 1000), //云储存的路径及文件名
          filePath: chooseres.tempFilePaths[0], //要上传的图片/文件路径 这里使用的是选择图片返回的临时地址
          success: (uploadres) => { //上传图片到云储存成功
            // 图片获取赋值
            console.log(uploadres)
            that.setData({
              yy: uploadres.fileID
            })
            wx.showLoading({ //显示加载提示框 不会自动关闭 只能wx.hideLoading关闭
              title: "图片上传中", //提示框显示的提示信息
              mask: true, //显示透明蒙层，防止触摸。为true提示的时候不可以对屏幕进行操作，不写或为false时可以操作屏幕
              success: function () {
                wx.hideLoading() //让提示框隐藏、消失
              }
            });
          },
          fail: (err) => {
            console.log(err)
          }
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },


  // 更换背景图
  bgreplace() {
    var that = this;
    wx.chooseImage({ //选择图片
      count: 1, //规定选择图片的数量，默认9
      sizeType: ['original'], //规定图片的尺寸， 原图/压缩图
      sourceType: ['album', 'camera'], //从哪里选择图片， 相册/相机
      success: (chooseres) => { //接口调用成功的时候执行的函数
        console.log(chooseres)
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + "-" + Math.floor(Math.random() * 1000), //云储存的路径及文件名
          filePath: chooseres.tempFilePaths[0], //要上传的图片/文件路径 这里使用的是选择图片返回的临时地址
          success: (uploadres) => { //上传图片到云储存成功
            // 图片获取赋值
            console.log(uploadres)
            that.setData({
              bg: uploadres.fileID
            })
            wx.showLoading({ //显示加载提示框 不会自动关闭 只能wx.hideLoading关闭
              title: "图片上传中", //提示框显示的提示信息
              mask: true, //显示透明蒙层，防止触摸。为true提示的时候不可以对屏幕进行操作，不写或为false时可以操作屏幕
              success: function () {
                wx.hideLoading() //让提示框隐藏、消失
              }
            });
          },
          fail: (err) => {
            console.log(err)
          }
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  // 确定保存
  sure: function (res) {
    let that = this;
    this.setData({
      loadModal: true
    })
    productsCollection.add({
      data: {
        xy: that.data.xy,
        yy: that.data.yy,
        bg: that.data.bg
      }
    }).then(res => {
      console.log(res)
      this.setData({
        loadModal: false,
        title: '',
        text: '',
        img_arr: []
      })
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
    })
  },

  // 返回
  back() {
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})