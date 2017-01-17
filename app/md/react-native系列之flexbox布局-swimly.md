说起flex布局，前端朋友或许会很熟悉，其实跟css3的flex类似，只不过二者的写法有些许差别。其布局思维还是有很多公用之处的，这次就以react-native上的flex布局做详细了解！
### css3写法回顾：
#### 伸缩容器属性：
##### 1、display
``` css
display:flex  |  inline-flex
```
##### 2、flex-direction 指定主轴方向
``` css
flex-direction:row | row-reverse | column | column-reverse
```
<!--more-->
##### 3、flex-wrap 伸缩容器在主轴方向空间不足的情况下是否换行以及该如何换行。
``` css
flex-wrap:nowrap | wrap | wrap-reverse
```
##### 4、flex-flow 是flex-direction和flex-wrap的缩写版本
``` css
flex-flow:row nowrap;(默认值)
```
##### 5、justify-content 定义在主轴线的对齐方式
``` css
justify-content:flex-start | flex-end | center | space-between | space-around
```
##### 6、align-items 在交叉轴上的对齐方式）
baseline、stretch伸缩项目不能设置高度
``` css
align-items:flex-start | flex-end | center | baseline | stretch
```
##### 7、align-content 调整伸缩项目出现换行后在交叉轴上的对齐方式
``` css
align-content:flex-start | flex-end |center | space-between | space-around | stretch
```
最后再来个水平垂直居中的兼容性写法：
``` css
/*父级*/
display:-webkit-box;
display:-moz-box;
display:-ms-flexbox;
display:-webkit-flex;
display:flex;
/*垂直居中*/
-webkit-box-align:center;
-moz-box-align:center;
-ms-flex-align:center;
-webkit-align-items:center;
align-items:center;
/*水平居中*/
-webkit-box-pack:center;
-moz-box-pack:center;
-ms-flex-pack:center;
-webkit-justify-content:center;
justify-content:center;
```
#### 伸缩项目属性：
##### 1、order
定义项目的排列顺序，数值越小，排列越靠前，默认值为0。
``` css
order:number
```
##### 2、flex-grow
定义伸缩项目的放大比例，默认值为0，即表示如果存在剩余空间，也不放大。
##### 3、flex-shrink
定义伸缩项目的伸缩能力，默认值为1。
``` css
flex-shrink:number
```
##### 4、flex-basis
用来设置伸缩项目的基准值，剩余空间按比率进行伸缩，
``` css
flex-basis:length | auto
```
##### 5、flex
flex是flex-grow flex-shrink flex-basis三个属性的缩写，
``` css
flex:none | flex-grow flex-shrink flex-basis （其中第二个和第三个参数为可选参数，默认值为：0 1 auto）
```
##### 6、align-self
用来设置单独的伸缩项目在交叉轴上的对齐方式，会覆盖默认的对齐方式
``` css
align-self:auto | flex-start | flex-end | center | baseline | stretch
```
### react-native中使用flexbox：
rn目前主要支持flexbox如下6个属性：
#### alignItems
(在交叉轴上的对齐方式)baseline、stretch伸缩项目不能设置高度
``` css
alignItems:flex-start | flex-end | center | baseline | stretch
```
#### alignSelf
用来设置单独的伸缩项目在交叉轴上的对齐方式，会覆盖默认的对齐方式
``` css
alignSelf:auto | flex-start | flex-end | center | baseline | stretch
```
#### flex
flex是flex-grow flex-shrink flex-basis三个属性的缩写，
``` css
flex:none | flex-grow flex-shrink flex-basis （其中第二个和第三个参数为可选参数，默认值为：0 1 auto）
```
#### flexDirection
指定主轴方向
``` css
flexDirection:row | row-reverse | column | column-reverse
```
#### flexWrap
伸缩容器在主轴方向空间不足的情况下是否换行以及该如何换行。
``` css
flexWrap:nowrap | wrap | wrap-reverse
```
#### justifyContent
定义在主轴线的对齐方式
``` css
justifyContent:flex-start | flex-end | center | space-between | space-around
```