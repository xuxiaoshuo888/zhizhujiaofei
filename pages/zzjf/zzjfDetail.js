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
              if (res.errMsg == 'requestPayment:ok') { //支付成功后跳转到订单页面，并刷新订单状态
                _this.freshOrder()//刷新订单信息
                wx.showToast({
                  title: '您已支付成功，后台正在处理您的缴费数据，可能需要五分钟左右，请不要重复支付。',
                  icon: 'success',
                  duration: 2000,
                  mask: true
                })
              }
            },
            fail(res) {
              console.log(res)
              wx.showToast({
                icon: 'none',
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
    //更新订单信息
  freshOrder: function() {
    let _this = this;
    wx.showLoading({
      title: '刷新中...',
    })
    wx.request({
      url: `${app.globalData.serverPath}/pay/api/order/orderDetail`,
      method: "POST",
      data: {
        orderId: _this.data.order.id
      },
      header: app.getHeader2(),
      success(res) {
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            details: res.data.details,
            order: res.data.order
          })
          wx.setStorage({
            key: 'details',
            data: res.data.details,
          })
          wx.setStorage({
            key: 'order',
            data: res.data.order,
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
  cancel:function(){//确认是否取消
    let _this = this
    wx.showModal({
      title: '取消订单',
      content: '确定取消订单？',
      confirmText: "确定取消",
      cancelText: "不取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          _this.cancelOrder()
          console.log('确认取消订单')
        } else {
          console.log('不取消订单')
        }
      }
    });
  },
  cancelOrder:function(){//取消订单
  let _this = this;
    wx.request({
      url: `${app.globalData.serverPath}/pay/api/order/cancelOrder`,
      method: "POST",
      data: {
        orderId: _this.data.order.id
      },
      header: app.getHeader2(),
      success(res) {
        wx.hideLoading()
        if (res.data.errcode === '0') {
          wx.showToast({
            icon:'none',
            title: '取消成功!'
          })
        setTimeout(function(){
          wx.switchTab({
            url: '/pages/home/home',
          })
        },2000)
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
  toIndex:function(){
    wx.switchTab({
      url: '/pages/home/home',
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