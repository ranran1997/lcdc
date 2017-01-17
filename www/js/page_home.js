function page(){
  document.title="首页";
  nodetpl.get('tpls/index.tpl', null, function(d){
    document.querySelector("#view").innerHTML=d;
  });
}