import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './list.scss'
//logs.js
const util = require('../../utils/util.js')

@withWeapp({
  data: {
    logs: []
  },
  onLoad: function() {
    this.setData({
      logs: (Taro.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '入驻商家'
  }

  render() {
    return (
      <View className="container log-list">
        <View className="store-list">
          <View className="store-item">
            <View className="img-wrapper">
              <Image
                src="http://p1.meituan.net/searchscenerec/e4d164c692c016638c37097f8e4c967b197858.png%40340w_255h_1e_1c_1l%7Cwatermark%3D0"
                alt
              ></Image>
            </View>
            <View className="info">
              <Text className="name">天天物品收购</Text>
              <Text className="phone">电话：16712341655</Text>
              <Text className="address">地址：双山路35号</Text>
            </View>
          </View>
          <View className="store-item">
            <View className="img-wrapper">
              <Image
                src="https://p0.meituan.net/merchantpic/5229103df254dd06a6055cbef7fd8cdc755185.jpg%40340w_255h_1e_1c_1l%7Cwatermark%3D0"
                alt
              ></Image>
            </View>
            <View className="info">
              <Text className="name">爱回收(莲花国际广场店)</Text>
              <Text className="phone">电话：032-22232323</Text>
              <Text className="address">地址：双山路35号</Text>
            </View>
          </View>
          <View className="store-item">
            <View className="img-wrapper">
              <Image
                src="http://p1.meituan.net/searchscenerec/e4d164c692c016638c37097f8e4c967b197858.png%40340w_255h_1e_1c_1l%7Cwatermark%3D0"
                alt
              ></Image>
            </View>
            <View className="info">
              <Text className="name">用真奢侈品鉴定回收中心</Text>
              <Text className="phone">电话：012-12121212</Text>
              <Text className="address">地址：双山路35号</Text>
            </View>
          </View>
          <View className="store-item">
            <View className="img-wrapper">
              <Image
                src="http://qcloud.dpfile.com/pc/SehQpUCQQLm2zUGdGJdeGIoRQi1k3l4yWUXbMeXt6Q37IVnGZWkZOnV-QKNjInIabKcq9vnEaGy3xLEf-_v_oA.jpg"
                alt
              ></Image>
            </View>
            <View className="info">
              <Text className="name">用真奢侈品回收中心(上海店)</Text>
              <Text className="phone">电话：010-111333434</Text>
              <Text className="address">地址：双山路35号</Text>
            </View>
          </View>
          <View className="store-item">
            <View className="img-wrapper">
              <Image
                src="http://p1.meituan.net/searchscenerec/e4d164c692c016638c37097f8e4c967b197858.png%40340w_255h_1e_1c_1l%7Cwatermark%3D0"
                alt
              ></Image>
            </View>
            <View className="info">
              <Text className="name">入驻商家1</Text>
              <Text className="phone">电话：136123889933</Text>
              <Text className="address">地址：双山路35号</Text>
            </View>
          </View>
          <View className="store-item">
            <View className="img-wrapper">
              <Image
                src="http://p1.meituan.net/searchscenerec/e4d164c692c016638c37097f8e4c967b197858.png%40340w_255h_1e_1c_1l%7Cwatermark%3D0"
                alt
              ></Image>
            </View>
            <View className="info">
              <Text className="name">入驻商家1</Text>
              <Text className="phone">电话：15214562622</Text>
              <Text className="address">地址：双山路35号</Text>
            </View>
          </View>
          <View className="store-item">
            <View className="img-wrapper">
              <Image
                src="http://qcloud.dpfile.com/pc/RkkkCDjT7Hv1eiphazHCyT-YSIpX0n1i98wAS74NAuNpD6PO3wpOWvNZxuNpyTcZbKcq9vnEaGy3xLEf-_v_oA.jpg"
                alt
              ></Image>
            </View>
            <View className="info">
              <Text className="name">入驻商家1</Text>
              <Text className="phone">电话：13212341234</Text>
              <Text className="address">地址：双山路35号</Text>
            </View>
          </View>
          <View className="store-item">
            <View className="img-wrapper">
              <Image
                src="http://qcloud.dpfile.com/pc/WK3bOKydEE2cHfNUDHwp16r87mT00Z5NeScKzXeuOj25ckncn2uz6BnwebDl3v1mbKcq9vnEaGy3xLEf-_v_oA.jpg"
                alt
              ></Image>
            </View>
            <View className="info">
              <Text className="name">入驻商家1</Text>
              <Text className="phone">电话：0112-111221111</Text>
              <Text className="address">地址：双山路35号</Text>
            </View>
          </View>
          <View className="store-item">
            <View className="img-wrapper">
              <Image
                src="http://qcloud.dpfile.com/pc/WK3bOKydEE2cHfNUDHwp16r87mT00Z5NeScKzXeuOj25ckncn2uz6BnwebDl3v1mbKcq9vnEaGy3xLEf-_v_oA.jpg"
                alt
              ></Image>
            </View>
            <View className="info">
              <Text className="name">入驻商家1</Text>
              <Text className="phone">电话：021-29331212</Text>
              <Text className="address">地址：双山路35号</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
