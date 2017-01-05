header();
function header(){
  $.getScript('libs/jquery.cookie.js',function(){
    var data = {
      "title": "资源库",
      "menu":[{
        text:"首页",
        url:"/",
        icon:""
      },{
        text:"项目",
        url:"/projects",
        icon:""
      },{
        text:"文章",
        url:"/articles",
        icon:""
      }],
      "user":$.cookie("logined"),
      "submenu":[{
        text:"个人中心",
        url:"#/home",
        icon:"icon-denglu"
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
nodetpl.get('tpls/footer.tpl', null, function(d){
  document.querySelector("#footer").innerHTML=d;
});
var home = function () {
  document.title="首页";
  nodetpl.get('tpls/index.tpl', null, function(d){
    document.querySelector("#view").innerHTML=d;
    //init();
  });
};
var project = function () {
  document.title="项目";
  nodetpl.get('tpls/projects.tpl', null, function(d){
    document.querySelector("#view").innerHTML=d;
    //init();
  });
};
var register=function(){
  $.getScript('libs/jquery.cookie.js',function(){
    if(typeof $.cookie("logined")!="undefined"){
      window.location.href="#/";
      return false;
    }
  });
  document.title="注册";
  $.getScript('js/plugins.js',function(){
    $.getScript('libs/tipso.min.js');
    $.getScript('js/page_register.js',function(){
      nodetpl.get('tpls/register.tpl', null, function(d){
        document.querySelector("#view").innerHTML=d;
        init();
      });
    })
  })
}
var register_ok=function(){
  nodetpl.get('tpls/register_ok.tpl', null, function(d){
    document.querySelector("#view").innerHTML=d;
    document.title="注册成功";
    //init();
  });
}
var activation=function(){
  $.getScript('libs/jquery.cookie.js',function(){
    var data={
      username:$.cookie("reged")
    }
    $.getScript('js/page_activation.js',function(){
      nodetpl.get('tpls/activation.tpl', data, function(d){
        document.querySelector("#view").innerHTML=d;
        document.title="激活帐号";
        init();
      });
    });
  });
}
var login=function(){
  $.getScript('libs/jquery.cookie.js',function(){
    console.log(typeof $.cookie("logined"))
    if(typeof $.cookie("logined")!="undefined"){
      window.location.href="#/";
      return false;
    }
  });
  document.title="登录";
  $.getScript('js/plugins.js',function(){
    $.getScript('libs/jquery.cookie.js');
    $.getScript('js/page_login.js',function(){
      nodetpl.get('tpls/login.tpl', null, function(d){
        document.querySelector("#view").innerHTML=d;
        init();
      });
    })
  })
}
var activation_ok=function(){
  nodetpl.get('tpls/activation_ok.tpl', null, function(d){
    document.querySelector("#view").innerHTML=d;
    document.title="激活成功";
    //init();
  });
}
var articles=function(){
  nodetpl.get('tpls/articles.tpl', null, function(d){
    document.querySelector("#view").innerHTML=d;
    document.title="文章";
    //init();
  });
}
var article_publish=function(){
  $.getScript('libs/editormd.min.js',function(){
    $.getScript('js/page_article_publish.js',function(){
      nodetpl.get('tpls/article_publish.tpl', null, function(d){
        document.querySelector("#view").innerHTML=d;
        document.title="发布文章";
        var editor = editormd("editormd", {
            path : "./libs/",
            emoji:true,
            codeFold:true,
            searchReplace:true,
            flowChat:true,
            sequeceDiagram:true,
            taskList:true,
            tocm:true,
            tex:true,
            markdown:"",
            height:"80%"
        });
        init(editor);
      });
    })
  });
}
var routes = {
  '/': home,
  '/projects':project,
  '/register':register,
  '/login':login,
  '/register_ok':register_ok,
  '/activation':activation,
  '/activation_ok':activation_ok,
  "/articles":articles,
  "/articles/publish":article_publish
};

var router = Router(routes);

router.init();



// var home = function () {
//   console.log()
// };
// var books = function () { console.log("books"); };
// var viewBook = function (bookId) {
//   console.log("viewBook: bookId is populated: " + bookId);
// };
// var routes = {
//   '/': home,
//   '/books': [books, function() {
//     console.log("An inline route handler.");
//   }],
//   '/books/view/:bookId': viewBook
// };