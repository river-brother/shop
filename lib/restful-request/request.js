function header(options) {
  let headers = {}

  if (typeof options.header !== 'undefined') {
    headers = options.header
  }

  headers.accept = "application/json"
  headers['content-type'] = "application/json"

  if (wx.getStorageSync('token')) {
    headers.authorization = 'Bearer ' + wx.getStorageSync('token')
  }

  return headers
}

function getToken(callback){
  let extConfig = wx.getExtConfigSync();
  if (
    wx.getStorageSync('token') && 
    wx.getStorageSync('expires') &&
    parseInt(wx.getStorageSync('expires')) > (new Date()).getTime()
  ){
    if(typeof callback !== 'undefined'){
      callback();
    }
  }else{
    //登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: getApp().constData.server + "/api/users/miniprogram-login/" + extConfig.seller_id,
          data: {
            code: res.code
          },
          header: {
            Accept: 'application/json' 
          },
          method: 'POST',
          success: (success) => {
            switch (success.statusCode) {
              case 403:
                console.log('please register');
                break;
              case 200:
                wx.setStorageSync('token', success.data.data.access_token);
                let now = new Date();
                now.setTime(now.getTime() + ((success.data.data.expires_in-5)*1000));
                wx.setStorageSync('expires', now.getTime());
                if(typeof callback !== 'undefined'){
                  callback();
                }
                break;
            }
          }
        });
      }
    })
  }
}

function commonOptions(options) {

  let requestOptions = {
    url: options.url,
    header: header(options),
  }

  if (typeof options.success !== 'undefined') {
    requestOptions.success = options.success
  }

  if (typeof options.fail !== 'undefined') {
    requestOptions.fail = options.fail
  }

  if (typeof options.complete !== 'undefine') {
    requestOptions.complete !== options.complete
  }
  return requestOptions
}

/**
 * {url, header, success, fail, complete}
 */
function get(options){
  getToken(function(){
    wx.request(commonOptions(options))
  });
}

/**
 * {url, data, header, success, fail, complete}
 */
function post(options) {
  getToken(function(){
    let requestOptions = commonOptions(options)

    if(typeof options.data !== 'undefined'){
      requestOptions.data = options.data
    }

    requestOptions.method = 'POST'

    wx.request(requestOptions)
  });
}

function put(options){
  getToken(function(){
    let requestOptions = commonOptions(options)

    if (typeof options.data !== 'undefined') {
      requestOptions.data = options.data
    }

    requestOptions.method = 'PUT'

    wx.request(requestOptions)
  })
}

function del(options) {
  getToken(function(){
    let requestOptions = commonOptions(options)

    requestOptions.method = 'DELETE'

    wx.request(requestOptions)
  });
}

//把键值对转化为 {"key":value}
function toJson(key,value){
  return '{' + '"' + key + '"' + ":" + value + '}'
}

exports.get = get
exports.post = post
exports.put = put
exports.delete = del
exports.toJson = toJson
exports.getToken = getToken