import {
  Block,
  View,
  Swiper,
  SwiperItem,
  Image,
  Text,
  ScrollView,
  Video,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class TaroParseVideoTmpl extends Taro.Component {
  render() {
    const { data: item } = this.props
    return (
      <Block>
        <View
          className={item.classStr + ' wxParse-' + item.tag}
          style={item.styleStr}
        >
          <Video
            className={item.classStr + ' wxParse-' + item.tag + '-video'}
            src={item.attr.src}
          ></Video>
        </View>
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}
