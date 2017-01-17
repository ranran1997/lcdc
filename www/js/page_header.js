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
    });
  });
}