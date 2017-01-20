function page(){
  nodetpl.get('tpls/admin_home.tpl', null, function(d){
    document.querySelector("body").innerHTML=d;
  });
}