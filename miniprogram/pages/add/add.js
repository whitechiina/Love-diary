const db = wx.cloud.database()
const productsCollection = db.collection('white')

Page({
  data: {
    index: 0,
    ind: 0,
    title: '',
    tags: '',
    date: '2021-3-10',
    picker: ['日常', '兴趣', '美食', '吐槽'],
    color: ['魅红', '鎏金', '翠柳', '靛蓝', '惑紫', '霞彩'],
    time: '00:00',
    text: ''
  },

  // 向buyerBasics添加数据
  addBuyerBasics: function(res) {
    console.log(res)
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
      console.log(res)
      this.setData({
        loadModal: false
      })
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
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
  }

})