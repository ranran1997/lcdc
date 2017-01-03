function data(url,data,type,before,success){
  var url=url || "";
  var data=data || "";
  var type=type || "post";
  var before=before || function(){};
  var success=success || function(){console.log("success")}
  $.ajax({
    type:'post',
    url:url,
    data:data,
    dataType:type,
    beforeSend:function(){
      before();
    },
    success:function(data){
      success(data);
    },
    error:function(){

    }
  });
}
function localUrl(){
  return "http://localhost/LCDC/app/";
}
function isEmail(str){
  var reg = /^([a-zA-Z0-9\._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
  return reg.test(str);
}