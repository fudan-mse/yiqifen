import { Block, View, Button, Image, Text, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './mine.scss'
//index.js
//获取应用实例
const app = Taro.getApp()

function login() {
  Taro.login({
    success(res) {
      if (res.code) {
        //发起网络请求
        Taro.request({
          url:
            app.d.uniheart +
            '/passport/weapp-yiqifen/callback?code=' +
            res.code,
          success(res) {
            console.log('openid 结果：', res)
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}

@withWeapp({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: Taro.canIUse('button.open-type.getUserInfo'),
    status: true,
    signstatus: false,
    point: app.d.point
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
  onShow: function() {
    this.setData({
      point: app.d.point
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log('res = ', res)
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
    app.globalData.userInfo = e.detail.userInfo

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    login()
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
  bindSign: function() {
    if (!this.data.signstatus) {
      app.d.point = app.d.point + 1
      var score = this.data.point
      this.setData({
        signstatus: true,
        point: score + 1
      })
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '我的'
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
