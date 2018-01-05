const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cont2_Height: 0,
    curNav: 0,  //商品ID
    curIndex: 0, //index
    typeName: '',
    leftTabArray: [],
    rightTabArray: [
      // {
      //   //type_name: '抄手',
      //   rightShopp: [
      //     {
      //       main_img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //       title: '【隆江特色猪脚饭】隆江特色猪脚饭',
      //       price: '19.00'
      //     }
      //   ]
      // },
    ]
  },
  //左边分页请求右边数据
  switchRightTab: function (e) {
    let id = e.target.dataset.id,
        that = this,
        index = parseInt(e.target.dataset.index);
    //console.log(id)
    this.setData({
      curNav: id,
      curIndex: index,
      typeName: e.target.dataset.name
    })
    console.log(this.data.leftTabArray[0].type_name)
    let curNav = this.data.curNav
    app.getToken(function(token){
      wx.request({
        url: app.constData.server + '/api/products' + '?filters[user_id]=2' + '&filters[type_id]=' + id,
        method: 'GET',
        header: {
          'accept': 'application/json',
          'authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success: function (res) {
          //console.log(res.data) 
          that.setData({
            rightTabArray: res.data.data
          })
        }
      })
    })
    
  },
  //搜索
  search: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let curNav = this.data.curNav
    app.getToken(function (token) {
      wx.request({
        url: app.constData.server + '/api/types' + '?filters[user_id]=' + '2',
        method: 'GET',
        header: {
          'accept': 'application/json',
          'authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            leftTabArray: res.data.data,
            curNav: res.data.data[0].id,
            typeName: res.data.data[0].type_name
          })
          wx.request({
            url: app.constData.server + '/api/products' + '?filters[user_id]=' + '2' + '&filters[type_id]=' + res.data.data[0].id,
            method: 'GET',
            header: {
              'accept': 'application/json',
              'authorization': 'Bearer ' + wx.getStorageSync('token')
            },
            success: function (res) {
            console.log(res.data)
             that.setData({
               rightTabArray: res.data.data
             })
            }
          })

        }
      })
    })
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth
        var windowHeight = res.windowHeight
        that.setData({
          cont2_Height: windowHeight
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