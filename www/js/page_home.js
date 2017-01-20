function page(){
  if($("#header").length==0){
    $(localStorage.getItem("page")).appendTo("body");
    $(".admin").remove();
  }
  init(function(){
    $("body").Bar({
      bar:setting()
    })
  });
  document.title="首页";
  nodetpl.get('tpls/index.tpl', null, function(d){
    document.querySelector("#view").innerHTML=d;
  });
}