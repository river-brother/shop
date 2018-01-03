function header(options) {
  let headers = {}

  if (typeof options.header !== 'undefined') {
    headers = options.header
  }

  headers.accept = "application/json"
  headers['content-type'] = "application/json"

  // if (wx.getStorageSync('token')) {
  //   headers.authorization = 'Bearer ' + wx.getStorageSync('token')
  // }

  return headers
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
  wx.request(commonOptions(options))
}

/**
 * {url, data, header, success, fail, complete}
 */
function post(options) {
  let requestOptions = commonOptions(options)

  if(typeof options.data !== 'undefined'){
    requestOptions.data = options.data
  }

  requestOptions.method = 'POST'

  wx.request(requestOptions)
}

function put(options){
  let requestOptions = commonOptions(options)

  if (typeof options.data !== 'undefined') {
    requestOptions.data = options.data
  }

  requestOptions.method = 'PUT'

  wx.request(requestOptions)
}

function del(options) {
  let requestOptions = commonOptions(options)

  requestOptions.method = 'DELETE'

  wx.request(requestOptions)
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