博客对于一个新手或者初出茅庐的前端开发人员来说，或许是辣么遥不可及，在我们的思想里，博客或许需要个php后台，类似WordPress。但是这样我们或许又要去学习另外一门语言，为了一个博客却要多去了解一门语言，这代价似乎有些大，今天，就我自己搭建博客所遇到的一些坑给大家说说。（hexo官网：[hexo](https://hexo.io/)）

## 1、环境搭建

### 安装node
进入[node官网](https://nodejs.org/en/)下载安装包，按照提示完成安装过程即可！安装成功之后在命令行输入：
```bash
$ node -v
$ npm -v
```
如果能看到版本号，则表示安装完成！
<!--more-->
### 安装hexo
参考[hexo官网](https://hexo.io)，依次在命令行输入以下命令：
``` bash
$ npm install hexo-cli -g
$ hexo init blog
$ cd blog
$ npm install
$ hexo server
```
## 2、创建博客

### 初始化博客项目
在命令行输入以下命令，创建一个默认的博客模板
``` bash
$ hexo init blog
```
### 安装项目依赖
在项目根目录打开命令行窗口，输入如下命令，安装项目所需模块！
``` bash
$ npm install
```
### 运行项目

``` bash
$ hexo server 或者  $ hexo s
```
完成后在浏览器地址栏输入：[http://localhost:4000/](http://localhost:4000/),便可以看到刚刚创建的博客！然而到这一步，一切都只是停留在本地，说白了就只能自己玩玩，顶破天也只能同一网络下的小伙伴可以瞧瞧，但是博客，咱是要让更多人看到，这可怎么办，接下来就要用到标题中提到的github的page。
## 3、注册github帐号，创建一个仓库！
作为一个码了这么多年代码的码农来说，你可千万不要跟我说你还不知道github为何物！进入[github官网](https://github.com/)
### 注册帐号
在右上角点击sign up,按照提示完成注册流程！
### 创建仓库
注意：这里的仓库名称有讲究，在这里举个例子，比如刚才我们注册的帐号是：viscode,那么我们现在要创建的仓库名称就是：viscode.github.io，别问我为什么，都是这么来的！这一切都完成之后，我们就可以通过在浏览器地址栏输入：viscode.github.io来访问我们刚刚创建的项目，但是我们现在进去肯定是个大大的404，因为我们项目里面什么东西都没有。
## 4、部署项目
刚刚，我们通过 hexo s 运行了项目，但是还是仅仅只能在本地浏览，接下来，我们就要把项目同步到github。
``` bash
$ hexo g
```
首先，我们要了解，实际上hexo之所以能在github上运行，其实际就是public目录下的文件。知道这个以后我们就很好解决,我们在项目根目录创建一个文件夹，命名为out吧，
然后在改目录同步刚才创建的github仓库。
``` bash
$ git clone https://github.com/viscode/viscode
```
或者通过一些github桌面可视化工具来完成，在这里我推荐使用[brackets](http://brackets.io/)的git插件，或者[github desktop](https://desktop.github.com/)来进行实时同步，在这里或许有不少小伙伴要问了，网络上有很多都是直接通过配置_config.yml来实现项目部署，你这简直low爆了，但是前提是，你必须要对git非常熟悉，不然那个配置过程会让你抓狂，当然，我现在对git还不是很熟，所以用了这个死板的方式来实现，不喜勿喷。
到这里，直接输入[viscode.github.io](http://viscode.github.io)，或许就可以看到我们博客的样子。
## 5、域名绑定
这个步骤要看你的域名提供商是什么了，在这里，由于我用的是阿里云的，所以就以阿里云的配置稍作介绍。
### 添加域名解析
1、登录阿里云帐号：[跳转](https://account.aliyun.com/login/login.htm?spm=5176.8006371.416540.19.df9Xiv&oauth_callback=https%3A%2F%2Fwanwang.aliyun.com%2F%3Fspm%3D0.0.0.0.O3KbHr)
2、进入控制台：
<img src="/images/1-2.jpg" alt="">
当然，这一切要建立在你已经购买了域名的情况，如果还未购买域名，[请移步](https://wanwang.aliyun.com/domain/searchresult)
然后点击后面的解析：
<img src="/images/1-3.jpg" alt="">
添加最后一条解析记录就可以了，上面三条都是企业邮箱所用，如不需要，大可不用设置。
### 在github根目录添加CNAME
最后，我们进入到之前创建的out目录，新建一个文件，文件名：CNAME
然后在文件里面输入：
``` file
你的域名 （例如：www.viscode.cn）
```
添加完成后，将out目录同步到github，然后我们在地址栏输入您说注册的域名，就可以完成域名的绑定了，注意：如果未能及时显示正确的页面，请稍等几分钟后再试，这过程需要些时间。
## 6、更改主题
hexo主题官网[链接](https://hexo.io/themes/)，然而我们今天要用到的主题并非官网上的，我们今天要用的是[next](http://theme-next.iissnan.com/)，链接已给出，请大家一步官网，只需照着步骤来，就可以完成主题的配置。最后，希望大家能成功，如果有任何问题，请在下方留言。