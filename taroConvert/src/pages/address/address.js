import {
  Block,
  View,
  Form,
  Input,
  Picker,
  Label,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './address.scss'
//城市选择
var app = Taro.getApp()

@withWeapp({
  data: {
    shengArr: [], //省级数组
    shengId: [], //省级id数组
    shiArr: [], //城市数组
    shiId: [], //城市id数组
    quArr: [], //区数组
    shengIndex: 0,
    shiIndex: 0,
    quIndex: 0,
    mid: 0,
    sheng: 0,
    city: 0,
    area: 0,
    code: 0,
    cartId: 0
  },
  formSubmit: function(e) {
    var adds = e.detail.value
    var cartId = this.data.cartId
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Address/add_adds',
      data: {
        user_id: app.d.userId,
        receiver: adds.name,
        tel: adds.phone,
        sheng: this.data.sheng,
        city: this.data.city,
        quyu: this.data.area,
        adds: adds.address,
        code: this.data.code
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
          Taro.showToast({
            title: '保存成功！',
            duration: 2000
          })
        } else {
          Taro.showToast({
            title: res.data.err,
            duration: 2000
          })
        }
        Taro.redirectTo({
          url: 'user-address/user-address?cartId=' + cartId
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
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    var that = this
    that.setData({
      cartId: options.cartId
    })
    //获取省级城市
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Address/get_province',
      data: {},
      method: 'POST',
      success: function(res) {
        var status = res.data.status
        var province = res.data.list
        var sArr = []
        var sId = []
        sArr.push('请选择')
        sId.push('0')
        for (var i = 0; i < province.length; i++) {
          sArr.push(province[i].name)
          sId.push(province[i].id)
        }
        that.setData({
          shengArr: sArr,
          shengId: sId
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

  bindPickerChangeshengArr: function(e) {
    this.setData({
      shengIndex: e.detail.value,
      shiArr: [],
      shiId: [],
      quArr: [],
      quiId: []
    })
    var that = this
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Address/get_city',
      data: { sheng: e.detail.value },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        // 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        // success
        var status = res.data.status
        var city = res.data.city_list

        var hArr = []
        var hId = []
        hArr.push('请选择')
        hId.push('0')
        for (var i = 0; i < city.length; i++) {
          hArr.push(city[i].name)
          hId.push(city[i].id)
        }
        that.setData({
          sheng: res.data.sheng,
          shiArr: hArr,
          shiId: hId
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
  bindPickerChangeshiArr: function(e) {
    this.setData({
      shiIndex: e.detail.value,
      quArr: [],
      quiId: []
    })
    var that = this
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Address/get_area',
      data: {
        city: e.detail.value,
        sheng: this.data.sheng
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        // 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var status = res.data.status
        var area = res.data.area_list

        var qArr = []
        var qId = []
        qArr.push('请选择')
        qId.push('0')
        for (var i = 0; i < area.length; i++) {
          qArr.push(area[i].name)
          qId.push(area[i].id)
        }
        that.setData({
          city: res.data.city,
          quArr: qArr,
          quiId: qId
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
  bindPickerChangequArr: function(e) {
    console.log(this.data.city)
    this.setData({
      quIndex: e.detail.value
    })
    var that = this
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Address/get_code',
      data: {
        quyu: e.detail.value,
        city: this.data.city
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        // 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        that.setData({
          area: res.data.area,
          code: res.data.code
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
    navigationBarTitleText: '联系地址'
  }

  render() {
    const {
      mid,
      shengIndex,
      shengArr,
      shengId,
      shiIndex,
      shiArr,
      quIndex,
      quArr
    } = this.data
    return (
      <View className="container">
        <Form onSubmit={this.formSubmit} onReset={this.formReset}>
          <View className="section">
            <Input type="text" hidden="true" value={mid} name="user_id"></Input>
            <Input type="text" name="name" placeholder="收货人姓名"></Input>
          </View>
          <View className="section">
            <Input type="text" name="phone" placeholder="电话号码"></Input>
          </View>
          <View className="section">
            <Picker
              onChange={this.bindPickerChangeshengArr}
              value={shengIndex}
              range={shengArr}
              data-id={shengId[shengIndex]}
            >
              <View className="picker">
                {'选择省份：' + shengArr[shengIndex]}
                <Input
                  hidden="true"
                  name="province"
                  value={shengArr[shengIndex]}
                ></Input>
              </View>
            </Picker>
          </View>
          <View className="section">
            <Picker
              onChange={this.bindPickerChangeshiArr}
              value={shiIndex}
              range={shiArr}
            >
              <View className="picker">
                {'选择城市：' + shiArr[shiIndex]}
                <Input
                  hidden="true"
                  name="city"
                  value={shiArr[shiIndex]}
                ></Input>
              </View>
            </Picker>
          </View>
          <View className="section">
            <Picker
              onChange={this.bindPickerChangequArr}
              value={quIndex}
              range={quArr}
            >
              <View className="picker">
                {'选择地区：' + quArr[quIndex]}
                <Input hidden="true" name="town" value={quArr[quIndex]}></Input>
              </View>
            </Picker>
          </View>
          <View className="section">
            <Input
              type="text"
              className="ww"
              name="address"
              placeholder="详细地址"
            ></Input>
          </View>
          <View>
            <Label></Label>
          </View>
          <View className="btn-area">
            <Button formType="submit">保存地址</Button>
          </View>
        </Form>
      </View>
    )
  }
}

export default _C
