//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function() {
    //判断之前是否绑定
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 1、 已绑定， 拿后台返回的token， 存， 忽略登录页， 跳转到主页
        // 2、 未绑定， 拿后台返回的openId， 去登录页做绑定
        wx.request({
          url: `${app.globalData.serverPath}/pay/api/security/get_openid`,
          data: {
            code: res.code
          },
          header: app.getHeader(),
          success(res) {
            console.log(res.data)
            if (res.data.errcode === '0') {
              if (res.data.flag === 'login') { //去登陆
                app.globalData.openId = res.data.openid
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              } else if (res.data.flag === 'success') { //去home
                app.globalData.token = res.data.token
                wx.switchTab({
                  url: '/pages/home/home',
                })
              }
            } else {
              wx.showToast({
                title: res.data.errmsg,
              })
            }
          },
          fail(res) {
            wx.showToast({
              title: JSON.stringify(res)
            })
          }
        })
        /*调试*/
      }
    })
  }
})