// miniprogram/pages/diagram/diagram.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  previewImage1() {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ["https://s1.ax1x.com/2020/06/14/tzaRdH.png"] // 需要预览的图片http链接列表
    })
  },

  previewImage2() {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ["https://s1.ax1x.com/2020/06/14/tzaOoj.png"] // 需要预览的图片http链接列表
    })
  },

  previewImage3() {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ["https://s1.ax1x.com/2020/06/14/tzd9yT.png"] // 需要预览的图片http链接列表
    })
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