import { Block, View, Label, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './bind.scss'

@withWeapp({
  data: {
    results: []
  },
  //事件处理函数
  confimInfo: function(e) {},
  onLoad: function() {}
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '绑定账户'
  }

  render() {
    return (
      <View className="container bind w100">
        <View className="form-wrapper w100">
          <View className="first-line info">
            <Label className="text-center" for>
              证件号码:
            </Label>
            <Input type="text" placeholder="请输入证件号码"></Input>
          </View>
          <View className="second-line info">
            <Label className="text-center" for>
              卡号:
            </Label>
            <Input type="text" placeholder="请输入卡号"></Input>
          </View>
          <Button className="submit" onClick={this.confimInfo}>
            确定
          </Button>
        </View>
      </View>
    )
  }
} //index.js
//获取应用实例

export default _C
