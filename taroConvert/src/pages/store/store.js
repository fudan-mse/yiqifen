import { Block, View, Navigator, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './store.scss'
//index.js
//获取应用实例
const app = Taro.getApp()

@withWeapp({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: Taro.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    Taro.navigateTo({
      url: '../logs/logs'
    })
  },
  bindExchange: function() {
    Taro.navigateTo({
      url: '/pages/exchange/exchange' // 页面 A
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  alertValid2: function() {
    Taro.showToast({
      title: '暂未开放',
      icon: 'none',
      duration: 2000,
      success: function() {
        setTimeout(function() {
          Taro.hideToast()
        }, 1000)
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '积分'
  }

  render() {
    return (
      <View className="container store-list">
        <View className="first-line row">
          <View className="left text-center">
            <Navigator url="/pages/plist/plist" hoverClass="navigator-hover">
              <Text>礼品兑换</Text>
            </Navigator>
          </View>
          <View className="right text-center">
            <Navigator
              url="/pages/greenroad/green"
              hoverClass="navigator-hover"
            >
              <Text>绿色通道</Text>
            </Navigator>
          </View>
        </View>
        <View className="second-line row">
          <View onClick={this.alertValid2} className="left text-center">
            <Text>积分商城</Text>
            {/*  </navigator>  */}
          </View>
          <View className="right text-center">
            <Navigator
              url="/pages/exchange/exchange"
              hoverClass="navigator-hover"
            >
              <Text>积分兑换</Text>
            </Navigator>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
