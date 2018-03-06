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

// 获取次分类列表
async function getSecondCategoryList(categoryId) {
    var token = getLocalStorage('token'),
        data = [];
    await $.ajax({
        url: `${api}/secondCategory?categoryId=` + categoryId,
        method: 'GET',
        headers: {
            Authorization: 'token ' + token,
        },
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            // console.log(res);
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
 * 产品模块
 */

// 获取产品分页列表 -> 次分类id
async function getProductList(secondCategoryId) {
    var token = getLocalStorage('token'),
        data = [];
    await $.ajax({
        url: `${api}/product/page?secondCategoryId=` + secondCategoryId,
        method: 'GET',
        headers: {
            Authorization: 'token ' + token,
        },
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            data = res.content;
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

// 根据次级分类，数目获取产品列表
async function getProductListByLimit(secondCategoryId, num) {
    var token = getLocalStorage('token'),
        data = [];
    await $.ajax({
        url: `${api}/product/page?secondCategoryId=` + secondCategoryId + '&num=' + num,
        method: 'GET',
        headers: {
            Authorization: 'token ' + token,
        },
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            data = res.content;
            console.log(data);
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

// 获取产品详情
async function getProductDetail(productId, props) {
    var token = getLocalStorage('token'),
        data = [];
    await $.ajax({
        url: `${api}/product/one?productId=` + productId + '&props=' + props,
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

/**
 * 购物车模块
 */

 // 获取购物车列表
async function getCartList() {
    var token = getLocalStorage('token'),
        data = [];
    await $.ajax({
        url: `${api}/cart/list`,
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

/**
 * 用户模块
 */

// 用户登录
function userLogin() {
    var phone = $('#sign-in-phone'),
        password = $('#sign-in-password');
    var phoneNum = phone.val(),
        passwordNum = password.val();

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
            var token = res.token || '';
            if (token.length > 0) {
                inputToLocalStorage('token', token);
                window.location.href = 'index.html';
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