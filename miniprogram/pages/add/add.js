const db = wx.cloud.database()
const productsCollection = db.collection('white')

Page({
  data: {
    index: 0,
    ind: 0,
    title: '',
    tags: '',
    date: '2021-3-10',
    picker: ['日常', '兴趣', '新鲜事', '吐槽','Miss'],
    color: ['魅红', '翠柳', '靛蓝', '惑紫', '霞彩', '鎏金'],
    time: '00:00',
    text: '',
    img_arr: []
  },

  // 向buyerBasics添加数据
  addBuyerBasics: function(res) {
    let that = this;
    console.log(that)
    // 条件筛选
    let flag = res.detail.value
    if (flag.title == '') {
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (flag.index == '') {
      wx.showToast({
        title: '标签未选择',
        icon: 'none',
        duration: 2000
      }) 
      return
    } else if (flag.ind == '') {
      wx.showToast({
        title: '颜色未选择',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (flag.text == '') {
      wx.showToast({
        title: '请输入文本内容',
        icon: 'none',
        duration: 2000
      })
      return
    }

    this.setData({
      loadModal: true
    })

    productsCollection.add({
      data: {
        title: res.detail.value.title,
        index: res.detail.value.index,
        ind: res.detail.value.ind,
        data: res.detail.value.data,
        time: res.detail.value.time,
        text: res.detail.value.text,
        view: 0,
        img_arr: that.data.img_arr
      }
    }).then(res => {
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

  // 上传图片
  upload: function () {
    var that = this; 
    wx.chooseImage({ //选择图片
      count: 1, //规定选择图片的数量，默认9
      sizeType: ['original'], //规定图片的尺寸， 原图/压缩图
      sourceType: ['album'], //从哪里选择图片， 相册/相机
      success: (chooseres) => { //接口调用成功的时候执行的函数
        //选择图片后可以在这里上传
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + "-" + Math.floor(Math.random() * 1000),//云储存的路径及文件名
          filePath: chooseres.tempFilePaths[0], //要上传的图片/文件路径 这里使用的是选择图片返回的临时地址
          success: (uploadres) => { //上传图片到云储存成功
            // 图片获取赋值
            console.log(uploadres)
            that.setData({
              img_arr: that.data.img_arr.concat(uploadres.fileID)
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
  
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },

  PickerColor(e) {
    this.setData({
      ind: e.detail.value
    })
  },

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
      title: '我还是很喜欢你，像太阳升了落去，无论朝夕。',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
      }
    }
  }

})