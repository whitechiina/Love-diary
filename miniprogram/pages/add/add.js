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
    text: ''
  },

  // 向buyerBasics添加数据
  addBuyerBasics: function(res) {
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
        view: 0
      }
    }).then(res => {
      this.setData({
        loadModal: false,
        title: '',
        text: ''
      })
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
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