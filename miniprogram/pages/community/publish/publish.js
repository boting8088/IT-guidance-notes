//从云开发环境里引用数据库
const db = wx.cloud.database()
//引用集合article
const article = db.collection('article')
//引用集合user
const user = db.collection('user')
const util = require('../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    tempictures: [],
    pictures: [],
    content: ''
  },
  //添加图片
  addPicture: function () {
    // 用户选择图片
    wx.chooseImage({
      count: 3 - this.data.num, //规定选择图片的数量，默认9
      sizeType: ['original', 'compressed'], //规定图片的尺寸， 原图/压缩图
      sourceType: ['album', 'camera'], //从哪里选择图片， 相册/相机
      success: res => {
        var length = res.tempFilePaths.length
        this.data.num += length
        for (let index = 0; index < length; index++) {
          this.data.tempictures.push(res.tempFilePaths[index])
          this.setData({
            num: this.data.num,
            tempictures: this.data.tempictures
          })
        }
        console.log("添加图片成功", this.data.tempictures)
      },
      fail: console.error
    })
  },
  //预览图片
  previewImage: function (event) {
    var image = event.currentTarget.dataset.image
    wx.previewImage({
      urls: [image] // 需要预览的图片http链接列表
    })
  },
  //删除图片
  deleteImage: function (event) {
    var index = event.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: res => {
        if (res.confirm) {
          console.log('用户点击确定')
          this.data.tempictures.splice(index, 1)
          this.setData({
            num: this.data.num - 1,
            tempictures: this.data.tempictures
          })
          console.log("删除图片成功", this.data.tempictures)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail: console.error
    })
  },
  //获取用户输入的文本
  addtext: function (event) {
    this.data.content = event.detail.value
    console.log('获取文本成功', this.data.content)
  },
  //用户点击发表
  publish: function () {
    wx.showLoading({
      title: '发表中...',
      mask: true
    })
    for (let index = 0; index < this.data.tempictures.length; index++) {
      //上传图片到云存储
      wx.cloud.uploadFile({
        //云储存的路径及文件名
        cloudPath: "pictures/" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000) + ".png",
        //要上传的图片/文件路径
        filePath: this.data.tempictures[index],
        success: res => {
          this.data.pictures.push(res.fileID)
          console.log('上传图片到云储存成功', this.data.pictures)
        },
        fail: console.error
      })
    }
    var that = this
    setTimeout(function () {
      //上传记录到云数据库
      article.add({
        data: {
          content: that.data.content,
          pictures: that.data.pictures,
          date: util.formatTime(new Date()),
          like: []
        },
        success: res => {
          console.log('添加记录到云数据库成功', res)
          //关闭当前页面，返回上一页面
          wx.navigateBack()
        },
        fail: console.error
      })
    }, 1500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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