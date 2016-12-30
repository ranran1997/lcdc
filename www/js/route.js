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
  }]
};
nodetpl.get('tpls/header.tpl', data, function(d){
  document.querySelector("#header").innerHTML=d;
});
nodetpl.get('tpls/footer.tpl', null, function(d){
  document.querySelector("#footer").innerHTML=d;
});
var home = function () {
  document.querySelector("#view").innerHTML="";
};
var project = function () {
  document.querySelector("#view").innerHTML="";
};
var register=function(){
  $.getScript('js/plugins.js',function(){
    $.getScript('js/page_register.js',function(){
      nodetpl.get('tpls/register.tpl', null, function(d){
        document.querySelector("#view").innerHTML=d;
        init();
      });
    })
  })
}
var routes = {
  '/': home,
  '/projects':project,
  '/register':register
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