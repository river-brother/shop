const app = getApp()
let request = require('../..//lib/restful-request/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhu_W: 0,
    zhu_H: 0,
    main_img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    title: '【老麻龙抄手】特色海味大抄手',
    price: '19.00',
    net: '净含量:',
    weight: '',
    expect: '保质期:',
    over: '',
    referral: '产品介绍:',
    desc: '',
    list: [],
    proWidth: 0,
    proHeight: 0,
    logoheight: 0,
    details_height: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //图片的宽高
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth
        var windowHeight = res.windowHeight
        //console.log(windowWidth, windowHeight)
        that.setData({
          zhu_H: windowWidth / 1.7,//高
          proWidth: windowWidth / 1.2,
          proHeight: windowWidth / 1.2 / 2,
          logoheight: windowHeight,
          details_height: windowHeight
        })
      }
    })

    let arr = [];
    request.get({
      url: app.constData.server + '/api/products/' + options.id,
      success: function (res) {
        // console.log(res)
        that.setData({
          main_img: res.data.data.main_img,
          price: res.data.data.price,
          title: res.data.data.title,
          weight: res.data.data.weight,
          over: res.data.data.over,
          desc: res.data.data.desc,
        })
        for(var x in res.data.data.attachments){
          arr.push(res.data.data.attachments[x].link)
        }
        that.setData({
          list:arr
        })
      }
    })
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
    
  }
})