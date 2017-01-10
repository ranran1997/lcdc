在react-native总，view其实就是我们所熟知的div，支持多层嵌套，支持flexbox布局。
#### react-native样式：
``` css
外联样式：style={styles.container}
内联样式：style={{………………………………}}
多个样式：style={[styles.container,styles.flex,{……………………}]}
```
以下是按照携程的首页，利用react-native做的简单布局，代码在下方！
<!--more-->
<img src="/images/3-1.jpg" alt="">
index.android.js
``` javascript
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio
} from 'react-native';

class RN extends Component {
  render() {
    return (
      <View style={[styles.full,styles.padding_10]}>
        <View style={[styles.sortItem,styles.padding_10,styles.bg_pink]}>
          <View style={[styles.center,styles.full]}>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white,styles.icon,styles.fs_30]}>&#xe600;</Text>
            </View>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white]}>酒店</Text>
            </View>
          </View>
          <View style={[styles.full,styles.line_right,styles.line_white,styles.line_left]}>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white]}>海外酒店</Text>
            </View>
            <View style={[styles.full,styles.center,styles.line_top,styles.line_white]}>
              <Text style={[styles.color_white]}>特惠酒店</Text>
            </View>
          </View>
          <View style={[styles.full]}>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white]}>团购</Text>
            </View>
            <View style={[styles.full,styles.center,styles.line_top,styles.line_white]}>
              <Text style={[styles.color_white]}>客栈、公寓</Text>
            </View>
          </View>
        </View>

        <View style={[styles.sortItem,styles.padding_10,styles.bg_blue]}>
          <View style={[styles.center,styles.full]}>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white,styles.icon,styles.fs_30]}>&#xe602;</Text>
            </View>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white]}>机票</Text>
            </View>
          </View>
          <View style={[styles.full,styles.line_right,styles.line_white,styles.line_left]}>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white]}>火车票</Text>
            </View>
            <View style={[styles.full,styles.center,styles.line_top,styles.line_white]}>
              <Text style={[styles.color_white]}>国际机票</Text>
            </View>
          </View>
          <View style={[styles.full]}>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white]}>汽车票、船票</Text>
            </View>
            <View style={[styles.full,styles.center,styles.line_top,styles.line_white]}>
              <Text style={[styles.color_white]}>自驾、专车</Text>
            </View>
          </View>
        </View>

        <View style={[styles.sortItem,styles.padding_10,styles.bg_green]}>
          <View style={[styles.center,styles.full]}>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white,styles.icon,styles.fs_30]}>&#xe601;</Text>
            </View>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white]}>旅游</Text>
            </View>
          </View>
          <View style={[styles.full,styles.line_right,styles.line_white,styles.line_left]}>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white]}>攻略、身边</Text>
            </View>
            <View style={[styles.full,styles.center,styles.line_top,styles.line_white]}>
              <Text style={[styles.color_white]}>周边游</Text>
            </View>
          </View>
          <View style={[styles.full]}>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white]}>游轮</Text>
            </View>
            <View style={[styles.full,styles.center,styles.line_top,styles.line_white]}>
              <Text style={[styles.color_white]}>保险、签证</Text>
            </View>
          </View>
        </View>

        <View style={[styles.sortItem,styles.padding_10,styles.bg_orange]}>
          <View style={[styles.full,styles.line_right,styles.line_white]}>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white]}>景点、玩乐</Text>
            </View>
            <View style={[styles.full,styles.center,styles.line_top,styles.line_white]}>
              <Text style={[styles.color_white]}>礼品卡</Text>
            </View>
          </View>
          <View style={[styles.full,styles.line_right,styles.line_white]}>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white]}>美食</Text>
            </View>
            <View style={[styles.full,styles.center,styles.line_top,styles.line_white]}>
              <Text style={[styles.color_white]}>出境WIFI</Text>
            </View>
          </View>
          <View style={[styles.full]}>
            <View style={[styles.full,styles.center]}>
              <Text style={[styles.color_white]}>全球购</Text>
            </View>
            <View style={[styles.full,styles.center,styles.line_top,styles.line_white]}>
              <Text style={[styles.color_white]}>更多</Text>
            </View>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon:{
    fontFamily:"iconfont"
  },
  full:{
    flex:1
  },
  fs_30:{
    fontSize:50/PixelRatio.get()
  },
  sortItem:{
    flexDirection:"row",
    height:80,
    borderRadius:5/PixelRatio.get(),
    marginBottom:10/PixelRatio.get()
  },
  center:{
    justifyContent:"center",
    alignItems:"center"
  },
  padding_10:{
    padding:10/PixelRatio.get()
  },
  color_white:{
    color:"rgba(255,255,255,0.9)",
    fontSize:14/PixelRatio.get()
  },
  line_left:{
    borderLeftWidth:1/PixelRatio.get()
  },
  line_top:{
    borderTopWidth:1/PixelRatio.get()
  },
  line_right:{
    borderRightWidth:1/PixelRatio.get()
  },
  line_bottom:{
    borderBottomWidth:1/PixelRatio.get()
  },
  line_white:{
    borderColor:"rgba(255,255,255,0.4)"
  },
  bg_pink:{
    backgroundColor:"#FF7170"
  },
  bg_blue:{
    backgroundColor:"#2C8DFC"
  },
  bg_green:{
    backgroundColor:"#33A715"
  },
  bg_orange:{
    backgroundColor:"#FF9414"
  }
});

AppRegistry.registerComponent('RN', () => RN);

```
重点提示一下，这里面所有的图标都是用的[iconfont](http://iconfont.cn/plus)的图标，网页中怎么用iconfont，我相信大多数人都会，但是react-native怎么用iconfont，刚刚接触的时候我是懵逼的，经过一番百度，最后终于找到解决方法：[react-native-iconic-font](https://github.com/NativeSH/react-native-iconic-font)。
``` bash
npm install --save react-native-iconic-font
```
切记，这一步的时候，如果你的react-native还在运行着，请先停止服务，不然模块会安装失败！
安装完成之后，将你的iconfont文件拷贝到如下目录：[project root]/android/app/src/main/assets/fonts/，这里只需要ttf文件即可。
然后你就可以像网页那般自由的调用iconfont了。