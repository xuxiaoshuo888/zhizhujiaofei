// pages/zzjf/zzjf.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    checkedAll: false, //是否全选
    yskIdList: [], //当前选中的项的id组成的数组
    yskid: '', //提交表单时，将id连成串
    projectId: "",
    phone: '',
    je: 0, //展示的金额
    checked: true,
    show: false,
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let yskList = wx.getStorageSync('yskList')
    if (yskList) {
      //数据初始渲染的时候，默认全选
      this.setData({
        list: yskList
      })
      if (yskList != null && yskList.length>0) {
        this.setData({
          show: true
        })
      }
      // this.chooseAll()
    }
    this.setData({
      projectId: app.globalData.projectId
    })
    this.setData({
      loading: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onChange(event) { //选着项目
    this.setData({
      yskIdList: event.detail,
      yskid: event.detail.join(',')
    })
    this.chooseAll()
    this.countJe()
    //id数组
  },
  countJe() { //根据yskIdList，计算欠费金额
    let count = 0;
    let idlist = this.data.yskIdList;
    let list = this.data.list;
    if (idlist.length > 0) {
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].ysk.length; j++) {
          for (let k = 0; k < idlist.length; k++) {
            if (list[i].ysk[j].yskid === idlist[k]) {
              count = count + list[i].ysk[j].qfje
            }
          }
        }
      }
    }
    console.log(count)
    this.setData({
      je: count * 100
    })
  },
  chooseAll() { //默认全选
    let m = []
    let list = this.data.list;
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].ysk.length; j++) {
        m.push(list[i].ysk[j].yskid)
      }
    }
    this.setData({
      yskList: m
    })
    console.log(this.data.yskList)
  },
  setPhone(e) {
    console.log(e)
    this.setData({
      phone: e.detail
    })
  },
  toggleItem(event) {
    const index = event.currentTarget.dataset.id;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  toIndex: function () {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  submit() {
    //校验1、至少选一项，2、手机号必填
    if (this.data.yskIdList.length === 0) {
      wx.showToast({
        icon: 'none',
        title: '请至少选择一项！',
      })
      return
    }
    
    if (this.data.yskIdList.length > 0 && this.data.je == 0) {
      wx.showToast({
        icon: 'none',
        title: '您当前选择的费用中存在缓交信息，如果您要继续支付，请先联系财务处取消缓交信息。',
      })
      return
    }
    if (!this.data.phone.trim()) {
      wx.showToast({
        icon: 'none',
        title: '请填写手机号码！',
      })
      return
    }
    let data = {
      yskid: this.data.yskid,
      projectId: this.data.projectId,
      phone: this.data.phone,
    }
    console.log(data)
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/pay/api/order/saveBusinessOrder`,
      method: 'POST',
      data: data,
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') { 
          wx.setStorage({
            key: 'details',
            data: res.data.details,
          })
          wx.setStorage({
            key: 'order',
            data: res.data.order,
          })
          wx.reLaunch({
            url: '/pages/zzjf/zzjfDetail',
          })
        } else { //
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

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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