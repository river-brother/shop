let app = getApp()
let request = require('../../lib/restful-request/request.js')
let extConfig = wx.getExtConfigSync()
Page({
  data: {
    srcH: 0, //图片高
    srcW: 0, //图片宽
    cont2_Height: 0, //内容高
    text: '', //输入的内容
    rightTabArray: [],
    inlit: -1
  },

  //输入框失去焦点时触发
  bindblur: function (e) {
    let text = e.detail
    this.setData({
      text: text
    })
  },

  //搜索
  sousuo: function () {
    let that = this
    let text = this.data.text.value
    request.get({
      url: app.constData.server + '/api/products' + '?filters[title]=' + text + '&filters[user_id]=' + extConfig.seller_id,
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            rightTabArray: res.data.data,
            inlit: 1
          })
        }
      })
  },

  //点击完成/搜索
  my: function() {
    let that = this
    let text = this.data.text.value
    request.get({
      url: app.constData.server + '/api/products' + '?filters[title]=' + text + '&filters[user_id]=' + extConfig.seller_id,
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          rightTabArray: res.data.data,
          inlit: 1
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取系统信息
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth
        var windowHeight = res.windowHeight
        that.setData({
          cont2_Height: windowHeight,
          srcW: windowWidth / 3.8,
          srcH: windowWidth / 3.8 / 1.1
        })
      }
    })

    //用户某个商品分类所有商品
    request.get({
      url: app.constData.server + '/api/products' + '?filters[user_id]=' + extConfig.seller_id + '&filters[recommend]= 1',
      success: function (res) {
        //console.log(res.data.data)
        if (res.data.data[0]) {
          let id = res.data.data[0].id
          // console.log(id)
          that.setData({
            list: res.data.data
          })
        }
      }
    })
  }
})