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
import withWeapp from '@tarojs/with-weapp'
import TaroParsebbTmpl from '../../imports/TaroParsebbTmpl.js'
import TaroParsebzTmpl from '../../imports/TaroParsebzTmpl.js'
import TaroParsejTmpl from '../../imports/TaroParsejTmpl.js'
import TaroParseiTmpl from '../../imports/TaroParseiTmpl.js'
import TaroParsehTmpl from '../../imports/TaroParsehTmpl.js'
import TaroParsegTmpl from '../../imports/TaroParsegTmpl.js'
import TaroParsefTmpl from '../../imports/TaroParsefTmpl.js'
import TaroParseeTmpl from '../../imports/TaroParseeTmpl.js'
import TaroParsedTmpl from '../../imports/TaroParsedTmpl.js'
import TaroParsecTmpl from '../../imports/TaroParsecTmpl.js'
import TaroParsebTmpl from '../../imports/TaroParsebTmpl.js'
import TaroParsezTmpl from '../../imports/TaroParsezTmpl.js'
import TaroParseTmpl from '../../imports/TaroParseTmpl.js'
import TaroEmojiViewTmpl from '../../imports/TaroEmojiViewTmpl.js'
import TaroParseImgTmpl from '../../imports/TaroParseImgTmpl.js'
import TaroParseVideoTmpl from '../../imports/TaroParseVideoTmpl.js'
import './pdetail.scss'
//index.js
//获取应用实例
var app = Taro.getApp()
var pro = {
  addtime: '1498823755',
  brand: '小米手机',
  brand_id: '7',
  cat_name: '小米',
  cid: '15',
  collect: 0,
  del: '0',
  del_time: '0',
  end_time: '0',
  id: '286',
  img_arr: [
    'https://shop.xnnut.com/Data/UploadFiles/product/20170630/1498823755795695.jpg'
  ],
  intro: '64G 超薄迷你智能指纹解锁拍照学生手机',
  is_down: '0',
  is_hot: '1',
  is_sale: '0',
  is_show: '1',
  name: 'Xiaomi/小米 小米手机5S ',
  num: '999999',
  photo_d:
    'https://shop.xnnut.com/Data/UploadFiles/product/20170630/1498823755285774.jpg',
  photo_string: ',UploadFiles/product/20170630/1498823755795695.jpg',
  photo_x:
    'https://shop.xnnut.com/Data/UploadFiles/product/20170630/1498823755863174.jpg',
  price: '1999',
  price_jf: '1999',
  price_yh: '199900',
  pro_buff: null,
  pro_number: '432143214',
  pro_type: '1',
  renqi: '199',
  shiyong: '0',
  shop_id: '0',
  sort: '0',
  start_time: '0',
  type: '1',
  updatetime: '1498823754'
}
//引入这个插件，使html内容自动转换成wxml内容

@withWeapp({
  firstIndex: -1,
  data: {
    bannerApp: true,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0, //tab切换
    productId: 0,
    itemData: {},
    bannerItem: [],
    buynum: 1,
    // 产品图片轮播
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    // 属性选择
    firstIndex: -1,
    //准备数据
    //数据结构：以一组一组来进行设定
    commodityAttr: [],
    attrValueList: []
  },
  // 弹窗
  setModalStatus: function(e) {
    var animation = Taro.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0
    })

    this.animation = animation
    animation.translateY(300).step()

    this.setData({
      animationData: animation.export()
    })

    if (e.currentTarget.dataset.status == 1) {
      this.setData({
        showModalStatus: true
      })
    }
    setTimeout(
      function() {
        animation.translateY(0).step()
        this.setData({
          animationData: animation
        })
        if (e.currentTarget.dataset.status == 0) {
          this.setData({
            showModalStatus: false
          })
        }
      }.bind(this),
      200
    )
  },
  // 加减
  changeNum: function(e) {
    var that = this
    if (e.target.dataset.alphaBeta == 0) {
      if (this.data.buynum <= 1) {
        buynum: 1
      } else {
        this.setData({
          buynum: this.data.buynum - 1
        })
      }
    } else {
      this.setData({
        buynum: this.data.buynum + 1
      })
    }
  },
  // 传值
  onLoad: function(option) {
    //this.initNavHeight();
    var that = this
    that.setData({
      productId: option.productId
    })
    that.loadProductDetail()
  },
  // 商品详情数据获取
  loadProductDetail: function() {
    var that = this
    this.setData({
      itemData: pro,
      bannerItem: pro.img_arr
    })
    return
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Product/index',
      method: 'post',
      data: {
        pro_id: that.data.productId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //--init data
        var status = res.data.status
        if (status == 1) {
          var pro = res.data.pro
          var content = pro.content
          //that.initProductData(data);
          WxParse.wxParse('content', 'html', content, that, 3)
          that.setData({
            itemData: pro,
            bannerItem: pro.img_arr,
            commodityAttr: res.data.commodityAttr,
            attrValueList: res.data.attrValueList
          })
        } else {
          Taro.showToast({
            title: res.data.err,
            duration: 2000
          })
        }
      },
      error: function(e) {
        Taro.showToast({
          title: '网络异常！',
          duration: 2000
        })
      }
    })
  },
  // 属性选择
  onShow: function() {
    this.setData({
      includeGroup: this.data.commodityAttr
    })
    this.distachAttrValue(this.data.commodityAttr)
    // 只有一个属性组合的时候默认选中
    // console.log(this.data.attrValueList);
    if (this.data.commodityAttr.length == 1) {
      for (
        var i = 0;
        i < this.data.commodityAttr[0].attrValueList.length;
        i++
      ) {
        this.data.attrValueList[
          i
        ].selectedValue = this.data.commodityAttr[0].attrValueList[i].attrValue
      }
      this.setData({
        attrValueList: this.data.attrValueList
      })
    }
  },
  /* 获取数据 */
  distachAttrValue: function(commodityAttr) {
    /**
      将后台返回的数据组合成类似
      {
        attrKey:'型号',
        attrValueList:['1','2','3']
      }
    */
    // 把数据对象的数据（视图使用），写到局部内
    var attrValueList = this.data.attrValueList
    // 遍历获取的数据
    for (var i = 0; i < commodityAttr.length; i++) {
      for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
        var attrIndex = this.getAttrIndex(
          commodityAttr[i].attrValueList[j].attrKey,
          attrValueList
        )
        // console.log('属性索引', attrIndex);
        // 如果还没有属性索引为-1，此时新增属性并设置属性值数组的第一个值；索引大于等于0，表示已存在的属性名的位置
        if (attrIndex >= 0) {
          // 如果属性值数组中没有该值，push新值；否则不处理
          if (
            !this.isValueExist(
              commodityAttr[i].attrValueList[j].attrValue,
              attrValueList[attrIndex].attrValues
            )
          ) {
            attrValueList[attrIndex].attrValues.push(
              commodityAttr[i].attrValueList[j].attrValue
            )
          }
        } else {
          attrValueList.push({
            attrKey: commodityAttr[i].attrValueList[j].attrKey,
            attrValues: [commodityAttr[i].attrValueList[j].attrValue]
          })
        }
      }
    }
    // console.log('result', attrValueList)
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        if (attrValueList[i].attrValueStatus) {
          attrValueList[i].attrValueStatus[j] = true
        } else {
          attrValueList[i].attrValueStatus = []
          attrValueList[i].attrValueStatus[j] = true
        }
      }
    }
    this.setData({
      attrValueList: attrValueList
    })
  },
  getAttrIndex: function(attrName, attrValueList) {
    // 判断数组中的attrKey是否有该属性值
    for (var i = 0; i < attrValueList.length; i++) {
      if (attrName == attrValueList[i].attrKey) {
        break
      }
    }
    return i < attrValueList.length ? i : -1
  },
  isValueExist: function(value, valueArr) {
    // 判断是否已有属性值
    for (var i = 0; i < valueArr.length; i++) {
      if (valueArr[i] == value) {
        break
      }
    }
    return i < valueArr.length
  },
  /* 选择属性值事件 */
  selectAttrValue: function(e) {
    /*
    点选属性值，联动判断其他属性值是否可选
    {
      attrKey:'型号',
      attrValueList:['1','2','3'],
      selectedValue:'1',
      attrValueStatus:[true,true,true]
    }
    console.log(e.currentTarget.dataset);
    */
    var attrValueList = this.data.attrValueList
    var index = e.currentTarget.dataset.index //属性索引
    var key = e.currentTarget.dataset.key
    var value = e.currentTarget.dataset.value
    if (e.currentTarget.dataset.status || index == this.data.firstIndex) {
      if (
        e.currentTarget.dataset.selectedvalue == e.currentTarget.dataset.value
      ) {
        // 取消选中
        this.disSelectValue(attrValueList, index, key, value)
      } else {
        // 选中
        this.selectValue(attrValueList, index, key, value)
      }
    }
  },
  /* 选中 */
  selectValue: function(attrValueList, index, key, value, unselectStatus) {
    // console.log('firstIndex', this.data.firstIndex);
    var includeGroup = []
    if (index == this.data.firstIndex && !unselectStatus) {
      // 如果是第一个选中的属性值，则该属性所有值可选
      var commodityAttr = this.data.commodityAttr
      // 其他选中的属性值全都置空
      // console.log('其他选中的属性值全都置空', index, this.data.firstIndex, !unselectStatus);
      for (var i = 0; i < attrValueList.length; i++) {
        for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
          attrValueList[i].selectedValue = ''
        }
      }
    } else {
      var commodityAttr = this.data.includeGroup
    }

    // console.log('选中', commodityAttr, index, key, value);
    for (var i = 0; i < commodityAttr.length; i++) {
      for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
        if (
          commodityAttr[i].attrValueList[j].attrKey == key &&
          commodityAttr[i].attrValueList[j].attrValue == value
        ) {
          includeGroup.push(commodityAttr[i])
        }
      }
    }
    attrValueList[index].selectedValue = value

    // 判断属性是否可选
    // for (var i = 0; i < attrValueList.length; i++) {
    //   for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
    //     attrValueList[i].attrValueStatus[j] = false;
    //   }
    // }
    // for (var k = 0; k < attrValueList.length; k++) {
    //   for (var i = 0; i < includeGroup.length; i++) {
    //     for (var j = 0; j < includeGroup[i].attrValueList.length; j++) {
    //       if (attrValueList[k].attrKey == includeGroup[i].attrValueList[j].attrKey) {
    //         for (var m = 0; m < attrValueList[k].attrValues.length; m++) {
    //           if (attrValueList[k].attrValues[m] == includeGroup[i].attrValueList[j].attrValue) {
    //             attrValueList[k].attrValueStatus[m] = true;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    // console.log('结果', attrValueList);
    this.setData({
      attrValueList: attrValueList,
      includeGroup: includeGroup
    })

    var count = 0
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        if (attrValueList[i].selectedValue) {
          count++
          break
        }
      }
    }
    if (count < 2) {
      // 第一次选中，同属性的值都可选
      this.setData({
        firstIndex: index
      })
    } else {
      this.setData({
        firstIndex: -1
      })
    }
  },
  /* 取消选中 */
  disSelectValue: function(attrValueList, index, key, value) {
    var commodityAttr = this.data.commodityAttr
    attrValueList[index].selectedValue = ''

    // 判断属性是否可选
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        attrValueList[i].attrValueStatus[j] = true
      }
    }
    this.setData({
      includeGroup: commodityAttr,
      attrValueList: attrValueList
    })

    for (var i = 0; i < attrValueList.length; i++) {
      if (attrValueList[i].selectedValue) {
        this.selectValue(
          attrValueList,
          i,
          attrValueList[i].attrKey,
          attrValueList[i].selectedValue,
          true
        )
      }
    }
  },

  initProductData: function(data) {
    data['LunBoProductImageUrl'] = []

    var imgs = data.LunBoProductImage.split(';')
    for (let url of imgs) {
      url && data['LunBoProductImageUrl'].push(app.d.hostImg + url)
    }

    data.Price = data.Price / 100
    data.VedioImagePath = app.d.hostVideo + '/' + data.VedioImagePath
    data.videoPath = app.d.hostVideo + '/' + data.videoPath
  },

  //添加到收藏
  addFavorites: function(e) {
    var that = this
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Product/col',
      method: 'post',
      data: {
        uid: app.d.userId,
        pid: that.data.productId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        // //--init data
        var data = res.data
        if (data.status == 1) {
          Taro.showToast({
            title: '操作成功！',
            duration: 2000
          })
          //变成已收藏，但是目前小程序可能不能改变图片，只能改样式
          that.data.itemData.isCollect = true
        } else {
          Taro.showToast({
            title: data.err,
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

  addShopCart: function(e) {
    //添加到购物车
    var that = this
    console.log(app.d.userId)
    console.log(that.data.productId)
    console.log(that.data.buynum)
    console.log(e)
    Taro.request({
      url: app.d.ceshiUrl + '/Api/Shopping/add',
      method: 'post',
      data: {
        uid: app.d.userId,
        pid: that.data.productId,
        num: that.data.buynum
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        // //--init data
        var data = res.data
        if (data.status == 1) {
          var ptype = e.currentTarget.dataset.type
          if (ptype == 'buynow') {
            Taro.redirectTo({
              url: '../order/pay?cartId=' + data.cart_id
            })
            return
          } else {
            Taro.showToast({
              title: '加入购物车成功',
              icon: 'success',
              duration: 2000
            })
          }
        } else {
          Taro.showToast({
            title: data.err,
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
  bindChange: function(e) {
    //滑动切换tab
    var that = this
    that.setData({ currentTab: e.detail.current })
  },
  initNavHeight: function() {
    ////获取系统信息
    var that = this
    Taro.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    })
  },
  bannerClosed: function() {
    this.setData({
      bannerApp: false
    })
  },
  swichNav: function(e) {
    //点击tab切换
    var that = this
    if (that.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onShareAppMessage: function() {
    var that = this
    return {
      title: app.d.appTitle,
      path: '/pages/product/detail?productId=' + that.data.productId,
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '商品详情'
  }

  render() {
    const {
      indicatorDots,
      autoplay,
      interval,
      duration,
      bannerItem,
      itemData,
      showModalStatus,
      animationData,
      minusStatuses,
      buynum,
      currentTab,
      winHeight,
      content
    } = this.data
    return (
      <Block>
        <View className="cont">
          <Swiper
            style="height:375px"
            indicatorDots={indicatorDots}
            autoplay={autoplay}
            interval={interval}
            duration={duration}
          >
            {bannerItem.map((item, index) => {
              return (
                <Block key="bannerItem">
                  <SwiperItem>
                    <Image src={item} className="slide-image"></Image>
                  </SwiperItem>
                </Block>
              )
            })}
          </Swiper>
          <View className="title">{itemData.name}</View>
          <View className="gmxx">
            <View>
              <Span className="jiage">{itemData.price_yh + '积分'}</Span>
              <Span className="c6 fl_r font_14" style="color:#ccc">
                {'市场价：' + itemData.num}
              </Span>
            </View>
            <View className="font_14 c6">{'品牌：' + itemData.brand}</View>
          </View>
        </View>
        {/* 弹窗 */}
        {showModalStatus && (
          <View
            className="drawer_screen"
            onClick={this.setModalStatus}
            data-status="0"
          ></View>
        )}
        {showModalStatus && (
          <View animation={animationData} className="drawer_attr_box">
            <View
              className="close_icon"
              onClick={this.setModalStatus}
              data-status="0"
            >
              ×
            </View>
            <View className="drawer_attr_content">
              <View className="text_center">
                <Image className="drawer_image" src={itemData.photo_x}></Image>
                <View className="mingcheng">
                  <View>{itemData.name}</View>
                  <View style="font-size:29rpx;color:red">
                    {itemData.price_yh + '积分'}
                  </View>
                  <View style="font-size:26rpx;color:#ccc">
                    {'市场价' + itemData.num}
                  </View>
                </View>
              </View>
              <View className="shu">
                <Text className="cun">购买数量</Text>
                <View className="dian">
                  <View className="stepper">
                    <Text
                      className={minusStatuses[index]}
                      data-alpha-beta="0"
                      onClick={this.changeNum}
                    >
                      -
                    </Text>
                    {/*  数值  */}
                    <View className="nownum">{buynum}</View>
                    {/*  加号  */}
                    <Text
                      className="normal"
                      data-alpha-beta="1"
                      onClick={this.changeNum}
                    >
                      +
                    </Text>
                  </View>
                </View>
              </View>
              <View
                className="footc"
                onClick={this.addShopCart}
                data-type="buynow"
                data-status="1"
              >
                立即兑换
              </View>
            </View>
          </View>
        )}
        {/* 图文详情头部 */}
        <View>
          <View className="swiper-tab">
            <View
              className={'bre swiper-tab-list ' + (currentTab == 0 ? 'on' : '')}
              data-current="0"
              onClick={this.swichNav}
            >
              图文详情
            </View>
            <View
              className={'swiper-tab-list ' + (currentTab == 1 ? 'on' : '')}
              data-current="1"
              onClick={this.swichNav}
            >
              产品参数
            </View>
          </View>
          <Swiper
            current={currentTab}
            className="swiper-box"
            duration="300"
            style={'height:' + (winHeight - 31) + 'px'}
            onChange={this.bindChange}
          >
            <SwiperItem>
              <View className="wxParse">
                <ScrollView style="height:2000rpx;" scrollY="true">
                  <TaroParseTmpl
                    data={{ wxParseData: content.nodes }}
                  ></TaroParseTmpl>
                </ScrollView>
              </View>
            </SwiperItem>
            {/*  产品参数  */}
            <SwiperItem>
              <View className="p_all">
                <View className="canshu df">
                  <View className="name">商品名称：</View>
                  <View className="df_1 c3">{itemData.name}</View>
                </View>
                <View className="canshu df">
                  <View className="name">商品编号：</View>
                  <View className="df_1 c3">{itemData.pro_number}</View>
                </View>
                <View className="canshu df">
                  <View className="name">分类：</View>
                  <View className="df_1 c3">{itemData.cat_name}</View>
                </View>
                <View className="canshu df">
                  <View className="name">售后：</View>
                  <View className="df_1 c3">签收之日48小时无条件退货</View>
                </View>
              </View>
            </SwiperItem>
          </Swiper>
        </View>
        {/* -底部开始 */}
        <View className="footfixed tc">
          <View
            className="bg_red white w100 fl_l"
            onClick={this.setModalStatus}
            data-status="1"
          >
            立即兑换
          </View>
        </View>
      </Block>
    )
  }
}

export default _C
