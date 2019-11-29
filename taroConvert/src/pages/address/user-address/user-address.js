import {
  Block,
  RadioGroup,
  View,
  Radio,
  Text,
  Icon,
  Navigator,
  Image
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './user-address.scss'
// pages/address/user-address/user-address.js
var app = Taro.getApp()

@withWeapp({
  data: {
    address: [],
    radioindex: '',
    pro_id: 0,
    num: 0,
    cartId: 0
  },
  onLoad: function(options) {
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    var cartId = options.cartId
    console.log(app.d.userId)
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Address/index',
      data: {
        user_id: app.d.userId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        // 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function(res) {
        // success
        var address = res.data.adds
        console.log(address)
        if (address == '') {
          var address = []
        }

        that.setData({
          address: address,
          cartId: cartId
        })
      },
      fail: function() {
        // fail
        Taro.showToast({
          title: '网络异常！',
          duration: 2000
        })
      }
    })
  },

  onReady: function() {
    // 页面渲染完成
  },
  setDefault: function(e) {
    var that = this
    var addrId = e.currentTarget.dataset.id
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Address/set_default',
      data: {
        uid: app.d.userId,
        addr_id: addrId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        // 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function(res) {
        // success
        var status = res.data.status
        var cartId = that.data.cartId
        if (status == 1) {
          if (cartId) {
            Taro.redirectTo({
              url: '../../order/pay?cartId=' + cartId
            })
            return false
          }

          Taro.showToast({
            title: '操作成功！',
            duration: 2000
          })

          that.DataonLoad()
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
  },
  delAddress: function(e) {
    var that = this
    var addrId = e.currentTarget.dataset.id
    Taro.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function(res) {
        res.confirm &&
          Taro.request({
            url: app.d.ceshiUrl + '/Api/Address/del_adds',
            data: {
              user_id: app.d.userId,
              id_arr: addrId
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              // 设置请求的 header
              'Content-Type': 'application/x-www-form-urlencoded'
            },

            success: function(res) {
              // success
              var status = res.data.status
              if (status == 1) {
                that.DataonLoad()
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
  },
  DataonLoad: function() {
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Address/index',
      data: {
        user_id: app.d.userId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        // 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function(res) {
        // success
        var address = res.data.adds
        if (address == '') {
          var address = []
        }
        that.setData({
          address: address
        })
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
    navigationBarTitleText: '地址管理'
  }

  render() {
    const { address, hiddenAddress, cartId } = this.data
    return (
      <Block>
        {address.map((item, index) => {
          return (
            <RadioGroup className="radio-group">
              <View hidden={hiddenAddress} className="address">
                <View
                  className="address-icon"
                  onClick={this.setDefault}
                  data-id={item.id}
                >
                  <Radio
                    checked={item.is_default == 1 ? true : false}
                    value={index}
                  ></Radio>
                </View>
                <View className="address-detail">
                  <View className="address-name-phone">
                    <Text className="address-name">{item.name}</Text>
                    <Text className="address-phone">{item.tel}</Text>
                  </View>
                  <View className="address-info">{item.address_xq}</View>
                  <View className="address-edit">
                    <View>
                      <Icon></Icon>
                      <Text hidden={item.is_default == 0 ? false : true}></Text>
                    </View>
                    <View>
                      <Text
                        hidden={item.is_default == 0 ? false : true}
                        onClick={this.setDefault}
                        data-id={item.id}
                      >
                        设置默认
                      </Text>
                      <Text hidden={item.is_default == 0 ? false : true}>
                        |
                      </Text>
                      <Text data-id={item.id} onClick={this.delAddress}>
                        删除
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </RadioGroup>
          )
        })}
        <Navigator url={'../address?cartId=' + cartId}>
          <View hidden={hiddenAddress} className="add-address">
            <Image className="add-address-icon" src="#"></Image>
            <View>新增地址</View>
          </View>
        </Navigator>
      </Block>
    )
  }
}

export default _C
