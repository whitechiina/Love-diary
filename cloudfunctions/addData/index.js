// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const productsCollection = db.collection('white')
const rabot = db.collection('rabot')
const image = db.collection('image')

// 云函数入口函数
exports.main = async (event, context) => {
  return await productsCollection.add({
    data: {
      title: "标题",
      index: "标签",
      ind: "颜色",
      data1: "日期",
      time: "时间",
      text: "文本",
      color: "颜色",
      view: "访问记录"
    }
  })
}

// 机器人信息采集
exports.main = async (event, context) => {
  return await rabot.add({
    data: {
      message: "发送的对话信息",
    }
  })
}

// 获取头像
exports.main = async (event, context) => {
  return await image.add({
    data: {
      image: "",
    }
  })
}
