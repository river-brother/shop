const app = getApp()
let request = require('../..//lib/restful-request/request.js');
let extConfig = wx.getExtConfigSync();

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
    rightTabArray: [],
    Tuwidth: 0,
    Tuheight: 0
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
    // console.log(this.data.leftTabArray[0].type_name)
    let curNav = this.data.curNav
      request.get({
        url: app.constData.server + '/api/products' + '?filters[user_id]=' + extConfig.seller_id + '&filters[type_id]=' + id,
        success: function (res) {
          //console.log(res.data) 
          that.setData({
            rightTabArray: res.data.data
          })
        }
      })
  },
  
  //搜索
  search: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  details: function(e){
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let curNav = this.data.curNav
    request.get({
      url: app.constData.server + '/api/types' + '?filters[user_id]=' + extConfig.seller_id,
      success: function (res) {
        // console.log(res.data)
        that.setData({
          leftTabArray: res.data.data,
          curNav: res.data.data[0].id,
          typeName: res.data.data[0].type_name
        })
        request.get({
          url: app.constData.server + '/api/products' + '?filters[user_id]=' + extConfig.seller_id + '&filters[type_id]=' + res.data.data[0].id,
          success: function (res) {
          // console.log(res.data)
            that.setData({
              rightTabArray: res.data.data
            })
          }
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
          cont2_Height: windowHeight,
          Tuwidth: windowWidth / 3.8,
          Tuheight: windowWidth / 3.8 / 1.2
        })
      }
    })
  },
})