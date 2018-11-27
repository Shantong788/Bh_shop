// 收获地址三级联动
function WlAddress() {
  var that = this;
  this.info = {};
  // 创建
  this.init = function(data, fn) {
    data = data || {};
    // 接收请求地址
    if (!data.action) {
      console.error("未找到三级联动请求地址");
      return;
    }
    this.info.action = data.action;
    this.info.fn = fn;

    // 创建标签
    var html = "";
    html += "<div class='wl-mask' id='wl-mask'></div>";
    html += "<div class='wl-address-box' id='wl-address-box'>";
    html += "<ul class='wl-address-title' id='wl-address-title'>";
    html += "<li class='wl-address-item wl-address-province'>请选择</li>";
    html += "<li class='wl-address-item wl-address-city'>请选择</li>";
    html += "<li class='wl-address-item wl-address-county'>请选择</li></ul>";
    html += "<div class='wl-address-content'>";
    html += "<ul class='wl-address-list' id='wl-address-list'></ul>";
    html += "<div class='wl-address-loading'><div class='rect1'></div>";
    html += "<div class='rect2'></div><div class='rect3'></div>";
    html += "<div class='rect4'></div><div class='rect5'></div></div></div>";
    $(document.body).append(html);
    // 添加事件
    // 蒙版消失事件
    $("#wl-mask").click(function() {
      that.hide();
    });
    // 标题切换事件
    $(".wl-address-item").click(function() {
      if (
        $(this)
          .prev()
          .attr("data-id") ||
        $(this).index() == 0
      ) {
        // 调用三级地址请求
        getAddress(
          JSON.stringify({
            pid:
              $(this)
                .prev()
                .attr("data-id") || ""
          })
        );
        // 切换样式
        $(this)
          .addClass("active-item-title")
          .siblings(".wl-address-item")
          .removeClass("active-item-title");
      }
    });
  };

  // 召唤地址
  this.show = function(data) {
    data = data || {};
    // 接收地址参数
    this.info.addr = data.addr;
    // 出现动画
    $("#wl-address-box").animate({ top: "40%" }, 500);
    $("#wl-mask").show();
    // 参数赋值
    if (this.info.addr) {
      getAddress(JSON.stringify({ pid: this.info.addr.cityId }));

      $(".wl-address-province")
        .text(this.info.addr.province)
        .attr("data-id", this.info.addr.provinceId)
        .next()
        .text(this.info.addr.city)
        .attr("data-id", this.info.addr.cityId)
        .next()
        .text(this.info.addr.content)
        .attr("data-id", this.info.addr.contentId)
        .addClass("active-item-title")
        .siblings(".wl-address-item")
        .removeClass("active-item-title");
    } else {
      getAddress(JSON.stringify({ pid: "" }));
      $(".wl-address-item")
		.text("请选择")
		.removeAttr("data-id");
      $(".wl-address-province")
        .addClass("active-item-title")
        .siblings(".wl-address-item")
        .removeClass("active-item-title");
    }
  };

  // 关闭地址
  this.hide = function() {
    // 第三级选择完毕 关闭
    $("#wl-address-box").animate({ top: "100%" }, 500);
    $("#wl-mask").hide();
    this.info.fn && this.info.fn();
  };

  // 读取所选地址数据
  this.getData = function() {
    var province = $(".wl-address-province").text();
    var provinceId = $(".wl-address-province").attr("data-id");
    var city = $(".wl-address-city").text();
    var cityId = $(".wl-address-city").attr("data-id");
    var county = $(".wl-address-county").text();
    var countyId = $(".wl-address-county").attr("data-id");
    return {
      province: province,
      provinceId: provinceId,
      city: city,
      cityId: cityId,
      county: county,
      countyId: countyId
    };
  };

  // 请求地址
  function getAddress(data) {
    loading();
    $.ajax({
      url: that.info.action,
      type: "post",
      dataType: "json",
      data: data,
      success: function(res) {
        loading();
        if (res.status == 200) {
          that.info.addr = that.info.addr || {};
          var html = "";
          for (var i = 0, len = res.data.length; i < len; i++) {
            var classAct =
              res.data[i].id == that.info.addr.provinceId ||
              res.data[i].id == that.info.addr.cityId ||
              res.data[i].id == that.info.addr.contentId
                ? "act-address"
                : "";

            html +=
              "<li data-id= " +
              res.data[i].id +
              " class=" +
              classAct +
              ">" +
              res.data[i].name +
              "</li>";
          }
          $("#wl-address-list").html(html);

          // 地址选择事件
          $("#wl-address-list > li").click(function() {
            activeAddress(this);
          });
        }
      },
      error: function(res) {
        loading();
      }
    });
  }

  // 地址选中事件
  function activeAddress(th) {
    var id = $(th).attr("data-id");
    var name = $(th).text();
    // 样式切换
    $(th)
      .addClass("act-address")
      .siblings("li")
      .removeClass("act-address");
    // 标题存储数据切换
    $(".active-item-title")
      .nextAll()
      .text("请选择")
      .attr("data-id", "");
    if ($(".wl-address-county").hasClass("active-item-title")) {
      $(".active-item-title")
        .text(name)
        .attr("data-id", id);
      that.hide();
      return;
    } else {
      $(".active-item-title")
        .text(name)
        .attr("data-id", id)
        .removeClass("active-item-title")
        .next()
        .addClass("active-item-title");
    }

    // 请求夏季地址
    getAddress(
      JSON.stringify({
        pid: id
      })
    );
  }

  // loading
  function loading() {
    $(".wl-address-loading").toggle("slow");
  }
}
