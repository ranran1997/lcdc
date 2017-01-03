function init(){
  /*登录*/
  $("#submit").click(function(){
    var _this=$(this);
    login(_this);
  })
  $(window).keydown(function(e){
    if(e.keyCode==13){
      login();
    }
  })
  function login(_this){
    var sendData={
      type:"login",
      username:$("input[name=username]").val(),
      password:$("input[name=password]").val()
    }
    console.log(sendData)
    $.ajax({
      type:'get',
      url:"http://localhost/lcdc/app/app.php",
      data:sendData,
      dataType:"jsonp",
      jsonp:"callback",
      beforeSend:function(_this){
        $("#submit").addClass("loading")
      },
      success:function(data){
        $("#submit").removeClass("loading")
        if(typeof data.id=="number"){
          console.log("登录成功");
          $("input").val("");
          $.cookie("logined",data.username);
          console.log($.cookie("logined"))
        }else{
          console.log("用户名或密码有误！")
        }
      },
    });
  }
}