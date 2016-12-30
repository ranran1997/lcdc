;(function(){
  var register=false;
  /*验证用户名是否存在 */
  /*注册*/
  $("#submit").click(function(){
    var sendData={
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
})()