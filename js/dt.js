$(document).ready(function (){
  var puzzlePrice = 0,
      puzzleUnit = [],
      bodyContent = $('#bodyContent'),
      totlePrice = $('#totlePrice');

  var addrSelect = $('#addrSelect'),
      addressOption = [],
      addrMan = $('#addrMan'),
      addrPhone = $('#addrPhone');
  $.ajax({
    dataType: "json",
    url: "mock.json",
    success: function(res) {
      localStorage.setItem("data",JSON.stringify(res))
      // 遍历物品
      if (res.goodData.length > 0) {
        res.goodData.forEach((element,index) => {
          puzzleUnit =
          `<div class="dt-body-content" key=content${index}>
            <div class="dt-body-li content-li">
              <img id="dtImg" src=${element.img}/>
            </div>
            <div class="dt-body-li content-li header-li-goods">${element.goodsName}</div>
            <div class="dt-body-li content-li">￥ <span id="goodsName" class="goodsName">${element.unitPrice}</span> 元</div>
            <div class="dt-body-li content-li">${element.quantity}</div>
            <div class="dt-body-li content-li">${element.price}</div>
          </div>`;
          bodyContent.append(puzzleUnit)
          puzzlePrice += element.price
        });
        totlePrice.html(puzzlePrice)
      }

      // 遍历地址
      if (res.address.length > 0) {
        res.address.forEach((element,index) => {
          addressOption =
          `<option key=option${index} value =${element.addressId}>${element.addr}</option>`;
          addrSelect.append(addressOption)
          if (index === 0) {
            addrPhone.html(element.phone)
            addrMan.html(element.name)
          }
        });
        totlePrice.html(puzzlePrice)
      }
    }
  });
});

function select(e) {
  // 这个方法选中那个之后就会展示下面的收货人、联系方式
  var localStorageData = JSON.parse(localStorage.getItem('data'));
  var addrMan = $('#addrMan'),
      addrPhone = $('#addrPhone');
  if (localStorageData.address != null) {
    localStorageData.address.forEach((element,index) => {
      if (element.addressId === e) {
        addrMan.html(element.name)
        addrPhone.html(element.phone)
      }
    });
  }
}

// 选择其他地址
function selectAddr(data) {
  if (data === 'button') {
    var coverUp = $('#cover');
    var addUp = $('#addrAdd');
  
    coverUp.css('display', 'block');
    addUp.css('display', 'block');
  }
}

function submit(e) {
  if (e === 'addr') {
    addrSubmit();
  } else if (e === 'submit') {
    alert('提交订单')
  }
}

function cancel() {
  var coverHide = $('#cover');
  var addHide = $('#addrAdd');

  coverHide.css('display', 'none');
  addHide.css('display', 'none');
}

function addrSubmit () {
  var addAddr = $('#addAddr').val(),
      addMan = $('#addMan').val(),
      addPhone = $('#addPhone').val();
// 下面只是演示，在新增数据的时候需要刷新你的地址列表，就可以省略下面的内容了
  var addrSelect = $('#addrSelect'),
      addressOption = [],
      addrMan = $('#addrMan'),
      addrPhone = $('#addrPhone');

      if (addAddr != ''&& addMan != ''&&addPhone !='') {
        addressOption =
          `<option selected value =${addAddr}>${addAddr}</option>`;
          addrSelect.append(addressOption)
          addrPhone.html(addPhone)
          addrMan.html(addMan)

          // 完成就关闭弹窗
          cancel();
      } else {
        alert('填写信息不完整')
      }
}