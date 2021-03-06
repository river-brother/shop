let request = require('/lib/restful-request/request.js')
App({

  onLaunch: function () {
    // request.getToken();
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  syncUserInfo: function(){
    let extConfig = wx.getExtConfigSync();
    wx.authorize({
      scope: 'scope.userInfo',
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            request.post({
              url: getApp().constData.server + '/api/users/sync/' + extConfig.seller_id,
              data: {
                iv: res.iv,
                encrypted_data: res.encryptedData
              },
              success: function (res) {
                switch (res.statusCode) {
                  case 204:
                    break;
                  default:
                    break;
                }
              }
            })
          }
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    access_token: null,
    user_id: null
  },
  constData: {
    server: 'https://api.ffuture.cn'
  },

})