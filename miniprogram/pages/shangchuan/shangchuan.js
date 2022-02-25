var app = getApp();
Page({
  data:{
     url:""
  },
  goToHouTai:function(e){
    var formdata=e.detail.value;
    this.setData({
       "data.url":formdata.url
    })
  },
  getData:function(e){
    wx.cloud.init();
     var getdata=this.data;
     const db=wx.cloud.database();
     db.collection("data").add({
        data:{
           url:getdata.data.url
        },
        success:function(res){
           wx.navigateTo({
             url: '/pages/login/login',
           })
        }
     })
  },
  onLoad:function(){
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //事件
})
