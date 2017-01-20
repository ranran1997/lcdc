var ip='192.168.4.151';
if (!('localStorage' in window)) {
  window.localStorage = (function() {
      var documentElement, isIE = !!document.all;
      if (isIE) {
          documentElement = document.documentElement;
          documentElement.addBehavior('#default#userdata');
      }
      return {
          setItem: function(key, value) {
              if (isIE) {
                  documentElement.setAttribute('value', value);
                  documentElement.save(key);
              }
              else {
                  window.globalStorage[location.hostname][key] = value;
              }
          },
          getItem: function(key) {
              if (isIE) {
                  documentElement.load(key);
                  return documentElement.getAttribute('value');
              }

              return window.globalStorage[location.hostname][key];
          },
          removeItem: function(key) {
              if (isIE) {
                  documentElement.removeAttribute('value');
                  documentElement.save(key);
              }
              else {
                  window.globalStorage[location.hostname].removeItem(key);
              }
          }
      };
  })();
}
function localUrl(){
  return "http://"+ip+"/LCDC/app/app.php";
}
function service(){
  return "http://"+ip+"/LCDC/app/"
}
function isEmail(str){
  var reg = /^([a-zA-Z0-9\._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
  return reg.test(str);
}
function GetRandomNum(Min,Max){   
  var Range = Max - Min;   
  var Rand = Math.random();   
  return(Min + Math.round(Rand * Range));   
}  
function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1024, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}
function projectType(){
  return ['全部','手机页面','手机app','门户网站','系统','flash','视频'];
}
function articleType(){
  return ['全部','基础','技巧','分享','插件','框架'];
}
function adminMenu(){
  return [{
    icon:"icon-tongji",
    text:"统计",
    url:""
  },{
    icon:"icon-projects",
    text:"项目管理",
    url:"",
    sub:[{
      icon:"",
      text:"项目列表",
      url:""
    },{
      icon:"",
      text:"添加",
      url:""
    },{
      icon:"",
      text:"统计",
      url:""
    }]
  }]
}
function initFooter(){}
function setting(){
  return [{
    text:"意见反馈",
    icon:"icon-liuyan",
    effect:'reback()'
  },{
    text:"手机浏览",
    icon:"icon-code",
    effect:'getCode()'
  },{
    text:"返回顶部",
    icon:"icon-uptop",
    effect:"gotop()"
  }]
}
function gotop(){
  $("html,body").animate({scrollTop:0},300)
}
function reback(){
  
}
function showbar(){
  $(window).bind('scroll',function(e){
    var top=$(this).scrollTop()
    if(top>40){
      $("body").addClass("show-pageDone");
    }else{
      $("body").removeClass("show-pageDone");
    }
  })
}
function getHash(){
  localStorage.setItem("hash",window.location.hash);
  return window.location.hash.split("/");
}
function catory(){
  localStorage.setItem("catory",getHash()[1]);
  return getHash()[1];
}
function init(fn){
  gotop();
  $.getScript("js/page_header.js",function(){
    header();
  });
  $.getScript('js/page_footer.js',function(){
    footer(function(){
      fn();
      $("body").Code();
    });
  })
}
;(function($){  
    $.fn.extend({   
	//将可选择的变量传递给方法
        Tips: function(options) {  
            //设置默认值并用逗号隔开
            var defaults = {
              value:"这是默认提示消息",
              type:"warning"
            }  
                  
            var options =  $.extend(defaults, options);  
  
            return this.each(function() {  
                var o = options;  
                var _this=$(this);
                if($(".tips").length>0){
                  $(".tips").removeClass("show").remove();
                }
                var str='<div class="tips '+o.type+'"><div class="mid-layout"><span class="iconfont v-m icon-'+o.type+'"></span><span class="v-m">'+o.value+'</span></div></div>';
                str=$(str).appendTo($(document.body));
                setTimeout(function(){
                  str.addClass("show")
                },20)
                setTimeout(function(){
                  str.removeClass("show");
                  setTimeout(function(){
                    str.remove();
                  },30)
                },2000)
            });  
        },
        Bar: function(options) {  
            //设置默认值并用逗号隔开
            var defaults = {
              link:'',
              type:null,
              nav:[],
              bar:[]
            }  
            var options =  $.extend(defaults, options);  
            return this.each(function() {  
                var o = options;  
                var _this=$(this);
                console.log(o.bar)
                nodetpl.get('tpls/footer.tpl', {
                  'type':o.link,
                  'list':o.nav,
                  'set':o.bar
                }, function(d){
                  document.querySelector("#footer").innerHTML=d;
                  if(o.type=="null") return false;
                  $(".fixed-menu").children("a").eq(o.type).addClass("active");
                });
            });  
        },
        Code: function(options) {  
          //设置默认值并用逗号隔开
          var defaults = {
            
          }  
          var options =  $.extend(defaults, options);  
          return this.each(function() {  
              var o = options;  
              var _this=$(this);
              console.log("二维码")
              $.getScript('libs/qrcode.min.js',function(){
                console.log(document.getElementById("qrcode"))
                  var qrcode = new QRCode(document.getElementById("qrcode"), {
                    text:window.location.href,
                    width: 100,
                    height: 100,
                    colorDark : "#E54C65",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
              })
          });  
        } 
    });    
})(jQuery);  