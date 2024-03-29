//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    appUserInfo:{
      name:'',
      xh:''
    },
    // serverPath: "http://192.168.0.111:8080",
    serverPath: "https://stdpay.hubu.edu.cn/pay",
    token: "",
    openId: "",
    projectId:"",//home页，九宫格项目的id
    version:"1.1.2"
  },
  getHeader: function() {
    return {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    }
  },
  getHeader2: function() {
    return {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer " + this.globalData.token,
    }
  }
})