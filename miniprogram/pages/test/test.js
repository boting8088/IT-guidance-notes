const db = wx.cloud.database()
//引用集合article
const article = db.collection('article')
//引用集合user
const user = db.collection('user')
const app = getApp()
const systemInfo = wx.getSystemInfoSync()
const rpx = 750 / systemInfo.windowWidth
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //状态栏高度
    statusBarHeight: systemInfo.statusBarHeight * rpx,
    //导航栏高度
    navigationBarHeight: 44 * rpx,
    //窗口高度
    windowHeight: systemInfo.windowHeight * rpx,
    //屏幕高度
    screenHeight: systemInfo.screenHeight * rpx,
    //标签栏高度
    tabBarHeight: (systemInfo.screenHeight - systemInfo.windowHeight) * rpx,
    input: false,
    top: 0,
  },

  //异步函数async-await用法
  ontest: async function () {
    //等await后的函数执行完再往下执行
    await this.getuserinfo().then(res => {
      console.log("then", res)
    }).catch(err => {
      console.error("catch", err)
    })
    //
    console.log("异步测试完成")
  },

  getuserinfo: async function () {
    //返回Promise对象
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (app.globalData.openid) {
          resolve(app.globalData.openid)//对应then方法回调
        } else {
          reject("未找到openid")//对应catch方法回调
        }
        console.log("getuserinfo调用完成")
      }, 1000)
    })
  },

  onclick() {
    console.log("点击按钮")
    this.setData({
      input: true
    })
    console.log("屏幕高度", systemInfo.screenHeight * rpx)

    //获取键盘高度
    wx.onKeyboardHeightChange(res => {
      console.log("键盘高度", res.height * rpx)
      this.setData({
        top: (systemInfo.screenHeight - res.height) * rpx
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const test = await user.doc('331568005ecb4353002cab4c6e03d508').get()
    console.log("获取云数据", test)
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