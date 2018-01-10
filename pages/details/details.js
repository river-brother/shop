const app = getApp()
let request = require('../..//lib/restful-request/request.js')

Page({
  data: {
    zhu_H: 0, //主图高
    main_img: '', //主图
    title: '',  //商品名
    price: '',  //商品价格
    net: '净含量:',
    weight: '', //G
    expect: '保质期:',
    over: '',   //天
    referral: '产品介绍:',
    desc: '', //介绍
    list: [], //产品图片
    proWidth: 0,  //产品图片宽
    proHeight: 0, //产品图片高 
    heights: 0  //内容高
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
          heights: windowHeight - windowHeight / 750 *(windowWidth / 1.7)
        })
      }
    })

    //页面数据
    let arr = []
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