const app = getApp()
let request = require('../../lib/restful-request/request.js')
let extConfig = wx.getExtConfigSync()

Page({
  data: {
    zhu_H: 0, //主图高
    zhu_W: 0,
    main_img: '', //主图
    index_1: 1,
    title: '',  //商品名
    price: '',  //商品价格
    referral: '产品介绍:',
    desc: '', //介绍
    list: [], //产品图片
    proWidth: 0,  //产品图片宽
    proHeight: 0, //产品图片高 
    heights: 0,  //内容高
    spec: '', //规格
    display_price: true,
    mode: 'widthFix',
    zhu: 'widthFix'
  },
  //主图预览
  zhu_tu: function (e) {
    let pictures = this.data.main_img
    //console.log(pictures)
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [pictures] // 需要预览的图片http链接列表
    })
  },

  //商品图片预览
  previewlmg: function (e) {
    //获取当前图片的下表
    //console.log(e)
    let index = e.currentTarget.dataset.index
    //console.log(index)
    //数据源
    let pictures = this.data.list
    wx.previewImage({
      current: pictures[index], // 当前显示图片的http链接
      urls: this.data.list // 需要预览的图片http链接列表
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    request.get({
      url: app.constData.server + '/api/settings' + '?filters[user_id]=' + extConfig.seller_id,
      success: function (res) {
        // console.log(res)
        that.setData({
          display_price: res.data.data[0].display_price
        })
      }
    })

    //图片的宽高
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth
        var windowHeight = res.windowHeight
        //console.log(windowWidth, windowHeight)
        that.setData({
          zhu_W: windowWidth,
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
        //console.log(res.data.data)
        that.setData({
          main_img: res.data.data.main_img.link,
          price: res.data.data.price / 100,
          title: res.data.data.title,
          spec: res.data.data.spec,
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