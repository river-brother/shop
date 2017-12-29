var leftSelectedIdx = 0;/*左侧选中的行号*/

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftTabArray: [
      {
        mold: '抄手'
      },
      {
        mold: '面条'
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