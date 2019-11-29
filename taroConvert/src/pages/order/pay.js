import {
  Block,
  View,
  Image,
  Text,
  Navigator,
  Textarea,
  RadioGroup,
  Label,
  Radio,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './pay.scss'
var app = Taro.getApp()
// pages/order/downline.js

@withWeapp({
  data: {
    itemData: {},
    userId: 0,
    paytype: 'weixin', //0线下1微信
    remark: '',
    cartId: 0,
    addrId: 0, //收货地址//测试--
    btnDisabled: false,
    productData: [],
    address: {},
    total: 0,
    vprice: 0,
    vid: 0,
    addemt: 1,
    vou: []
  },
  onLoad: function(options) {
    var uid = app.d.userId
    this.setData({
      cartId: options.cartId,
      userId: uid
    })
    this.loadProductDetail()
  },
  loadProductDetail: function() {
    var that = this
    console.log(that.data.cartId)
    console.log(that.data.userId)
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Payment/buy_cart',
      method: 'post',
      data: {
        cart_id: that.data.cartId,
        uid: that.data.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //that.initProductData(res.data);
        var adds = res.data.adds
        console.log(res.data)
        if (adds) {
          var addrId = adds.id
          that.setData({
            address: adds,
            addrId: addrId
          })
        }
        that.setData({
          addemt: res.data.addemt,
          productData: res.data.pro,
          total: res.data.price,
          vprice: res.data.price,
          vou: res.data.vou
        })
        //endInitData
      }
    })
  },

  remarkInput: function(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  //选择优惠券
  getvou: function(e) {
    var vid = e.currentTarget.dataset.id
    var price = e.currentTarget.dataset.price
    var zprice = this.data.vprice
    var cprice = parseFloat(zprice) - parseFloat(price)
    this.setData({
      total: cprice,
      vid: vid
    })
  },

  //微信支付
  createProductOrderByWX: function(e) {
    this.setData({
      paytype: 'weixin'
    })
    if (this.data.address.id) {
      //console.log("正常购买");
      this.createProductOrder()
    } else {
      Taro.showToast({
        title: '请填写收货地址!',
        duration: 3000
      })
    }
  },

  //线下支付
  createProductOrderByXX: function(e) {
    this.setData({
      paytype: 'cash'
    })
    Taro.showToast({
      title: '线下支付开通中，敬请期待!',
      duration: 3000
    })
    return false
    this.createProductOrder()
  },

  //确认订单
  createProductOrder: function() {
    this.setData({
      btnDisabled: false
    })

    //创建订单
    var that = this
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Payment/payment',
      method: 'post',
      data: {
        uid: that.data.userId,
        cart_id: that.data.cartId,
        type: that.data.paytype,
        aid: that.data.addrId, //地址的id
        remark: that.data.remark, //用户备注
        price: that.data.total, //总价
        vid: that.data.vid //优惠券ID
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //--init data
        var data = res.data
        if (data.status == 1) {
          //创建订单成功
          if (data.arr.pay_type == 'cash') {
            Taro.showToast({
              title: '请自行联系商家进行发货!',
              duration: 3000
            })
            return false
          }
          if (data.arr.pay_type == 'weixin') {
            //微信支付
            that.wxpay(data.arr)
          }
        } else {
          Taro.showToast({
            title: '下单失败!',
            duration: 2500
          })
        }
      },
      fail: function(e) {
        Taro.showToast({
          title: '网络异常！err:createProductOrder',
          duration: 2000
        })
      }
    })
  },

  //调起微信支付
  wxpay: function(order) {
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Wxpay/wxpay',
      data: {
        order_id: order.order_id,
        order_sn: order.order_sn,
        uid: this.data.userId
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
              }, 2500)
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
      fail: function() {
        // fail
        Taro.showToast({
          title: '网络异常！err:wxpay',
          duration: 2000
        })
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '订单确认'
  }

  render() {
    const {
      productData,
      cartId,
      address,
      addemt,
      remark,
      btnDisabled
    } = this.data
    return (
      <View className="w100">
        {productData.map((item, index) => {
          return (
            <View className="p_all bg_white df item" key="productData">
              <View className="cp_photo">
                {item.photo_x && <Image src={item.photo_x}></Image>}
              </View>
              <View className="df_1">
                <View className="font_14 mt5 ovh1">{item.name}</View>
                <Text className="gm_ovh_1h red pt10">
                  {item.price + '积分'}
                </Text>
                <Text className="gm_ovh_1h pt10">{'数量：' + item.num}</Text>
              </View>
            </View>
          )
        })}
        {addemt == 0 ? (
          <View className="p_all bg_white mt10 font_14">
            <Navigator
              url={'../address/user-address/user-address?cartId=' + cartId}
              hoverClass="none"
            >
              <View className="df">
                <View className="df_1 c6">
                  <View className="l_h20">
                    {'收货人：' + address.name}
                    <Text className="fl_r mr10">{address.tel}</Text>
                  </View>
                  <View className="l_h20 mt5">
                    {'地址：' + address.address_xq}
                  </View>
                </View>
                <Image
                  className="x_right mt15"
                  src={require('../../images/x_right.png')}
                ></Image>
              </View>
            </Navigator>
          </View>
        ) : (
          <View className="p_all bg_white mt10 font_14">
            <Navigator
              url={'../address/user-address/user-address?cartId=' + cartId}
              hoverClass="none"
            >
              <View className="df">添加收货地址</View>
            </Navigator>
          </View>
        )}
        <View className="p_all bg_white mt10 font_14">
          <Textarea
            className="min_60"
            autoHeight
            name="remark"
            placeholder="备注"
            onInput={this.remarkInput}
            value={remark}
          ></Textarea>
        </View>
        <View className="zhifu mt10">
          <Span className="title">应共支付：</Span>
          {/* 设置监听器，当点击radio时调用 */}
          <RadioGroup onChange={this.listenerRadioGroup} className="hui">
            <Label style="display: flex" className="xuan">
              <Radio value="1"></Radio>20000益旗分积分
            </Label>
            <Label style="display: flex" className="xuan">
              <Radio value="0"></Radio>1980积分（特惠）
            </Label>
          </RadioGroup>
        </View>
        <View className="p_all mt10">
          <View className="btnGreen">
            <Button
              className="wx_pay_submit"
              id="wxPay"
              disabled={btnDisabled}
              formType="submit"
              onClick={this.createProductOrderByWX}
            >
              确认兑换
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
