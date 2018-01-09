const app = getApp()
let request = require('../..//lib/restful-request/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhu_W: 0,
    zhu_H: 0,
    main_img: '',
    title: '',
    price: '',
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
    details_height: 0,
    heights: 0
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
          details_height: windowHeight - 150,
          heights: windowHeight - windowHeight / 750 *(windowWidth / 1.7)
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
  }
})