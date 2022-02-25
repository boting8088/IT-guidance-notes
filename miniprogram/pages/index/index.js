//从cloud环境里引用数据库
const db = wx.cloud.database()
//引用集合user
const user = db.collection('user')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    animation1: {},
    animation2: {},
    isloading: false,
  },

  //获取用户信息并存入云数据库
  getuserinfo: function (e) {
    this.setData({
      isloading: true
    })
    console.log("获取用户数据", e.detail.userInfo)
    user.where({
        _openid: app.globalData.openid
      })
      .get({
        success: res => {
          console.log("云端查询" + app.globalData.openid + "的用户数据", res.data)
          if (res.data.length == 0) {
            user.add({
              data: {
                name: e.detail.userInfo.nickName,
                avatar: e.detail.userInfo.avatarUrl,
                isManager: false
              },
              success: res => {
                console.log("添加新用户数据成功", res)
                wx.switchTab({
                  url: '../home/home',
                })
              },
              fail: console.error
            })
          } else {
            wx.switchTab({
              url: '../home/home',
            })
          }
        },
        fail: console.error
      })
  },

  //点击屏幕跳出按钮
  click() {
    this.animation2.scale(1).step({
      duration: 1000
    })
    this.setData({
      animation2: this.animation2.export()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.animation2 = wx.createAnimation()
    this.animation2.scale(0).step({
      timingFunction: 'step-start'
    })
    this.setData({
      animation2: this.animation2.export()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var animation1 = wx.createAnimation()
    animation1.translate(0, 1000).step({
      timingFunction: 'step-start'
    })
    this.setData({
      animation1: animation1.export()
    })
    setTimeout(function () {
      animation1.translate(0, 0).step({
        duration: 2000,
        timingFunction: 'ease-out'
      })
      this.setData({
        animation1: animation1.export()
      })
    }.bind(this), 1000)
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