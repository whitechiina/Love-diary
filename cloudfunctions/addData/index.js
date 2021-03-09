// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const productsCollection = db.collection('white')

// 云函数入口函数
exports.main = async (event, context) => {
  return await productsCollection.add({
    data: {
      title: "标题",
      index: "标签",
      data1: "日期",
      time: "时间",
      text: "文本"
    }
  })
}