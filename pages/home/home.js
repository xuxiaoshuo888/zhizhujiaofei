// pages/home/home.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ['../../img/b1.jpg', '../../img/b2.jpg'],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    grids: ['自助缴费']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  getData: () => {
    //获取九宫格列表
    wx.request({
      url: '',
      data: {},
      header: app.getHeader(),
      success(res) {
        console.log(res.data)
        res.data.errcode = '0'
        if (res.data.errcode === '0') {
            this.grids = res.data.data
        }
      },
      fail(res) {
        wx.showToast({
          title: JSON.stringify(res)
        })
      }
    })
  },
  toDetail:()=>{//跳转九宫格详情页
    wx.navigateTo({
      url: '/pages/zzjf/zzjf'
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