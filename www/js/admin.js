function page(){
  localStorage.setItem("page",$("body").html())
  nodetpl.get('tpls/admin.tpl', {
    'menu':adminMenu()
  }, function(d){
    document.querySelector("body").innerHTML=d;
    document.title="后台管理";
  });
}