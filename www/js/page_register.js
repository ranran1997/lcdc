function init(){
  var register=false;
  /*验证用户名是否存在 */
  $("#username").blur(function(){
    var sendData={
      type:"check",
      username:$("input[name=username]").val() 
    }
    data(localUrl()+"register.php",sendData,"json",function(){
      console.log(sendData)
    },function(data){
      console.log(data)
    })
  })
  /*注册*/
  $("#submit").click(function(){
    var sendData={
      type:"reg",
      username:$("input[name=username]").val(),
      password:$("input[name=password]").val(),
    }
    console.log(sendData)
    data(localUrl()+"register.php",sendData,"json",function(){
      console.log("start")
    },function(data){
      console.log(data)
    })
  })
}