/**
 * 分类模块
 */

// 获取主分类列表
async function getCategoryList() {
    var token = getLocalStorage('token'),
        data = [];
    await $.ajax({
        url: `${api}/category`,
        method: 'GET',
        headers: {
            Authorization: 'token ' + token,
        },
        contentType: "application/json",
        dataType: "json",
        // async: "true",
        success: function (res) {
            data = res;
        },
        error: function (res) {
            if (res.status === 400) {
                console.log('status：400');
            }
            if (res.status === 401) {
                console.log('无权限');
                toLogin();
            }
            if (res.status === 500) {
                console.log('失败了哦！');
            }
        }
    });

    return data;

}

/**
 * 用户模块
 */

// 用户登录
function userLogin() {
    var phone = $('#sign-in-phone'),
        password = $('#sign-in-password');
    var phoneNum = phone.val(),
        passwordNum = password.val();
    console.log(phone);
    console.log(phoneNum);

    if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
        alert("手机号码有误，请重填");
        return false;
    }

    $.ajax({
        url: `${api}/user/login/account`,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "phone": phoneNum,
            "password": passwordNum
        }),

        success: function (res) {
            console.log(res);
            var token = res.token || '';
            if (token.length > 0) {
                inputToLocalStorage('token', token);
                $('#myModal88').modal('hide');
                // 替换弹出框内容
                var data = getUserInfo();
                console.log(data);
                if (!isEmptyObject(data)) {
                    var headImage = data.headImage || 'http://osnwk5h1c.bkt.clouddn.com/image/store/default-head-image.jpeg';
                    console.log(headImage);

                    $('#default-icon').css("display", "none");
                    $('#headImage').css("display", "show");

                }

                getCategoryList();
            }

        },
        error: function (res) {
            if (res.status === 400) {
                console.log('status：400');
            }
            if (res.status === 500) {
                console.log('失败了哦！');
            }
        }
    });
}

// 获取用户个人信息
async function getUserInfo() {
    var token = getLocalStorage('token') || '',
        data = [];
    console.log(token);
    await $.ajax({
        url: `${api}/user`,
        method: 'GET',
        headers: {
            Authorization: 'token ' + token,
        },
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            data = res;
        },
        error: function (res) {
            if (res.status === 400) {
                console.log('status：400');
            }
            if (res.status === 401) {
                console.log('无权限');
                toLogin();
            }
            if (res.status === 500) {
                console.log('失败了哦！');
            }
        }
    });
    return data;
}

// 更新用户个人信息
async function updateUserInfo() {

}

/**
 * 验证码模块
 */

// 获取验证码
function getCode() {

    var phoneId = $('#phone'),
        code = $('#getCode'),
        getNum = $('#getNum'),
        time = 60;
    var phoneNum = phoneId.val(),
        token = getLocalStorage('token') || '';

    if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
        alert("手机号码有误，请重填");
        return false;
    }

    code.css('display', 'none');
    getNum.css('display', 'block');

    $.ajax({
        url: `${api}/user/verCode?mobilePhone=${phoneNum}&&verCodeType=LOGIN`,
        headers: {
            Authorization: 'token ' + token,
        },
        // async: false,
        success: function (res) {
            var timing = setInterval(() => {
                var seconds = time;
                if (seconds <= 0) {
                    code.css('display', 'block');
                    getNum.css('display', 'none');
                    getNum.html('已发送验证码');
                    clearInterval(timing);
                } else {
                    getNum.html(seconds);
                    time -= 1;
                }
            }, 1000);
        }
    })
}
