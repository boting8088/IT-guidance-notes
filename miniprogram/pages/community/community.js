//从cloud环境里引用数据库
const db = wx.cloud.database()
//引用集合article
const article = db.collection('article')
//引用集合user
const user = db.collection('user')
//引用集合comment
const comment = db.collection('comment')
const app = getApp()
const systemInfo = wx.getSystemInfoSync()
const rpx = 750 / systemInfo.windowWidth
Page({
  data: {
    //从云数据库获取到的记录将全部存放在其中
    article: null,
    //状态栏高度
    statusBarHeight: systemInfo.statusBarHeight * rpx,
    //导航栏高度
    navigationBarHeight: 44 * rpx,
    //评论输入框与顶部距离
    top: 0,
  },

  //点赞事件
  onlike: function (e) {
    const index = e.currentTarget.dataset.index
    if (this.data.article[index].islike) {
      let i = 0
      while (this.data.article[index].like[i] != app.globalData.openid) {
        i++
      }
      this.data.article[index].like.splice(i, 1)
      this.setData({
        ["article[" + index + "].islike"]: false,
        ["article[" + index + "].like"]: this.data.article[index].like
      })
    } else {
      this.data.article[index].like.push(app.globalData.openid)
      this.setData({
        ["article[" + index + "].islike"]: true,
        ["article[" + index + "].like"]: this.data.article[index].like
      })
    }
  },

  //评论事件
  oncomment: function (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      ["article[" + index + "].iscomment"]: true,
    })
    //获取键盘高度
    wx.onKeyboardHeightChange(res => {
      this.setData({
        top: (systemInfo.screenHeight - res.height) * rpx
      })
    })
  },

  //输入框失去焦点时
  onblur: function (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      ["article[" + index + "].iscomment"]: false,
    })
  },

  //获取输入框的内容并添加评论
  getcontent: function (e) {
    const index = e.currentTarget.dataset.index
    wx.getUserInfo({
      success: res => {
        const i = this.data.article[index].comment.length
        this.data.article[index].comment.push([{}])
        this.setData({
          ["article[" + index + "].comment[" + i + "].content"]: e.detail.value,
          ["article[" + index + "].comment[" + i + "].name"]: res.userInfo.nickName,
          ["article[" + index + "].iscomment"]: false,
        })
        console.log('添加评论成功', this.data.article[index].comment[i])
      },
      fail: console.error
    })
  },

  //预览图片
  previewImage: function (e) {
    let image = e.currentTarget.dataset.image
    wx.previewImage({
      urls: [image] // 需要预览的图片http链接列表
    })
  },

  //更新云端数据库
  refresh: function () {
    let that = this
    return new Promise(async function (resolve) {
      for (let index = 0; index < that.data.article.length; index++) {
        const art = that.data.article[index]
        //await方法获取Promise对象
        const a = await article.doc(art._id).get()
        //判断本地article集合和云端article集合的like数组是否相同
        if (JSON.stringify(art.like) != JSON.stringify(a.data.like)) {
          //article集合更新
          article.doc(art._id).update({
            data: {
              like: art.like
            },
            success: res => {
              console.log("article集合" + art._id + "更新成功", res)
            },
            fail: console.error
          })
        }
        art.comment.forEach(com => {
          //判断本地comment集合的_id是否为空，因为新创建的本地comment集合没有_id字段
          if (com._id == null) {
            //comment集合更新
            comment.add({
              data: {
                article: art._id,
                content: com.content,
                name: com.name
              },
              success: res => {
                console.log("comment集合" + com._id + "更新成功", res)
              },
              fail: console.error
            })
          }
        })
      }
      resolve("调用refresh函数成功")
    })
  },

  //从云端获取数据，并加载到本地article集合
  load: function () {
    return new Promise((resolve) => {
      //获取云端article集合的数据
      article.get({
        success: res => {
          this.setData({
            article: res.data.reverse()
          })
          for (let index = 0; index < this.data.article.length; index++) {
            //获取云端user集合，并添加文章作者相应的用户信息
            user.where({
              _openid: this.data.article[index]._openid
            })
              .get({
                success: res => {
                  //添加用户昵称和头像到本地article集合
                  this.setData({
                    ["article[" + index + "].name"]: res.data[0].name,
                    ["article[" + index + "].avatar"]: res.data[0].avatar
                  })
                },
                fail: console.error
              })
            //获取云端comment集合，并添加到本地article集合里
            comment.where({
              article: this.data.article[index]._id
            })
              .get({
                success: res => {
                  this.setData({
                    ["article[" + index + "].comment"]: res.data
                  })
                },
                fail: console.error
              })
            //初始化本地article集合的islike和iscomment字段
            this.setData({
              ["article[" + index + "].islike"]: false,
              ["article[" + index + "].iscomment"]: false,
            })
            for (let i = 0; i < this.data.article[index].like.length; i++) {
              //判断当前用户是否对该文章点赞，并更新islike字段
              if (this.data.article[index].like[i] == app.globalData.openid) {
                this.setData({
                  ["article[" + index + "].islike"]: true
                })
              }
            }
          }
          console.log("本地article集合：", this.data.article)
          resolve("调用load函数成功")
        },
        fail: console.error
      })
    })
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载提示框
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: res => {
        //调用load函数加载
        this.load().then(res => {
          wx.hideLoading()
          console.log("加载完毕", res)
        }).catch(err => {
          console.error(err)
        })
      },
      fail: console.error
    })
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
    if (this.data.article) {
      this.onPullDownRefresh()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: async function () {
    this.refresh().then(res => {
      console.log("更新完毕", res)
    }).catch(err => {
      console.error(err)
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.refresh().then(res => {
      console.log("更新完毕", res)
    }).catch(err => {
      console.error(err)
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //显示加载提示框
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: res => {
        //更新云数据库
        this.refresh().then(res => {
          console.log("更新完毕", res)
          //重新加载本地集合
          this.load().then(res => {
            wx.stopPullDownRefresh({
              success: () => {
                wx.hideLoading()
                console.log("加载完毕", res)
              },
              fail: console.error
            })
          }).catch(err => {
            console.error(err)
          })
        }).catch(err => {
          console.error(err)
        })
      },
      fail: console.error
    })
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