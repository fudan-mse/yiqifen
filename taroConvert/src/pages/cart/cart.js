import {
  Block,
  View,
  Image,
  Navigator,
  Button,
  Icon,
  Text,
  Input
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './cart.scss'
var app = Taro.getApp()
// pages/cart/cart.js

@withWeapp({
  data: {
    page: 1,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    total: 0,
    carts: []
  },

  bindMinus: function(e) {
    var that = this
    var index = parseInt(e.currentTarget.dataset.index)
    var num = that.data.carts[index].num
    // 如果只有1件了，就不允许再减了
    if (num > 1) {
      num--
    }
    console.log(num)
    var cart_id = e.currentTarget.dataset.cartid
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Shopping/up_cart',
      method: 'post',
      data: {
        user_id: app.d.userId,
        num: num,
        cart_id: cart_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var status = res.data.status
        if (status == 1) {
          // 只有大于一件的时候，才能normal状态，否则disable状态
          var minusStatus = num <= 1 ? 'disabled' : 'normal'
          // 购物车数据
          var carts = that.data.carts
          carts[index].num = num
          // 按钮可用状态
          var minusStatuses = that.data.minusStatuses
          minusStatuses[index] = minusStatus
          // 将数值与状态写回
          that.setData({
            minusStatuses: minusStatuses
          })
          that.sum()
        } else {
          Taro.showToast({
            title: '操作失败！',
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

  bindPlus: function(e) {
    var that = this
    var index = parseInt(e.currentTarget.dataset.index)
    var num = that.data.carts[index].num
    // 自增
    num++
    console.log(num)
    var cart_id = e.currentTarget.dataset.cartid
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Shopping/up_cart',
      method: 'post',
      data: {
        user_id: app.d.userId,
        num: num,
        cart_id: cart_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var status = res.data.status
        if (status == 1) {
          // 只有大于一件的时候，才能normal状态，否则disable状态
          var minusStatus = num <= 1 ? 'disabled' : 'normal'
          // 购物车数据
          var carts = that.data.carts
          carts[index].num = num
          // 按钮可用状态
          var minusStatuses = that.data.minusStatuses
          minusStatuses[index] = minusStatus
          // 将数值与状态写回
          that.setData({
            minusStatuses: minusStatuses
          })
          that.sum()
        } else {
          Taro.showToast({
            title: '操作失败！',
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

  bindCheckbox: function(e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/
    //拿到下标值，以在carts作遍历指示用
    var index = parseInt(e.currentTarget.dataset.index)
    //原始的icon状态
    var selected = this.data.carts[index].selected
    var carts = this.data.carts
    // 对勾选状态取反
    carts[index].selected = !selected
    // 写回经点击修改后的数组
    this.setData({
      carts: carts
    })
    this.sum()
  },

  bindSelectAll: function() {
    // 环境中目前已选状态
    var selectedAllStatus = this.data.selectedAllStatus
    // 取反操作
    selectedAllStatus = !selectedAllStatus
    // 购物车数据，关键是处理selected值
    var carts = this.data.carts
    // 遍历
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectedAllStatus
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carts: carts
    })
    this.sum()
  },

  bindCheckout: function() {
    // 初始化toastStr字符串
    var toastStr = ''
    // 遍历取出已勾选的cid
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].selected) {
        toastStr += this.data.carts[i].id
        toastStr += ','
      }
    }
    if (toastStr == '') {
      Taro.showToast({
        title: '请选择要结算的商品！',
        duration: 2000
      })
      return false
    }
    //存回data
    Taro.navigateTo({
      url: '../order/pay?cartId=' + toastStr
    })
  },

  bindToastChange: function() {
    this.setData({
      toastHidden: true
    })
  },

  sum: function() {
    var carts = this.data.carts
    // 计算总金额
    var total = 0
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += carts[i].num * carts[i].price
      }
    }
    // 写回经点击修改后的数组
    this.setData({
      carts: carts,
      total: '¥ ' + total
    })
  },

  onLoad: function(options) {
    this.loadProductData()
    this.sum()
  },

  onShow: function() {
    this.loadProductData()
  },

  removeShopCard: function(e) {
    var that = this
    var cardId = e.currentTarget.dataset.cartid
    Taro.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function(res) {
        res.confirm &&
          Taro.request({
            url: app.d.ceshiUrl + '/Api/Shopping/delete',
            method: 'post',
            data: {
              cart_id: cardId
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              //--init data
              var data = res.data
              if (data.status == 1) {
                //that.data.productData.length =0;
                that.loadProductData()
              } else {
                Taro.showToast({
                  title: '操作失败！',
                  duration: 2000
                })
              }
            }
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

  // 数据案例
  loadProductData: function() {
    var that = this
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Shopping/index',
      method: 'post',
      data: {
        user_id: app.d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //--init data
        var cart = res.data.cart
        that.setData({
          carts: cart
        })
        //endInitData
      }
    })
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '购物车'
  }

  render() {
    const {
      productData,
      carts,
      minusStatuses,
      selectedAllStatus,
      total
    } = this.data
    return (
      <View className="page">
        {productData.map((item, index) => {
          return (
            <View className="shop df" key="productData">
              <Image className="sh_slt" src={item.ImgUrl}></Image>
              <View className="df_1">
                <View className="sp_text">
                  <Navigator url={'../index/detail?productId=' + item.ProID}>
                    <View className="sp_tit ovh1">{item.ProductName}</View>
                  </Navigator>
                  <View className="sp_neb">{'数量：×' + item.BuyCount}</View>
                  <View className="sp_jg">{'¥：' + item.Price}</View>
                  <Button
                    className="dle"
                    data-card-id={item.CartID}
                    onClick={this.removeShopCard}
                  >
                    删除
                  </Button>
                  <Navigator
                    className="dle"
                    url={
                      '../order/pay?productId=' +
                      item.ProID +
                      '&cartId=' +
                      item.CartID +
                      '&buyCount=' +
                      item.BuyCount
                    }
                  >
                    下单
                  </Navigator>
                </View>
              </View>
            </View>
          )
        })}
        {/* 样式 */}
        {carts == '' && (
          <View className="container carts-list">
            <View className="pp">
              <Image
                className="kong"
                src={require('../../images/cart.jpg')}
                mode="aspectFill"
              ></Image>
              <View className="cla">购物车空空如也</View>
            </View>
          </View>
        )}
        <View className="container carts-list">
          {carts.map((item, index) => {
            return (
              <View
                className="carts-item"
                data-title={item.pro_name}
                id={item.id}
                key="carts"
              >
                {item.selected ? (
                  <Icon
                    type="success_circle"
                    size="20"
                    onClick={this.bindCheckbox}
                    data-index={index}
                  ></Icon>
                ) : (
                  <Icon
                    type="circle"
                    size="20"
                    onClick={this.bindCheckbox}
                    data-index={index}
                  ></Icon>
                )}
                {/* img */}
                <View>
                  <Image
                    className="carts-image"
                    src={item.photo_x}
                    mode="aspectFill"
                  ></Image>
                </View>
                {/* 文字 */}
                <View className="carts-text">
                  <Text className="carts-title">{item.pro_name}</Text>
                  <View className="carts-subtitle">
                    <Text className="carts-price">{'¥ ' + item.price}</Text>
                  </View>
                </View>
                {/* 右边 */}
                <View className="title">
                  <Text
                    onClick={this.removeShopCard}
                    data-cartid={item.id}
                    className="modal-close"
                  >
                    x
                  </Text>
                  <View className="stepper">
                    <Text
                      className={minusStatuses[index]}
                      data-index={index}
                      onClick={this.bindMinus}
                      data-cartid={item.id}
                    >
                      -
                    </Text>
                    {/*  数值  */}
                    <Input
                      type="number"
                      onChange={this.bindManual}
                      value={item.num}
                    ></Input>
                    {/*  加号  */}
                    <Text
                      className="normal"
                      data-index={index}
                      onClick={this.bindPlus}
                      data-cartid={item.id}
                    >
                      +
                    </Text>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
        {/* 底部 */}
        <View className="carts-footer">
          <View onClick={this.bindSelectAll}>
            {selectedAllStatus ? (
              <Icon type="success_circle" size="24"></Icon>
            ) : (
              <Icon type="circle" size="24"></Icon>
            )}
            <Text>全选</Text>
            <Text className="reds">{total}</Text>
          </View>
          <View className="button" onClick={this.bindCheckout}>
            立即结算
          </View>
        </View>
      </View>
    )
  }
}

export default _C
