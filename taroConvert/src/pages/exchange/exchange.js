import { Block, View, Button, Image, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './exchange.scss'
//index.js
//获取应用实例
const app = Taro.getApp()

@withWeapp({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: Taro.canIUse('button.open-type.getUserInfo'),
    yqfdata: '',
    hqdata: ''
  },
  //事件处理函数
  bindViewTap: function() {
    Taro.navigateTo({
      url: '../logs/logs'
    })
  },
  gotoMe: function() {
    Taro.navigateToMiniProgram({
      appId: 'wx8c777d630f2b78e3',
      path: '',
      extraData: {
        openId: 'xxxx',
        unionId: 'yyyy',
        action: 'bind-citi'
      },
      envVersion: 'trial',
      success(res) {
        console.log('跳转成功')
      },
      fail(error) {
        console.error(arguments)
      }
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      Taro.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindAccount: function() {
    if (this.data.status) {
      this.setData({
        status: false
      })
    } else {
      Taro.navigateTo({
        url: '/pages/bind/bind' // 页面 A
      })
    }
  },
  countHq: function(e) {
    this.setData({
      hqdata: parseInt(e.detail.value / 10)
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '积分通兑'
  }

  render() {
    const { hasUserInfo, canIUse, userInfo, yqfdata, hqdata } = this.data
    return (
      <View className="container exchange">
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
        <View className="w100 jifen w100">
          <View className="w100 yiqifen-wrapper">益旗分积分：1234</View>
          <View className="account-wrapper">
            <View className="account-item">金融机构积分账户信息：</View>
            <View className="account-item">账号：92827278282 939393</View>
            <View className="account-item">积分：1212</View>
          </View>
          <View className="exchange-action">
            <Text className="title">积分兑换</Text>
            <View className="item">
              使用
              <Input
                type="number"
                onInput={this.countHq}
                placeholder="输入10的整数倍"
                value={yqfdata}
              ></Input>
              益旗分积分
            </View>
            <View className="item">
              兑换<Input type="number" disabled="true" value={hqdata}></Input>
              金融机构积分
            </View>
            <Button className="change-btn">立即兑换</Button>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
