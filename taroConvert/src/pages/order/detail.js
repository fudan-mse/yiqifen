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
import './detail.scss'
var app = Taro.getApp()
// pages/order/detail.js

@withWeapp({
  data: {
    orderId: 0,
    orderData: {},
    proData: []
  },
  onLoad: function(options) {
    this.setData({
      orderId: options.orderId
    })
    this.loadProductDetail()
  },
  loadProductDetail: function() {
    var that = this
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Order/order_details',
      method: 'post',
      data: {
        order_id: that.data.orderId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var status = res.data.status
        if (status == 1) {
          var pro = res.data.pro
          var ord = res.data.ord
          that.setData({
            orderData: ord,
            proData: pro
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
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '订单详情'
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
