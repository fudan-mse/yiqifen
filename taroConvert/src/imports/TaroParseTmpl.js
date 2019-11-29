import TaroParsezTmpl from './TaroParsezTmpl'
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
export default class TaroParseTmpl extends Taro.Component {
  render() {
    const {
      data: { wxParseData, item }
    } = this.props
    return (
      <Block>
        {wxParseData.map((item, index) => {
          return (
            <Block key>
              <TaroParsezTmpl data={item}></TaroParsezTmpl>
            </Block>
          )
        })}
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}
