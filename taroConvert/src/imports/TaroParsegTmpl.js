import TaroEmojiViewTmpl from './TaroEmojiViewTmpl'
import TaroParseImgTmpl from './TaroParseImgTmpl'
import TaroParseVideoTmpl from './TaroParseVideoTmpl'
import TaroParsehTmpl from './TaroParsehTmpl'
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
export default class TaroParsegTmpl extends Taro.Component {
  render() {
    const { data: item } = this.props
    return (
      <Block>
        {/* 判断是否是标签节点 */}
        {item.node == 'element' ? (
          <Block>
            {item.tag == 'button' ? (
              <Block>
                <Button type="default" size="mini">
                  {item.nodes.map((item, index) => {
                    return (
                      <Block key>
                        <TaroParsehTmpl data={item}></TaroParsehTmpl>
                      </Block>
                    )
                  })}
                </Button>
              </Block>
            ) : item.tag == 'li' ? (
              <Block>
                <View
                  className={item.classStr + ' wxParse-li'}
                  style={item.styleStr}
                >
                  <View className={item.classStr + ' wxParse-li-inner'}>
                    <View className={item.classStr + ' wxParse-li-text'}>
                      <View
                        className={item.classStr + ' wxParse-li-circle'}
                      ></View>
                    </View>
                    <View className={item.classStr + ' wxParse-li-text'}>
                      {item.nodes.map((item, index) => {
                        return (
                          <Block key>
                            <TaroParsehTmpl data={item}></TaroParsehTmpl>
                          </Block>
                        )
                      })}
                    </View>
                  </View>
                </View>
              </Block>
            ) : item.tag == 'video' ? (
              <Block>
                <TaroParseVideoTmpl data={item}></TaroParseVideoTmpl>
              </Block>
            ) : item.tag == 'img' ? (
              <Block>
                <TaroParseImgTmpl data={item}></TaroParseImgTmpl>
              </Block>
            ) : item.tag == 'a' ? (
              <Block>
                <View
                  onClick={this.wxParseTagATap}
                  className={
                    'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag
                  }
                  data-src={item.attr.href}
                  style={item.styleStr}
                >
                  {item.nodes.map((item, index) => {
                    return (
                      <Block key>
                        <TaroParsehTmpl data={item}></TaroParsehTmpl>
                      </Block>
                    )
                  })}
                </View>
              </Block>
            ) : item.tagType == 'block' ? (
              <Block>
                <View
                  className={item.classStr + ' wxParse-' + item.tag}
                  style={item.styleStr}
                >
                  {item.nodes.map((item, index) => {
                    return (
                      <Block key>
                        <TaroParsehTmpl data={item}></TaroParsehTmpl>
                      </Block>
                    )
                  })}
                </View>
              </Block>
            ) : (
              <View
                className={
                  item.classStr +
                  ' wxParse-' +
                  item.tag +
                  ' wxParse-' +
                  item.tagType
                }
                style={item.styleStr}
              >
                {item.nodes.map((item, index) => {
                  return (
                    <Block key>
                      <TaroParsehTmpl data={item}></TaroParsehTmpl>
                    </Block>
                  )
                })}
              </View>
            )}
            {/* li类型 */}
            {/* video类型 */}
            {/* img类型 */}
            {/* a类型 */}
            {/* 其他块级标签 */}
            {/* 内联标签 */}
          </Block>
        ) : (
          item.node == 'text' && (
            <Block>
              <TaroEmojiViewTmpl data={item}></TaroEmojiViewTmpl>
            </Block>
          )
        )}
        {/* 判断是否是文本节点 */}
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}
