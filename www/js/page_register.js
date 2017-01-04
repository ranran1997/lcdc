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
      _this.Tips({value:"用户名不能少于6位！"});
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
      url:"http://localhost/lcdc/app/app.php",
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
          _this.Tips({value:"用户名已经被注册！"});
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
      _this.Tips({value:"邮箱不能为空！"});
      _this.parent().addClass("error");
      Email=false;
      return false;
    }else if(!isemail){
      _this.parent().addClass("error");
      _this.Tips({value:"邮箱格式有误！"});
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
      url:"http://localhost/lcdc/app/app.php",
      data:sendData,
      dataType:"jsonp",
      jsonp:"callback",
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
    });
  })
  /*注册*/
  $("#submit").click(function(){
    if(User && Email && Pwd){
      var sendData={
        type:"reg",
        username:$("input[name=username]").val(),
        password:$("input[name=password]").val(),
        email:$("input[name=email]").val()
      }
      console.log(sendData)
      $.ajax({
        type:'get',
        url:"http://localhost/lcdc/app/app.php",
        data:sendData,
        dataType:"jsonp",
        jsonp:"callback",
        beforeSend:function(){
          
        },
        success:function(data){
          if(typeof data.id=="number"){
            $(document.body).Tips({value:"注册成功！"});
            $("input").val("");
            window.location.href="#/register_ok";
          }
        },
      });
    }else{
      _this.Tips({value:"请正确填写注册表单！"});
    }
  })
}