function init(){
  var User,Email,Pwd;
  /*验证用户名是否存在 */
  var username="";
  Pwd=true;
  $("#username").blur(function(){
    var _this=$(this);
    var user=$("input[name=username]").val();
    if(user.length<=5){
      _this.parent().addClass("error");
      _this.Tips({value:"写的那么清楚，6位以上，你当我说着好玩吗？"});
      User=false;
      return false;
    }else if(user==username){
      return false;
    }
    var sendData={
      "type":"checkUserName",
      "username":user
    }
    $.ajax({
      type:'get',
      url:localUrl(),
      data:sendData,
      dataType:"jsonp",
      jsonp:"callback",
      beforeSend:function(xhr){
        console.log(xhr)
        _this.parent().addClass("loading")
      },
      success:function(data){
        _this.parent().removeClass("loading");
        username=user;
        if(typeof data.id=="object"){
          User=true;
          _this.parent().removeClass("error");
          _this.parent().addClass("right");
        }else{
          _this.parent().addClass("error");
          _this.Tips({value:"相信你这么有才一定能想到一个比这更好的用户名的，加油！"});
        }
      },
    });
  })
  /*验证邮箱是否已经注册' */
  var emails="";
  $("#email").blur(function(){
    var _this=$(this);
    var email=$("input[name=email]").val();
    var isemail=isEmail(email);
    if(email.length<=1){
      _this.Tips({value:"你逗我呢，邮箱都不给你就想注册！"});
      _this.parent().addClass("error");
      Email=false;
      return false;
    }else if(!isemail){
      _this.parent().addClass("error");
      _this.Tips({value:"邮箱格式都能弄错，门卡和要死你能区分开不！"});
      Email=false;
      return false;
    }else if(email==emails){
      return false;
    }
    var sendData={
      "type":"checkEmail",
      "email":email
    }
    $.ajax({
      type:'get',
      url:localUrl(),
      data:sendData,
      dataType:"jsonp",
      jsonp:"callback",
      timeout:10000,
      beforeSend:function(xhr){
        _this.parent().addClass("loading")
      },
      success:function(data){
        _this.parent().removeClass("loading");
        emails=email;
        if(typeof data.id=="object"){
          Email=true;
          _this.parent().removeClass("error");
          _this.parent().addClass("right");
        }else{
          Email=false;
          _this.parent().addClass("error");
          _this.Tips({value:"邮箱已经被注册！"});
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.readyState == 4) {
            // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
            console.log("http error")
        }
        else if (XMLHttpRequest.readyState == 0) {
            // Network error (i.e. connection refused, access denied due to CORS, etc.)
            console.log("network error")
        }
        else {
            // something weird is happening
            console.log("other error")
        }
      }
    });
  })
  /*注册*/
  $("#submit").click(function(){
    register($(this));
  })
  $(window).keydown(function(e){
    if(e.keyCode==13){
      register();
    }
  })
  function register(_this){
    if(User && Email && Pwd){
      var sendData={
        type:"reg",
        username:$("input[name=username]").val(),
        password:$("input[name=password]").val(),
        email:$("input[name=email]").val(),
        random:GetRandomNum(10000000,99999999)
      }
      console.log(sendData)
      $.ajax({
        type:'get',
        url:localUrl(),
        data:sendData,
        dataType:"jsonp",
        jsonp:"callback",
        beforeSend:function(){
          $("#submit").addClass("loading")
        },
        success:function(data){
          $("#submit").removeClass("loading");
          console.log(data)
          if(typeof data.id=="number"){
            $(document.body).Tips({value:"注册成功！",type:"right"});
            $("input").val("");
            $.cookie("reged",data.username);
            window.location.href="#/register_ok";
          }
        },
      });
    }else{
      _this.Tips({value:"请正确填写注册表单！"});
    }
  }
}