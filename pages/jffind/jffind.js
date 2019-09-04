// pages/jffind/jffind.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
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
    this.getData()
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
  getData: function () {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/pay/api/payInfo/page`,
      method: 'POST',
      data:{limit:100,page:1},
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            list: res.data.data.rows
          })
        } else {
          wx.showToast({
            title: res.data.errmsg,
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
  }
})