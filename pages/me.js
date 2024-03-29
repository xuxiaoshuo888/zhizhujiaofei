// pages/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    version: app.globalData.version,
    name:"",
    xh:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.appUserInfo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      name: app.globalData.appUserInfo.name,
      xh: app.globalData.appUserInfo.xh
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  unbindIdentity: function() {

    //首先检查是否有身份信息，如果有则对话框确认
    // if (app.globalData.appUserInfo != null) {
    wx.showModal({
      title: '提示',
      content: '您已经绑定了身份信息，点击确认解绑身份！',
      success: function(res) {
        console.log(res)
        if (res.confirm) {
          //传相应参数(openid,token)到后台解绑接口，解绑成功则提示成功，解绑成功后跳转到index页面，执行登录逻辑
          wx.request({
            url: `${app.globalData.serverPath}/api/security/unbind`,
            header: {
              'Authorization': "Bearer " + app.globalData.token
            },
            method: 'POST',
            dataType: 'json',
            success: function(res) {
              console.log(res);
              if (res.data.errcode == '0') {
                //解绑成功，删除token，appuserInfo
                app.globalData.token = "";
                app.globalData.appUserInfo.name = "";
                app.globalData.appUserInfo.xh = "";
                wx.showModal({
                  title: '提示',
                  content: "解绑成功",
                  showCancel: false,
                  success: function(res) {
                    if (res.confirm) {
                      wx.redirectTo({
                        url: '/pages/login/login',
                        success: function(res) {},
                        fail: function(res) {}
                      })
                    }
                  },
                  fail: function(res) {}
                })
              }else{
                wx.showToast({
                  icon: 'none',
                  title: res.data.errmsg
                })
              }
            },
            fail: function(res) {
              wx.showToast({
                icon: 'none',
                title: JSON.stringify(res)
              })
            }
          })

        }
      }
    })
    // } else {
    // }
  },
})