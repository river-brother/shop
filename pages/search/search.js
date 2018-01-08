let app = getApp()
let request = require('../../lib/restful-request/request.js');
let extConfig = wx.getExtConfigSync();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cont2_Height: 0,
    text: '',
    rightTabArray: [
      // {
      //   main_img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   title: '【隆江特色猪脚饭】隆江特色猪脚饭大家点击点点滴',
      //   price: '19.00'
      // },
      // {
      //   main_img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   title: '【隆江特色猪脚饭】隆江特色猪脚饭大家点击点点滴',
      //   price: '19.00'
      // },
      // {
      //   main_img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   title: '【隆江特色猪脚饭】隆江特色猪脚饭大家点击点点滴',
      //   price: '19.00'
      // }
    ]
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
    // console.log(text)
    // app.getToken(function (token) {
    request.get({
        url: app.constData.server + '/api/products' + '?filters[title]=' + text,
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            rightTabArray: res.data.data
          })
        }
      })
    // })
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