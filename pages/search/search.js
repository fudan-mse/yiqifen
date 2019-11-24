//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    results: [],
    showDetail: false
  },
  //事件处理函数
  bindconfirm: function (e) {
    if (!e.detail.value) return;

    var self = this;
    console.log(app.d.point);
    app.d.point = app.d.point + 1;
    wx.showLoading({ title: '加载中……' })
    wx.request({
      // url: app.d.yiqifen + '/share/a/share/api/queryGarbage?openId=1234567&name=' + e.detail.value,
      url: app.d.uniheart + '/proxy?url=https://laji.lr3800.com/api.php?name=' + e.detail.value,
      method: 'get',
      success: function (res) {
        handleResult(res.data.newslist, self);
      },
      error: function (error) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        })
      },
      complete: wx.hideLoading
    });
  },
  showDetail: function (e) {
    this.setData({
      showDetail: this.data.showDetail === e.currentTarget.id ? false : e.currentTarget.id
    })
  },
  onLoad: function () {

  }
})

function handleResult(data, self) {
  if (data && data.length > 0) {
    self.setData({
      results: data.map(r => ({
        name: r.name,
        detail: `${r.explain}${r.contain}${r.tip}`,
        type: {
          id: r.type,
          name: {
            0: '可回收垃圾',
            1: '有害垃圾',
            2: '厨余（湿）垃圾',
            3: '其他（干）垃圾'
          }[r.type]
        }
      }))
    });
  }
  else {
    self.setData({
      results: [{
        name: '暂无结果',
        type: {
          name: '未知'
        }
      }]
    });
  }
}

