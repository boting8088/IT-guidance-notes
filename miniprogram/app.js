//app.js
App({
  //全局数据
  globalData: {
    openid: '',
  },
  //生命周期回调：监听小程序初始化，小程序初始化完成时触发，全局只触发一次
  onLaunch: function () {
    //初始化云环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud-1024',
        traceUser: true
      })
    }
    //获取openid
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        this.globalData.openid = res.result.openid
        console.log("获取当前用户的全局变量openid：", this.globalData.openid)
      },
      fail: console.error
    })
  }
})