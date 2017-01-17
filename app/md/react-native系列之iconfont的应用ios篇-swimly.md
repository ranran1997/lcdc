前不久，阿里旗下iconfont网站迎来重大升级，这对于广大前端同胞来说简直是福音啊有木有，我们不仅仅能做出纯色的iconfont，还能在页面中插入多色的图标，而且应用方式也很简单，权当引用一个css文件而已，然而现在react-native正是风生水起，越来越多的小伙伴投入到rn的开发。然而对于图标的选择，我们也不能类似之前的ios，或者android开发那样，利用无数的png来替代，先不说安装包大小的问题，总之用起来就很不爽，今天就来了解一下怎么在react-native中利用iconfont，而且这些icon你完全可以自定义，而不是现今一些比较流行的icon框架，比如fontawesome，或者ionicon。
<!--more-->
###### 注意：本篇文章主要讲解ios的应用，所以以下教程都是在mac上进行！
当然，前提是，你已经安装好react-native，xcode，以及你所擅用的ide，具体的步骤请参照[这里](http://reactnative.cn/docs/0.39/getting-started.html#content)。如果你不想配置这么复杂的环境，你也可以直接下载[DECO IDE](https://www.decosoftware.com/),可以快速创建react-native应用。
## 利用DECOIDE快速创建react-native项目
下载deco并完成安装，如下图所示，即可快速创建react-native项目（目前只有mac版本的）
<img style="margin:20px 0;" src="/images/2016120601.png" alt="">
<img style="margin:0 0;" src="/images/2016120602.png" alt="">
保存当前项目！
## 安装项目依赖
在项目根目录打开终端：
``` bash
npm install react-native-vector-icons --save
```
<img style="margin:0 0;" src="/images/2016120603.png" alt="">
## 下载项目所需icon
目前有众多iconfont网站，推荐[iconfont.cn](http://www.iconfont.cn/plus)，除了平台提供的图标意外，你也可以上传自己做的图标svg文件，便可以很方便的生成iconfont文件。在这里为了测试，选择了一些图标
<img style="margin:0 0;" src="/images/2016120605.jpg" alt="">
## 获取字体文件的map
推荐[https://github.com/bob-chen/react-native-iconfont-mapper](https://github.com/bob-chen/react-native-iconfont-mapper)，下载该项目源码到本地，也可以用git获取该项目源码。
 1、安装python，因为该工具是基于python开发。
 2、安装[fonttools](https://github.com/fonttools/fonttools)，安装方法请参见github项目介绍。
 以上两部完成后，打开上面下载的iconfont文件，将里面的iconfont.ttf文件拷贝到react-native-iconfont-mapper项目根目录，并在该位置打开终端。
 ``` bash
 python iconfont-mapper.py iconfont.ttf iconfont.js
 ```
 <img style="margin:0 0;" src="/images/2016120606.png" alt="">
 最终会生成一个iconfont.js文件，如下图：
 <img style="margin:0 0;" src="/images/2016120607.png" alt="">
 接着打开项目node_modules > react-native-vector-icons，新建Iconfont.js文件，代码如下：
 ``` javascript
import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/Iconfont.json';

export default createIconSet(glyphMap, 'Iconfont', 'Iconfont.ttf');
 ```
 接着打开node_modules > react-native-vector-icons > glyphmaps新建Iconfont.json文件，直接将上面生成的map对象拷贝过来，记得要把后面的字符串改成数字。
 ``` javascript
 {
    "tongxunluxianxing-copy-copy":58880,
    "tubiao04":59010,
    "fanhui":58883,
    "Contact":58884,
    "caidanheng":58885,
    "dongtai2":58881,
    "dongtai":58890,
    "article":58891,
    "dongtai1":58892,
    "wenzhang":59533,
    "p-photo":59022,
    "tishi2":59025,
    "paizhao":58898,
    "right":58899,
    "paizhao1":59029,
    "right1":59030,
    "right2":58909,
    "ttpodicon":58911,
    "xiangce":59556,
    "tianjiadizhi":58917,
    "fudai":58921,
    "saomiao":58887,
    "wenzhang1":59576,
    "my":58942,
    "close":58951,
    "shezhi":59020,
    "erweima":59098,
    "iconfont05":59123,
    "jinlingyingcaiwangtubiao53":59326,
    "tongxunlu":59015,
    "x":120,
    "home":59003,
    "fabu":59006
}
 ```
将下载下来的iconfont.ttf拷贝到node_modules > react-native-vector-icons > Fonts
<img style="margin:0 0;" src="/images/2016120608.png" alt="">
## 在xcode中配置环境并且打包项目
进入到react-native项目中的ios
 <img style="margin:0 0;" src="/images/2016120609.png" alt="">
 双击打开，并且将node_modules > react-native-vector-icons中的Fonts目录直接拖到xcode项目中
<img style="margin:0 0;" src="/images/2016120610.png" alt="">
 接着将node_modules > react-native-vector-icons中的RNVectorIcons.xcodeproj拖到Libraries中
 <img style="margin:0 0;" src="/images/2016120611.png" alt="">
 打开xcode项目中的Project>Info.plist,在Information Property List中新增一条Fonts Provided by application，并且在下面的item中填入字体的名称，这里可以填多个。
<img style="margin:0 0;" src="/images/2016120612.png" alt="">
其实到这里就差不多了，如果你项目中要用到TabBar/NavigatorIOS这两个组件，还需如下操作，在项目中选中Build Phases，在Link Binary With Libraries中添加libRNVectorIcons.a。
<img style="margin:0 0;" src="/images/2016120613.png" alt="">
然后打包项目即可，如下操作
<img style="margin:0 0;" src="/images/2016120614.png" alt="">
但是如果你的xcode已经升级到最新版，不出意外会报两个错误的
<img style="margin:0 0;" src="/images/2016120615.png" alt="">
我们以此选中两条错误，会定在：SecRandomCopyBytes(kSecRandomDefault, keyBytes.length, keyBytes.mutableBytes);这个位置
<img style="margin:0 0;" src="/images/2016120616.png" alt="">
只需要在报错的最前面加上(void)即可，到这里只能算暂时解决目前报的两个错误，还需要修改RCTScrollView.m,不然会报 Use of undeclared identifier '_refreshControl'; did you mean 'refreshControl'?错误
```
@implementation RCTCustomScrollView

{

__weak UIView *_dockedHeaderView;

RCTRefreshControl *_refreshControl; //加入此行

}
```
RCTScrollView.m 位于Xcode项目中libraries下React.xcodeproj / React / View 中 
这时候我们再次build我们的项目就不会报错了。到这里就静待项目在模拟器中跑起来。
<img style="margin:0 0;" src="/images/2016120617.png" alt="">
## 在项目中使用 iconfont
```
import Icon from 'react-native-vector-icons/Iconfont';

<Icon name="home" size={50} color="green"/>
```
最终index.ios.js代码如下：
```
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Iconfont';
class Project extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="home" size={50} color="green"/>
        <Text style={{fontFamily:"iconfont",fontSize:50,color:"red"}}>&#xe67b;</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('Project', () => Project);
```
至此就可以看到icon老老实实的出现在页面中
<img style="margin:0 0;" src="/images/2016120618.png" alt="">
最后做点总结，虽然过程并非很难，但是中途可能多多少少有些坑，还需要自己不断去摸索，其实最难的估计就是获取字体文件的键值对了，各种环境可能有些麻烦，还有，最后提醒一下，也就是获取到json之后直接复制过去之后一定记得去掉value后面的引号，不然<Icon/>形式的icon就没用了。