import { Block, View, Navigator, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './plist.scss'
var app = Taro.getApp()

@withWeapp({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    productData: [
      {
        id: '288',
        intro: '小米无线鼠标',
        name: '小米无线鼠标',
        photo_x:
          'https://shop.xnnut.com/Data/UploadFiles/product/20170630/1498823998129871.jpg',
        price: '6400',
        price_yh: '64',
        shiyong: '22'
      },
      {
        id: '286',
        intro: '64G 超薄迷你智能指纹解锁拍照学生手机',
        name: 'Xiaomi/小米 小米手机5S ',
        photo_x:
          'https://shop.xnnut.com/Data/UploadFiles/product/20170630/1498823755863174.jpg',
        price: '199900',
        price_yh: '1999',
        shiyong: '0'
      },
      {
        id: '284',
        intro: '4g松果芯片超薄迷你智能拍照学生手机',
        name: 'Xiaomi/小米 小米手机5c ',
        photo_x:
          'https://shop.xnnut.com/Data/UploadFiles/product/20170630/1498823358368715.jpg',
        price: '129900',
        price_yh: '1299',
        shiyong: '7'
      },
      {
        id: '281',
        intro: '超长待机超薄迷你学生机智能机老人机',
        name: 'Xiaomi/小米 红米手机4A ',
        photo_x:
          'https://shop.xnnut.com/Data/UploadFiles/product/20170630/1498820794749927.jpg',
        price: '69900',
        price_yh: '599',
        shiyong: '2'
      }
    ],
    proCat: [],
    page: 2,
    index: 2,
    brand: [],
    // 滑动
    imgUrl: [],
    kbs: [],
    lastcat: [],
    course: [],
    canIUse: Taro.canIUse('button.open-type.getUserInfo')
  },
  //跳转商品列表页
  listdetail: function(e) {
    console.log(e.currentTarget.dataset.title)
    Taro.navigateTo({
      url: '../listdetail/listdetail?title=' + e.currentTarget.dataset.title,
      success: function(res) {
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  //品牌街跳转商家详情页
  jj: function(e) {
    var id = e.currentTarget.dataset.id
    Taro.navigateTo({
      url: '../listdetail/listdetail?brandId=' + id,
      success: function(res) {
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  //点击加载更多
  getMore: function(e) {
    var that = this
    var page = that.data.page
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Index/getlist',
      method: 'post',
      data: { page: page },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var prolist = res.data.prolist
        if (prolist == '') {
          Taro.showToast({
            title: '没有更多数据！',
            duration: 2000
          })
          return false
        }
        //that.initProductData(data);
        that.setData({
          page: page + 1,
          productData: that.data.productData.concat(prolist)
        })
        //endInitData
      },
      fail: function(e) {
        Taro.showToast({
          title: '网络异常！',
          duration: 2000
        })
      }
    })
  },

  onLoad: function(options) {},
  onShareAppMessage: function() {
    return {
      title: app.d.appTitle,
      path: '/pages/index/index',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
    app.getUserInfo()
    /*if (e.detail.userInfo) {
      //用户按了允许授权按钮
    } else {
      //用户按了拒绝按钮
    }*/
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '礼品兑换'
  }

  render() {
    const { productData } = this.data
    return (
      <View className="page">
        <View className="cont">
          {productData.map((item, index) => {
            return (
              <Navigator
                className="pr"
                url={'../pdetail/pdetail?productId=' + item.id}
                hoverClass="changestyle"
                key="productData"
              >
                <Image className="photo" src={item.photo_x}></Image>
                <View className="title">{item.name}</View>
                <View style="display:flex; flex-direction: column;line-height:50rpx;padding:10rpx 0;">
                  <View className="gmxx" style="color: red;">
                    {item.price_yh + '积分'}
                  </View>
                  <View style="padding-left:20rpx" className="gmx">
                    {item.price}
                  </View>
                </View>
                <View style="display:flex;line-height:50rpx;color:#999">
                  <View className="gmxx" style="font-size:28rpx;width:30%">
                    <Text>新品</Text>
                    <Text>热销</Text>
                    <Text>推荐</Text>
                  </View>
                  <View className="ku" style="width:60%">
                    {'销量：' + item.shiyong}
                  </View>
                </View>
              </Navigator>
            )
          })}
        </View>
        {/*  <view class="clear mt10" bindtap="getMore">点击查看更多</view>  */}
        {/* <button wx:if="{{canIUse}}" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">授权登录</button> */}
      </View>
    )
  }
}

export default _C
