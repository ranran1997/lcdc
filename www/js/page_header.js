function header(){
  $.getScript('libs/jquery.cookie.js',function(){
    var login=$.cookie("logined")
    var data = {
      "title": "资源库",
      "menu":[{
        text:"首页",
        url:"/",
        icon:""
      },{
        text:"项目",
        url:"/projects/type/0",
        icon:""
      },{
        text:"文章",
        url:"/articles/type/0",
        icon:""
      }],
      "user":login,
      "submenu":[{
        text:"个人中心",
        url:"#/home",
        icon:"icon-denglu"
      },{
        text:"写文章",
        url:"#/articles/publish",
        icon:"icon-edit"
      },{
        text:"新增项目",
        url:"#/projects/add",
        icon:"icon-project"
      },{
        text:"退出登录",
        url:"javascript:;",
        icon:"icon-tuichu"
      }]
    };
    nodetpl.get('tpls/header.tpl', data, function(d){
      document.querySelector("#header").innerHTML=d;
      /*搜索 */
      var hash=getHash();
      var type=catory();
      $(".search .iconfont").click(function(){
        var _this=$(this)
        var str=localStorage.getItem("hash").split("/");
        var type=str[str.length-1];
        window.location.href="#/search/"+localStorage.getItem("catory")+"/"+type;
        if($(this).siblings("input").val()!=""){
          search(_this.parents('input').val(),_this.parents(".search"));
        }else{
          //$("body").toggleClass("show-search");
        }
      })
      $(".search input").keydown(function(e){
        var _this=$(this);
        if(e.keyCode==13){
          search(_this.val(),_this.parents(".search"));
        }
      })
      function search(val,search){
        var sendData={
          type:"search",
          text:val,
          catory:type,
          start:0,
          pageSize:10,
          page:1
        }
        $.ajax({
          type:'get',
          url:localUrl(),
          data:sendData,
          dataType:"jsonp",
          jsonp:"callback",
          beforeSend:function(){
            search.addClass("loading");
            nodetpl.get('tpls/loading.tpl',null, function(d){
              document.title="加载中";
              document.querySelector("#view").innerHTML=d;
            });
          },
          success:function(data){
            search.removeClass("loading");
            nodetpl.get('tpls/search_result.tpl',{
              'list':data
            }, function(d){
              document.title="加载中";
              document.querySelector("#view").innerHTML=d;
            });
            console.log(data)
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
          }
        });
      }
    });
  });
}