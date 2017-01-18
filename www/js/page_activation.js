function init(){
  $("body").Bar({
    bar:setting()
  })
  $("body").Code()
  /*登录*/
  $("#submit").click(function(){
    var _this=$(this);
    activation(_this);
  })
  $(window).keydown(function(e){
    if(e.keyCode==13){
      activation();
    }
  })
  function activation(_this){
    var sendData={
      type:"activation",
      username:$.cookie("reged"),
      key:parseInt($("input[name=key]").val())
    }
    console.log(sendData)
    $.ajax({
      type:'get',
      url:localUrl(),
      data:sendData,
      dataType:"jsonp",
      jsonp:"callback",
      beforeSend:function(_this){
        $("#submit").addClass("loading")
      },
      success:function(data){
        $("#submit").removeClass("loading")
        if(data.check=="success"){
          window.location.href="#/activation_ok";
        }
      },
    });
  }
}