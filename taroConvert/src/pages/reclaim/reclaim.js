import {
  Block,
  View,
  Swiper,
  SwiperItem,
  Image,
  Navigator,
  Text
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './reclaim.scss'

@withWeapp({
  data: {
    imgUrls: ['../../images/reclaim/cloth.jpg', '../../images/reclaim/pad.jpg'],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  alertValid: function() {
    Taro.showToast({
      title: '等待商家入驻',
      icon: 'none',
      duration: 2000,
      success: function() {
        setTimeout(function() {
          Taro.hideToast()
        }, 1000)
      }
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
    navigationBarTitleText: '回收'
  }

  render() {
    const { indicatorDots, autoplay, interval, duration, imgUrls } = this.data
    return (
      <View className="container reclaim">
        <Swiper
          className="swiper-wapper"
          indicatorDots={indicatorDots}
          autoplay={autoplay}
          interval={interval}
          indicatorActiveColor="#fff"
          duration={duration}
        >
          {imgUrls.map((item, index) => {
            return (
              <Block>
                <SwiperItem>
                  <Image src={item} className="slide-image"></Image>
                </SwiperItem>
              </Block>
            )
          })}
        </Swiper>
        <View className="category">
          <View className="phone type">
            <Navigator
              className="type"
              url="/pages/join/list"
              hoverClass="navigator-hover"
            >
              <Image
                src={require('../../images/reclaim/i-phone.png')}
                alt
              ></Image>
              <Text
                className="type-text"
                selectable="false"
                space="false"
                decode="false"
              >
                电子回收
              </Text>
            </Navigator>
          </View>
          <View className="cloth type">
            <Navigator
              className="type"
              url="/pages/join/list"
              hoverClass="navigator-hover"
            >
              <Image
                src={require('../../images/reclaim/i-cloth.png')}
                alt
              ></Image>
              <Text
                className="type-text"
                selectable="false"
                space="false"
                decode="false"
              >
                旧衣回收
              </Text>
            </Navigator>
          </View>
        </View>
        <View className="category">
          <View className="phone type">
            <Image
              src={require('../../images/reclaim/i-exchange.png')}
              alt
            ></Image>
            <Text
              className="type-text"
              selectable="false"
              space="false"
              decode="false"
            >
              易物平台
            </Text>
          </View>
        </View>
      </View>
    )
  }
} //logs.js

export default _C
