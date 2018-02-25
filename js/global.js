// const api = 'http://116.62.113.4:9066/api'
const api = 'http://localhost:9066/api'

// 存进LocalStorage
function inputToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

// 取出LocalStorage数据
function getLocalStorage(key) {
  var message = localStorage.getItem(key);
  return message;
}

// 401 权限不足 调出登录弹窗
function toLogin() {
  $('#myModal88').modal('show');
  return;
}

// 判断空对象
function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}