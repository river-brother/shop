let app = getApp()
let request = require('../../lib/restful-request/request.js')
let extConfig = wx.getExtConfigSync()

Page({
  data: {
    heights: 0,  //电话以下的内容高度
    action: true,  //省略与收起判断
    img2width: 0,  //商品展示图片宽
    img2height: 0, //商品展示图片高
    imgUrls: [],   //轮播图片
    imgheight: 0,  //轮播图片高
    swiperCurrent: 1, 
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    num: 1,  //分子
    nums: 0, //分母
    shop_name: '', //点名
    type: '', //店主题
    time: '', //营业时间
    shop_notice: '', //公告
    shop_phone: '', //电话
    shop_address: '', //地址
    shop_introduce: '', //简介
    intro_2: '', //简介副本
    list: [], //商品
    latitudes: 0,//维度
    longitudes: 0, //经度
    addressName: '', //地图店名
    address: '',   //地图地址
  },

  //轮播
  swiperChange: function(e) {
    let idx = e.detail.current + 1
    this.setData({
      num: idx
    })
  },

  //图片预览
  previewlmg: function(e) {
    //获取当前图片的下表
    let index = e.currentTarget.dataset.index
    //数据源
    let pictures = this.data.imgUrls
    wx.previewImage({
      current: pictures[index], // 当前显示图片的http链接
      urls: this.data.imgUrls // 需要预览的图片http链接列表
    })
  },

  //点击通话
  phonecallevent: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.shop_phone
    })
  },

  //位置详情
  siteclick: function() {
    let latitudes = Number(this.data.latitudes), 
        longitudes = Number(this.data.longitudes),
        addressName = this.data.addressName,
        address = this.data.address;
    // console.log(latitudes, longitudes)
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        wx.openLocation({
          latitude: latitudes, // 纬度，范围为-90~90，负数表示南纬
          longitude: longitudes, // 经度，范围为-180~180，负数表示西经
          name: addressName,
          address: address,
          scale: 28
        })
      }
    })
  },

  //展开全部
  display: function (e) {
    let cont = this.data.shop_introduce
    if (cont.length > 70) {
      var intro_slice = cont
    }
    this.setData({
      intro_2: intro_slice,
      action: false
    })
  },

  //收起
  pack: function () {
    let cont = this.data.shop_introduce
    let cont_2 = this.data.intro_2
    cont_2 = cont
    // console.log(cont_2)
    if (cont.length > 70) {
      var intro_slice = cont_2.slice(0, 70) + '...'
    }
    this.setData({
      intro_2: intro_slice,
      action: true
    })
  },

  //全部
  shopp: function() {
    wx.switchTab({
      url: '../goods/goods'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let that = this;
    //用户门店个人信息
    request.get({
      url: app.constData.server + '/api/settings' + '?filters[user_id]=' + extConfig.seller_id,
      success: function (res) {
        // console.log(res)
        that.setData({
          shop_name: res.data.data[0].shop_name,
          type: res.data.data[0].industry.name,
          shop_notice: res.data.data[0].shop_notice,
          shop_work_time: res.data.data[0].shop_work_time,
          shop_phone: res.data.data[0].shop_phone,
          shop_address: res.data.data[0].shop_address,
          shop_introduce: res.data.data[0].shop_introduce,
          latitudes: res.data.data[0].shop_latitude,
          longitudes: res.data.data[0].shop_longitude,
          addressName: res.data.data[0].shop_name,
          address: res.data.data[0].shop_address
        })
        //全文超出省略
        let cont = that.data.shop_introduce
        //console.log(cont)
        let cont_2 = that.data.intro_2
        cont_2 = cont
        //console.log(cont_2)
        if (cont_2.length > 76) {
          var intro_slice = cont_2.slice(0, 70) + '...'
        }
        that.setData({
          intro_2: intro_slice,
          action: true
        })    
      }
    })

    //用户某个商品分类所有商品
    request.get({
      url: app.constData.server + '/api/products' + '?filters[user_id]=' + extConfig.seller_id + '&filters[recommend]=' + 1,
      success: function (res) {
        console.log(res)
        let id = res.data.data[0].id
        //console.log(id)
        that.setData({
          list: res.data.data
        })
      }
    })
    
    //轮播
    let arr = []
    request.get({
      url: app.constData.server + '/api/carousels' + '?filters[user_id]=' + extConfig.seller_id,
      success: function (res) {
        for (let x in res.data.data) {
          arr.push(res.data.data[0].attachment.link)
        }
        // console.log(arr)
        that.setData({
          imgUrls: arr,
          nums: res.data.data.length
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
          heights: windowHeight - windowWidth / 2,
          imgheight: windowWidth / 2 ,   //轮播高度
          img2width: windowWidth / 2.2,  //商品展示宽度
          img2height: windowWidth / 2.2 / 1.1    //商品展示高度
        })
      }
    })
  }
})