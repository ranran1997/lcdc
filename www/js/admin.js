function page(){
  localStorage.setItem("page",$("body").html())
  nodetpl.get('tpls/admin.tpl', null, function(d){
    document.querySelector("body").innerHTML=d;
    document.title="后台管理";
  });
}