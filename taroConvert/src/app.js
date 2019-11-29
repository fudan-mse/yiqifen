import { Block } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './app.scss'

@withWeapp({
  d: {
    hostUrl: 'https://shop.xnnut.com/index.php',
    //hostImg: 'http://img.ynjmzb.net',
    //hostVideo: 'http://zhubaotong-file.oss-cn-beijing.aliyuncs.com',
    userId: 1,
    appId: '',
    point: 996,
    appKey: '',

    ceshiUrl: 'https://shop.xnnut.com/index.php',
    appTitle: 'w',
    yiqifen: 'https://yiqifen.pa-ca.me',
    uniheart: 'https://uniheart.pa-ca.me'
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = Taro.getStorageSync('logs') || []
    logs.unshift(Date.now())
    Taro.setStorageSync('logs', logs)

    // 登录
    Taro.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    Taro.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          Taro.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
class App extends Taro.Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/logs/logs',
      'pages/mine/mine',
      'pages/mine/dingdan',
      'pages/reclaim/reclaim',
      'pages/store/store',
      'pages/plist/plist',
      'pages/pdetail/pdetail',
      'pages/search/search',
      'pages/bind/bind',
      'pages/exchange/exchange',
      'pages/cart/cart',
      'pages/address/address',
      'pages/address/user-address/user-address',
      'pages/order/pay',
      'pages/order/detail',
      'pages/order/downline',
      'pages/greenroad/green',
      'pages/join/list'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#123a72',
      navigationBarTitleText: '益旗分',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#333',
      selectedColor: '#be2728',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'images/bottom/category.png',
          selectedIconPath: 'images/bottom/category-cur.png',
          text: '分类'
        },
        {
          pagePath: 'pages/store/store',
          iconPath: 'images/bottom/store.png',
          selectedIconPath: 'images/bottom/store-cur.png',
          text: '积分'
        },
        {
          pagePath: 'pages/reclaim/reclaim',
          iconPath: 'images/bottom/circle.png',
          selectedIconPath: 'images/bottom/circle-cur.png',
          text: '回收'
        },
        {
          pagePath: 'pages/mine/mine',
          iconPath: 'images/bottom/mine.png',
          selectedIconPath: 'images/bottom/mine-cur.png',
          text: '我的'
        }
      ]
    },
    sitemapLocation: 'sitemap.json',
    debug: true,
    navigateToMiniProgramAppIdList: ['wx8c777d630f2b78e3']
  }

  render() {
    return null
  }
} //app.js

export default App
Taro.render(<App />, document.getElementById('app'))
