// pages/zzjf/zzjfDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: [],
    order: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let details = wx.getStorageSync('details')
    if (details) {
      this.setData({
        details: details
      })
    }
    let order = wx.getStorageSync('order')
    if (order) {
      this.setData({
        order: order
      })
    }
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

  },
  pay() {
    let _this = this;
    wx.showLoading({
      title: '支付中',
    })
    wx.request({
      url: `${app.globalData.serverPath}/pay/api/order/startPay`,
      method: "POST",
      data: {
        orderId: _this.data.order.id
      },
      header: app.getHeader2(),
      success(res) {
        wx.hideLoading()
        if (res.data.errcode === '0') {
          wx.requestPayment({
            timeStamp: res.data.data.bankMiniData.timeStamp,
            nonceStr: res.data.data.bankMiniData.nonceStr,
            package: res.data.data.bankMiniData.package,
            signType: res.data.data.bankMiniData.signType,
            paySign: res.data.data.bankMiniData.paySign,
            success(res) {
              console.log(res)
            },
            fail(res) {
                console.log(res)
              wx.showToast({
                title: JSON.stringify(res)
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.errmsg
          })
        }
      },
      fail(res) {
        wx.hideLoading()
        wx.showToast({
          title: JSON.stringify(res)
        })
      }
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

  }
})