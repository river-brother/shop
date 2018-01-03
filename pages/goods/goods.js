const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curNav: 1,
    curIndex: 0,
    leftTabArray: [
      {
        id: 1,
        mold: '抄手'
      },
      {
        id: 2,
        mold: '面条'
      },
      {
        id: 3,
        mold: '3'
      },
      {
        id: 4,
        mold: '4'
      }
    ],
    rightTabArray: [
      {
        mold: '抄手',
        rightShopp: [
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            title: '【隆江特色猪脚饭】隆江特色猪脚饭',
            money: '19.00'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            title: '【隆江特色猪脚饭】隆江特色',
            money: '19.00'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            title: '【隆江特色猪脚饭】隆江特色',
            money: '19.00'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            title: '【隆江特色猪脚饭】隆江特色',
            money: '19.00'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            title: '【隆江特色猪脚饭】隆江特色',
            money: '19.00'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            title: '【隆江特色猪脚饭】隆江特色',
            money: '19.00'
          }
        ]
      },
      // {
      //   mold: '面条',
      //   rightShopp: [
      //     {
      //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //       title: '【隆江特色猪脚饭】隆江特色猪脚饭',
      //       money: '19.00'
      //     },
      //     {
      //       img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //       title: '【隆江特色猪脚饭】隆江特色',
      //       money: '19.00'
      //     }
      //   ]
      // }
      
    ]
  },
  switchRightTab: function (e) {
    let id = e.target.dataset.id,
        index = parseInt(e.target.dataset.index);
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let temArray = this.data.leftTabArray
    temArray[0].selected = true
    temArray[0].index = 0
    for (var i = 1; i < temArray.length; i++) {
      temArray[i].selected = false;
      temArray[i].index = i;
    }
    that.setData({
      leftTabArray: temArray
    })
    
    console.log(app.globalData.access_token)
    app.getToken(function(token){
      wx.request({
        url: app.constData.server + '/api/products',
        method: 'GET',
        header: {
          'authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success: function (res) {
          console.log(res.data)
        }
      })
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