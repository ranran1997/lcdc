function page(){
  document.title="首页";
  nodetpl.get('tpls/index.tpl', null, function(d){
    document.querySelector("#view").innerHTML=d;
    document.body.scrollTop=0;
    Ps.update(document.body);
  });
}