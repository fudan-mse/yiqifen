import { Block, View, Button, Image, Text, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './dingdan.scss'
// pages/user/dingdan.js
//index.js
//获取应用实例
var app = Taro.getApp()
var common = require('../../utils/common.js')

@withWeapp({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    isStatus: 'pay', //10待付款，20待发货，30待收货 40、50已完成
    page: 0,
    refundpage: 0,
    orderList0: [],
    orderList1: [],
    orderList2: [],
    orderList3: [],
    orderList4: []
  },
  onLoad: function(options) {
    this.initSystemInfo()
    this.setData({
      currentTab: parseInt(options.currentTab),
      isStatus: options.otype
    })

    if (this.data.currentTab == 4) {
      this.loadReturnOrderList()
    } else {
      this.loadOrderList()
    }
  },
  getOrderStatus: function() {
    return this.data.currentTab == 0
      ? 1
      : this.data.currentTab == 2
      ? 2
      : this.data.currentTab == 3
      ? 3
      : 0
  },

  //取消订单
  removeOrder: function(e) {
    var that = this
    var orderId = e.currentTarget.dataset.orderId
    Taro.showModal({
      title: '提示',
      content: '你确定要取消订单吗？',
      success: function(res) {
        res.confirm &&
          Taro.request({
            url: app.d.ceshiUrl + '/Api/Order/orders_edit',
            method: 'post',
            data: {
              id: orderId,
              type: 'cancel'
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              //--init data
              var status = res.data.status
              if (status == 1) {
                Taro.showToast({
                  title: '操作成功！',
                  duration: 2000
                })
                that.loadOrderList()
              } else {
                Taro.showToast({
                  title: res.data.err,
                  duration: 2000
                })
              }
            },
            fail: function() {
              // fail
              Taro.showToast({
                title: '网络异常！',
                duration: 2000
              })
            }
          })
      }
    })
  },

  //确认收货
  recOrder: function(e) {
    var that = this
    var orderId = e.currentTarget.dataset.orderId
    Taro.showModal({
      title: '提示',
      content: '你确定已收到宝贝吗？',
      success: function(res) {
        res.confirm &&
          Taro.request({
            url: app.d.ceshiUrl + '/Api/Order/orders_edit',
            method: 'post',
            data: {
              id: orderId,
              type: 'receive'
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              //--init data
              var status = res.data.status
              if (status == 1) {
                Taro.showToast({
                  title: '操作成功！',
                  duration: 2000
                })
                that.loadOrderList()
              } else {
                Taro.showToast({
                  title: res.data.err,
                  duration: 2000
                })
              }
            },
            fail: function() {
              // fail
              Taro.showToast({
                title: '网络异常！',
                duration: 2000
              })
            }
          })
      }
    })
  },

  loadOrderList: function() {
    var that = this
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Order/index',
      method: 'post',
      data: {
        uid: app.d.userId,
        order_type: that.data.isStatus,
        page: that.data.page
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //--init data
        var status = res.data.status
        var list = res.data.ord
        switch (that.data.currentTab) {
          case 0:
            that.setData({
              orderList0: list
            })
            break
          case 1:
            that.setData({
              orderList1: list
            })
            break
          case 2:
            that.setData({
              orderList2: list
            })
            break
          case 3:
            that.setData({
              orderList3: list
            })
            break
          case 4:
            that.setData({
              orderList4: list
            })
            break
        }
      },
      fail: function() {
        // fail
        Taro.showToast({
          title: '网络异常！',
          duration: 2000
        })
      }
    })
  },

  loadReturnOrderList: function() {
    var that = this
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Order/order_refund',
      method: 'post',
      data: {
        uid: app.d.userId,
        page: that.data.refundpage
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //--init data
        var data = res.data.ord
        var status = res.data.status
        if (status == 1) {
          that.setData({
            orderList4: that.data.orderList4.concat(data)
          })
        } else {
          Taro.showToast({
            title: res.data.err,
            duration: 2000
          })
        }
      },
      fail: function() {
        // fail
        Taro.showToast({
          title: '网络异常！',
          duration: 2000
        })
      }
    })
  },

  // returnProduct:function(){
  // },
  initSystemInfo: function() {
    var that = this

    Taro.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    })
  },
  bindChange: function(e) {
    var that = this
    that.setData({ currentTab: e.detail.current })
  },
  swichNav: function(e) {
    var that = this
    if (that.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      var current = e.target.dataset.current
      that.setData({
        currentTab: parseInt(current),
        isStatus: e.target.dataset.otype
      })

      //没有数据就进行加载
      switch (that.data.currentTab) {
        case 0:
          !that.data.orderList0.length && that.loadOrderList()
          break
        case 1:
          !that.data.orderList1.length && that.loadOrderList()
          break
        case 2:
          !that.data.orderList2.length && that.loadOrderList()
          break
        case 3:
          !that.data.orderList3.length && that.loadOrderList()
          break
        case 4:
          that.data.orderList4.length = 0
          that.loadReturnOrderList()
          break
      }
    }
  },
  /**
   * 微信支付订单
   */
  // payOrderByWechat: function(event){
  //   var orderId = event.currentTarget.dataset.orderId;
  //   this.prePayWechatOrder(orderId);
  //   var successCallback = function(response){
  //     console.log(response);
  //   }
  //   common.doWechatPay("prepayId", successCallback);
  // },

  payOrderByWechat: function(e) {
    var order_id = e.currentTarget.dataset.orderid
    var order_sn = e.currentTarget.dataset.ordersn
    if (!order_sn) {
      Taro.showToast({
        title: '订单异常!',
        duration: 2000
      })
      return false
    }

    Taro.request({
      url: app.d.ceshiUrl + '/Api/Wxpay/wxpay',
      data: {
        order_id: order_id,
        order_sn: order_sn,
        uid: app.d.userId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function(res) {
        if (res.data.status == 1) {
          var order = res.data.arr
          Taro.requestPayment({
            timeStamp: order.timeStamp,
            nonceStr: order.nonceStr,
            package: order.package,
            signType: 'MD5',
            paySign: order.paySign,
            success: function(res) {
              Taro.showToast({
                title: '支付成功!',
                duration: 2000
              })
              setTimeout(function() {
                Taro.navigateTo({
                  url: '../user/dingdan?currentTab=1&otype=deliver'
                })
              }, 3000)
            },
            fail: function(res) {
              Taro.showToast({
                title: res,
                duration: 3000
              })
            }
          })
        } else {
          Taro.showToast({
            title: res.data.err,
            duration: 2000
          })
        }
      },
      fail: function(e) {
        // fail
        Taro.showToast({
          title: '网络异常！',
          duration: 2000
        })
      }
    })
  }

  /**
   * 调用服务器微信统一下单接口创建一笔微信预订单
   */
  //   prePayWechatOrder: function(orderId){
  //     var uri = "/ztb/userZBT/GetWxOrder";
  //     var method = "post";
  //     var dataMap = {
  //       SessionId: app.globalData.userInfo.sessionId,
  //       OrderNo: orderId
  //     }
  //     console.log(dataMap);
  //     var successCallback = function (response) {
  //       console.log(response);
  //     };
  //     common.sentHttpRequestToServer(uri, dataMap, method, successCallback);
  //   }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '我的订单'
  }

  render() {
    const {
      hasUserInfo,
      canIUse,
      userInfo,
      point,
      signstatus,
      status
    } = this.data
    return (
      <Block>
        <View className="container mine">
          <View className="userinfo w100">
            {!hasUserInfo && canIUse ? (
              <Button openType="getUserInfo" onGetuserinfo={this.getUserInfo}>
                获取头像昵称
              </Button>
            ) : (
              <Block>
                <Image
                  onClick={this.bindViewTap}
                  className="userinfo-avatar"
                  src={userInfo.avatarUrl}
                  backgroundSize="cover"
                ></Image>
                <Text className="userinfo-nickname">{userInfo.nickName}</Text>
              </Block>
            )}
          </View>
          {/*  <view class="">
                                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                                                <button bindtap="gotoMe">绑定花旗账号</button>
                                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                                              </view>  */}
          <View className="w100 jifen w100">
            <View className="action-wrapper">
              <View className="tc">{'益旗分积分：' + point}</View>
              <Button
                className={'bind ' + (signstatus ? 'has' : '')}
                onClick={this.bindSign}
              >
                {signstatus ? '已签到' : '签到领积分'}
              </Button>
            </View>
            <View className="action-wrapper">
              <View className="tc">
                {'金融机构积分：' + (status ? 1212 : '未绑定')}
              </View>
              <Button className="bind" onClick={this.bindAccount}>
                {status ? '解除绑定' : '立刻绑定'}
              </Button>
            </View>
          </View>
          <View className="order w100">
            <Navigator
              className="order-header w100"
              url="../mine/dingdan?currentTab=0"
              hoverClass="none"
            >
              <View className="left">我的订单</View>
              <View className="right">查看全部订单</View>
            </Navigator>
            <View className="order-type">
              <Navigator
                className="order-type-item"
                url="../mine/dingdan?currentTab=0&otype=pay"
                hoverClass="none"
              >
                <Image src={require('../../images/mine/fukuan.png')}></Image>
                <Text>待付款</Text>
              </Navigator>
              <Navigator
                className="order-type-item"
                url="../mine/dingdan?currentTab=1&otype=pay"
                hoverClass="none"
              >
                <Image src={require('../../images/mine/fahuo.png')}></Image>
                <Text>待发货</Text>
              </Navigator>
              <Navigator
                className="order-type-item"
                url="../mine/dingdan?currentTab=2&otype=pay"
                hoverClass="none"
              >
                <Image src={require('../../images/mine/yifahuo.png')}></Image>
                <Text>已发货</Text>
              </Navigator>
              <Navigator
                className="order-type-item"
                url="../mine/dingdan?currentTab=3&otype=pay"
                hoverClass="none"
              >
                <Image src={require('../../images/mine/ok.png')}></Image>
                <Text>已完成</Text>
              </Navigator>
            </View>
          </View>
          <View className="mt10 w100 address">
            <Navigator
              url="../address/user-address/user-address"
              className="w100"
            >
              <Span className="font_14 c3">地址管理</Span>
              <Span className="fl_r c9 font_12 l_h20" hoverClass="none">
                >
              </Span>
            </Navigator>
          </View>
        </View>
        {/*  </viw>  */}
      </Block>
    )
  }
}

export default _C
