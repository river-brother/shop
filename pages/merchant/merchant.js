Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    num: 1,
    nums: 5,
    name: '隆江猪脚饭',
    else: '其他分店',
    type: '美食快餐',
    time: '营业时间: 8:00-20:00',
    notice: '这是一段简短的店铺公告, 滚动显示',
    phone: '028-82611957',
    site: '成都市高新区天府四街银泰城3F',
    intro: '隆江猪脚饭是用猪脚、饭制作的一道主食, 猪脚中含有丰富的胶原蛋白, 这是一种由生物大分子组成的胶类物资, 是构成肌腱结缔组织中最主要的蛋白质成分, 具有2222',
    list: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '【隆江特色猪脚饭】隆江特色猪脚饭饭',
        money: '19.00'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '【隆江特色猪脚饭】隆江特色猪脚饭饭',
        money: '19.00'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '【隆江特色猪脚饭】隆江特色猪脚饭饭',
        money: '19.00'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '【隆江特色猪脚饭】隆江特色猪脚饭饭',
        money: '19.00'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '【隆江特色猪脚饭】隆江特色猪脚饭饭',
        money: '19.00'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '【隆江特色猪脚饭】隆江特色猪脚饭饭',
        money: '19.00'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '【隆江特色猪脚饭】隆江特色猪脚饭饭',
        money: '19.00'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '【隆江特色猪脚饭】隆江特色猪脚饭饭',
        money: '19.00'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '【隆江特色猪脚饭】隆江特色猪脚饭饭',
        money: '19.00'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        title: '【隆江特色猪脚饭】隆江特色猪脚饭饭',
        money: '19.00'
      }
    ]
  },
  //点击通话
  phonecallevent: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
      success: function() {

      }
    })
  },
  //位置详情
  siteclick: function() {
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        wx.openLocation({
          latitude: 30.5418000000, // 纬度，范围为-90~90，负数表示南纬
          longitude: 104.0580600000, // 经度，范围为-180~180，负数表示西经
          name: '隆江猪脚饭',
          address: '成都市高新区天府四街银泰城3F',
          scale: 28
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let data = this.data.intro
    // for (let index in data) {
    //   if (data[index].intro.length > 76) {
    //     data[index].intro_slice = data[index].intro.slice(0, 76) + '...'
    //   }
    // }
    // this.setData({
    //   intro: data
    // })
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