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
      url:"http://192.168.4.151/lcdc/app/app.php",
      data:sendData,
      dataType:"jsonp",
      jsonp:"callback",
      beforeSend:function(_this){
        $("#submit").addClass("loading")
      },
      success:function(data){
        $("#submit").removeClass("loading")
        if(typeof data.id=="number"){
          $(document.body).Tips({value:"你看吧，没花钱吧，快去玩去吧！",type:"right"});
          $("input").val("");
          $.cookie("logined",data.username);
          console.log($.cookie("logined"));
          header();
          window.location.href="#/";
          home();
        }else{
          console.log("用户名或密码有误！")
        }
      },
    });
  }
}