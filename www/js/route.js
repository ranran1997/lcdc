$.getScript("js/page_header.js",function(){
  header();
});
$.getScript('js/page_footer.js',function(){
  footer();
})
var home = function () {
  $.getScript("js/page_home.js",function(){
    page();
  });
};
var project = function (id) {
  $.getScript("js/page_projectList.js",function(){
    page(id);
  })
};
var register=function(){
  document.title="注册";
  $.getScript('libs/tipso.min.js');
  $.getScript('js/page_register.js',function(){
    nodetpl.get('tpls/register.tpl', null, function(d){
      document.querySelector("#view").innerHTML=d;
      init();
    });
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
  document.title="登录";
  $.getScript('libs/jquery.cookie.js');
  $.getScript('js/page_login.js',function(){
    nodetpl.get('tpls/login.tpl', null, function(d){
      document.querySelector("#view").innerHTML=d;
      init();
    });
  })
}
var activation_ok=function(){
  nodetpl.get('tpls/activation_ok.tpl', null, function(d){
    document.querySelector("#view").innerHTML=d;
    document.title="激活成功";
    //init();
  });
}
var articles=function(id){
  $.getScript('js/page_article_list.js',function(){
    page(id);
  });
}
var article_publish=function(){
  $.getScript('js/page_article_publish.js',function(){
    page()
  });
}
var article=function(id){
  $.getScript('js/page_article.js',function(){
    page(id);
  })
}
var addProject=function(){
  $.getScript('js/page_addProject.js',function(){
    page();
  })
}
var project_detail=function(id){
  $.getScript('js/page_projectDetail.js',function(){
    page(id);
  })
}
var search=function(c,t){
  console.log(c,t)
  $.getScript('js/page_search.js',function(){
    page(c,t);
  })
}
var photo_list=function(){
  
}
var routes = {
  '/': home,
  '/projects/type/:Id':project,
  '/projects/add':addProject,
  '/projects/:Id':project_detail,
  '/register':register,
  '/login':login,
  '/register_ok':register_ok,
  '/activation':activation,
  '/activation_ok':activation_ok,
  '/articles/type/:Id':articles,
  "/articles/publish":article_publish,
  "/articles/:Id":article,
  "/search/:catory/:type":search,
  "/photos":photo_list
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