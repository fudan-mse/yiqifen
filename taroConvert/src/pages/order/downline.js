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
import './downline.scss'
var app = Taro.getApp()
// pages/order/downline.js

@withWeapp({
  data: {
    orderId: 0,
    payBankName: '支付宝',
    payAccountName: '',
    payMethod: '银行转帐',
    payNo: '',
    payRemark: '',
    payBankNameList: [
      '支付宝',
      '中国农业银行',
      '中国建设银行',
      '中国银行',
      '中国工商银行',
      '兴业银行'
    ],
    payMethodList: ['银行转帐', '支付宝']
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.orderId
    })
  },
  submitPayInfo: function() {
    var that = this
    if (!this.data.payNo) {
      Taro.showToast({
        title: '请输入支付流水号',
        icon: 'success',
        duration: 2000
      })
      return
    }
    if (!this.data.payAccountName) {
      Taro.showToast({
        title: '请输入支付人',
        icon: 'success',
        duration: 2000
      })
      return
    }
    //post data

    Taro.request({
      url: app.d.hostUrl + '/ztb/orderZBT/AddpaymentInfo',
      method: 'post',
      data: {
        orderId: that.data.orderId,
        payBankName: that.data.payBankName,
        payAccountName: that.data.payAccountName,
        payMethod: that.data.payMethod,
        payNo: that.data.payNo,
        payRemark: that.data.payRemark
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        //--init data
        var data = res.data
        console.log(data)
        //创建订单成功
        Taro.showToast({
          title: data.message,
          icon: 'success',
          duration: 2000
        })
        if (data.result == 'ok') {
          Taro.navigateTo({
            url: '/pages/user/dingdan?currentTab=2'
          })
        } //endok
        //endInitData
      }
    })
  },
  bindPickerPayBankNameChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      payBankName: this.data.payBankNameList[parseInt(e.detail.value)]
    })
  },
  bindPickerPayMethodChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      payMethod: this.data.payMethodList[parseInt(e.detail.value)]
    })
  },
  bindKeyInputPayNo: function(e) {
    this.setData({
      payNo: e.detail.value
    })
  },
  bindKeyInputPayUser: function(e) {
    this.setData({
      payAccountName: e.detail.value
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '线下支付'
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
