const db = wx.cloud.database()
const productsCollection = db.collection('white')

Page({
  data: {
    index: null,
    title: '',
    tags: '',
    date: '2021-3-10',
    picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
    region: ['广东省', '广州市', '海珠区'],
    time: '00:00',
    text: ''
  },

  // 向buyerBasics添加数据
  addBuyerBasics: function(res) {
    console.log(res)
    this.setData({
      loadModal: true
    })
    productsCollection.add({
      data: {
        title: res.detail.value.title,
        index: res.detail.value.index,
        data: res.detail.value.data,
        time: res.detail.value.time,
        text: res.detail.value.text
      }
    }).then(res => {
      this.setData({
        loadModal: false
      })
    })
  },

  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
})