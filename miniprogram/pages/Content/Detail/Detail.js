// miniprogram/pages/Content/Detail/Detail.js
const db = wx.cloud.database()
var name;
var collections;
var db_name;
var flag;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    name = options.name;
    db_name = options.collections;
    flag = options.flag;
    console.log(flag)
    console.log(db_name)
    this.setData({
      name:name,
      db_name:db_name,
      flag: flag,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(flag)
    db.collection(db_name).where({
        ids: flag
    }).field({
      name: true,
      ids:true,
      _id: true
    }).get().then((res) => {
      this.setData({
        listData: res.data
      });
      console.log(res)
    });
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