function localUrl(){
  return "http://192.168.4.151/LCDC/app/app.php";
}
function service(){
  return "http://192.168.4.151/LCDC/app/"
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
        }  
    });    
})(jQuery);  