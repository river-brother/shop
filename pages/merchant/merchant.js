let app = getApp()
let request = require('../../lib/restful-request/request.js');
let extConfig = wx.getExtConfigSync();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    action: true,
    imgwidth: 0,
    imgheight: 0,
    img2width: 0,
    img2height: 0,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    swiperCurrent: 1,
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    num: 1,
    nums: 0,
    shop_name: '',
    //else: '其他分店',
    type: '美食快餐',
    time: '营业时间: 8:00-20:00',
    shop_notice: '这是一段公告!这是一段公告!',
    shop_phone: '028-82611957',
    shop_address: '',
    shop_introduce: '',
    intro_2: '',
    list: [],
    latitudes: 0,//维度
    longitudes: 0 //经度
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
    wx.previewImage({
      current: 'url', // 当前显示图片的http链接
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
    let latitudes = Number(this.data.latitudes) 
    let longitudes = Number(this.data.longitudes)
    // console.log(latitudes, longitudes)
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        wx.openLocation({
          latitude: latitudes, // 纬度，范围为-90~90，负数表示南纬
          longitude: longitudes, // 经度，范围为-180~180，负数表示西经
          name: '隆江猪脚饭',
          address: '成都市高新区天府四街银泰城3F',
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
          longitudes: res.data.data[0].shop_longitude
        })
        //全文
        let cont = that.data.shop_introduce
        //console.log(cont)
        let cont_2 = that.data.intro_2
        //cont_2 = cont
        console.log(cont_2)
        if (cont.length > 76) {
          var intro_slice = cont.slice(0, 70) + '...'
        }
        that.setData({
          intro_2: intro_slice,
          action: true
        })    
      }
    })
    //用户某个商品分类所有商品
    request.get({
      url: app.constData.server + '/api/products' + '?filters[user_id]=' + extConfig.seller_id,
      success: function (res) {
        // console.log(res.data)
        let id = res.data.data[0].id
        // console.log(id)
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
          //console.log(res.data.data)
          // that.setData({
          //   imgUrls: res.data.data
          // })
          for (let x in res.data.data) {
            arr.push(res.data.data[0].attachment.link)
          }
          //console.log(arr)
          that.setData({
            imgUrls: arr
          })
        }
      })

    //轮播总数
    let idx = this.data.imgUrls.length
    this.setData({
      nums: idx   
    })

    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth
        var windowHeight = res.windowHeight
        that.setData({
          imgheight: windowWidth * 355.0 / 750.0 ,
          img2height: windowWidth * 288.0 / 338.0 
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