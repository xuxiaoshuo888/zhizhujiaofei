// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    pwdFocus:false,
    userFocus:true
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

  },
  setUsername: function(e){
    this.setData({
      username: e.detail.value
    });
  },
  setPassword: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  handleConfirmUser: function(e){
    this.setData({
      userFocus: false
    });
    this.setData({
      pwdFocus: true
    });
  },
  handleConfirmPwd: function (e) {
    this.setData({
      pwdFocus: false
    });
    this.login();
  },
  login: function(){
    if (!this.data.username) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        mask: true
      })
      this.setData({
        userFocus: true
      });
      return;
    }
    if (!this.data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        mask: true
      })
      this.setData({
        pwdFocus: true
      });
      return;
    }
    let _this = this;
    wx.showLoading({
      title: '登录中，请稍候...',
      mask: true
    })
    //login and bind
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
})