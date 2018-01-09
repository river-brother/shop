let app = getApp()
let request = require('../../lib/restful-request/request.js');
let extConfig = wx.getExtConfigSync();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcH: 0,
    srcW: 0,
    cont2_Height: 0,
    text: '',
    rightTabArray: []
  },
  bindblur: function (e) {
    let text = e.detail
    this.setData({
      text: text
    })
  },
  sousuo: function () {
    let that = this
    let text = this.data.text.value
    request.get({
        url: app.constData.server + '/api/products' + '?filters[title]=' + text,
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            rightTabArray: res.data.data
          })
        }
      })
  },
  //点击完成
  bindconfirm: function() {
    let that = this
    let text = this.data.text.value
    request.get({
      url: app.constData.server + '/api/products' + '?filters[title]=' + text,
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          rightTabArray: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        var windowHeight = res.windowHeight
        that.setData({
          cont2_Height: windowHeight
        })
      }
    })

    //用户某个商品分类所有商品
    request.get({
      url: app.constData.server + '/api/products' + '?filters[user_id]=' + extConfig.seller_id + '&filters[recommend]= 1',
      success: function (res) {
        //console.log(res.data.data)
        let id = res.data.data[0].id
        // console.log(id)
        that.setData({
          list: res.data.data
        })
      }
    })

    //获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth
        var windowHeight = res.windowHeight
        //console.log(windowWidth, windowHeight)
        that.setData({
          srcW: windowWidth / 3.8,
          srcH: windowWidth / 3.8 / 1.1
        })
      }
    })
  }
})