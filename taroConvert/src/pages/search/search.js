import { Block, View, Icon, Input, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './search.scss'
//index.js
//获取应用实例
var app = Taro.getApp()

function handleResult(data, self) {
  if (data && data.length > 0) {
    self.setData({
      results: data.map(r => ({
        name: r.name,
        detail: `${r.explain}${r.contain}${r.tip}`,
        type: {
          id: r.type,
          name: {
            0: '可回收垃圾',
            1: '有害垃圾',
            2: '厨余（湿）垃圾',
            3: '其他（干）垃圾'
          }[r.type]
        }
      }))
    })
  } else {
    self.setData({
      results: [
        {
          name: '暂无结果',
          type: {
            name: '未知'
          }
        }
      ]
    })
  }
}

@withWeapp({
  data: {
    results: [],
    showDetail: false
  },
  //事件处理函数
  bindconfirm: function(e) {
    if (!e.detail.value) return

    var self = this
    console.log(app.d.point)
    app.d.point = app.d.point + 1
    Taro.showLoading({ title: '加载中……' })
    Taro.request({
      // url: app.d.yiqifen + '/share/a/share/api/queryGarbage?openId=1234567&name=' + e.detail.value,
      url:
        app.d.uniheart +
        '/proxy?url=https://laji.lr3800.com/api.php?name=' +
        e.detail.value,
      method: 'get',
      success: function(res) {
        handleResult(res.data.newslist, self)
      },
      error: function(error) {
        Taro.showToast({
          title: '网络异常！',
          duration: 2000
        })
      },
      complete: Taro.hideLoading
    })
  },
  showDetail: function(e) {
    this.setData({
      showDetail:
        this.data.showDetail === e.currentTarget.id ? false : e.currentTarget.id
    })
  },
  onLoad: function() {}
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: '搜索'
  }

  render() {
    const { results, showDetail } = this.data
    return (
      <View className="container">
        <View className="top-search">
          <Icon
            className="i-search"
            type="search"
            size="20"
            color="#123a72"
          ></Icon>
          <Input
            className="search-input"
            name="search"
            type="text"
            confirmType="search"
            autoFocus
            onConfirm={this.bindconfirm}
            placeholder="请输入想要查询的垃圾名称"
          ></Input>
        </View>
        <View className="result-list">
          {results.map((result, idx) => {
            return (
              <View>
                <View className="result-item">
                  <Text
                    className="rb-name text-center"
                    selectable="true"
                    space="false"
                    decode="false"
                  >
                    {result.name}
                  </Text>
                  <Text
                    className="rb-type text-center"
                    id={result.name}
                    onClick={this.showDetail}
                  >
                    {result.type.name}
                  </Text>
                </View>
                {showDetail === result.name && (
                  <View className="rb-detail">
                    <Text selectable="true" space="true" decode="true">
                      {result.detail}
                    </Text>
                  </View>
                )}
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default _C
