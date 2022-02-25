// miniprogram/pages/index/index.js
const db = wx.cloud.database()
var college = 'one'
var current = 'c'
var db_name
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  data: {
    background: [
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1889194649,695475343&fm=26&gp=0.jpg', 
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=721824502,1848396738&fm=26&gp=0.jpg', 
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3501657826,149658298&fm=26&gp=0.jpg'],
    indicatorDots: true,
    vertical: false,
    interval: 2000,
    duration: 500,
    listData : [],
    college : 'one',
    current : 'java'
  },
/*生命周期函数--监听页面的渲染 */
/* 这个地方要设置用户的权限 */
onReady : function(){
  db.collection('java1').field({
    collections : true,
    name : true,
    flag:true,
    _id : true
  }).get().then((res)=>{
    this.setData({
      listData : res.data
    });
    console.log(res)
  });
},
/*切换语言的函数*/
  handlecurrent(ev){
    let current = ev.target.dataset.current;
    if( current == this.data.current ){
      return false;
    }
    this.setData({
      current
    });
    console.log(current);
    college = this.data.college;
    
/*切换后的函数 */
    if (college == 'one' && this.data.current == 'java') {
      db_name = 'java1';
    } else if (college == 'two' && this.data.current == 'java') {
      db_name = 'java2';
    } else if (college == 'three' && this.data.current == 'java') {
      db_name = 'java3';
    } else if (college == 'one' && this.data.current == 'c') {
      db_name = 'c1';
    } else if (college == 'two' && curthis.data.currentrent == 'c') {
      db_name = 'c2';
    } else if (college == 'three' && this.data.current == 'c') {
      db_name = 'c3';
    } else if (college == 'one' && this.data.current == 'python') {
      db_name = 'python1';
    } else if (college == 'two' && this.data.current == 'python') {
      db_name = 'python2';
    } else if (college == 'three' && this.data.current == 'python') {
      db_name = 'python3';
    };
    console.log(db_name);
    db.collection(db_name).field({
      name: true,
      collections: true,
      flag: true,
      _id: true
    }).get().then((res) => {
      this.setData({
        listData: res.data
      });
      console.log(res)
    });
  },
  /*切换年级的函数 */
  handlecollege(ev) {
    let college = ev.target.dataset.college;
    if (college == this.data.college) {
      return false;
    }
    this.setData({
      college
    });
    current = this.data.current;
    /*切换后的函数 */
    if (this.data.college == 'one' && current == 'java') {
      db_name = 'java1';
    } else if (this.data.college == 'two' && current == 'java') {
      db_name = 'java2';
    } else if (this.data.college == 'three' && current == 'java') {
      db_name = 'java3';
    } else if (this.data.college == 'one' && current == 'c') {
      db_name = 'c1';
    } else if (this.data.college == 'two' && current == 'c') {
      db_name = 'c2';
    } else if (this.data.college == 'three' && current == 'c') {
      db_name = 'c3';
    } else if (this.data.college == 'one' && current == 'python') {
      db_name = 'python1';
    } else if (this.data.college == 'two' && current == 'python') {
      db_name = 'python2';
    } else if (this.data.college == 'three' && current == 'python') {
      db_name = 'python3';
    };
    console.log(db_name);
    db.collection(db_name).field({
      name: true,
      collections: true,
      flag: true,
      _id: true
    }).get().then((res) => {
      this.setData({
        listData: res.data
      });
      console.log(res)
    });
  },
 
  /*获取数据库的地址信息，颠三倒四第三方的士大夫多所切换到数据库的那些 */
  onClickDetail: function(res){
    console.log(res)
    var collections = res.currentTarget.dataset.collections;
    var flag = res.currentTarget.dataset.flag;
    var name = res.currentTarget.dataset.name;
    console.log(name)
    console.log(collections)
    console.log(flag)
    wx.navigateTo({
      url: "../Content/Detail/Detail"+"?name="+name+"&collections="+collections+"&flag="+flag,
    })
  }
})