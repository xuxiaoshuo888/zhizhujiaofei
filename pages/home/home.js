// pages/home/home.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ['../../img/b1.jpg'],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    grids: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
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
  getData: function() {
    let _this = this;
    //获取九宫格列表
    wx.request({
      url: `${app.globalData.serverPath}/api/project/list`,
      header: app.getHeader2(),
      success(res) {
        if (res.data.errcode === '0') {
          _this.setData({
            grids: res.data.data
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: JSON.stringify(res)
        })
      }
    })
  },
  toDetail: (e) => { //跳转九宫格详情页
    console.log(e)
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    app.globalData.projectId = id; //存id，再zzjf页面提交应收款时会用到
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/order/arrear`,
      method: "POST",
      data: {
        projectId: id
      },
      header: app.getHeader2(),
      success(res) {
        wx.hideLoading()
        if (res.data.errcode === '0') {
          if (res.data.flag === 'ysk') { //应收款，去zzjf页面，存yskList
            if (res.data.yskList.length === 0) {//没有ysklist，则停留在原界面
              wx.showToast({
                icon:'none',
                title: '您当前没有需要缴费的项目！'
              })
              return
            }
            wx.setStorage({
              key: 'yskList',
              data: res.data.yskList,
            })
            wx.navigateTo({
              url: '/pages/zzjf/zzjf',
            })
          } else if (res.data.flag === 'order') { //去zzjfDetail页面
            wx.setStorage({
              key: 'details',
              data: res.data.details,
            })
            wx.setStorage({
              key: 'order',
              data: res.data.order,
            })
            wx.redirectTo({
              url: '/pages/zzjf/zzjfDetail',
            })
          }
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