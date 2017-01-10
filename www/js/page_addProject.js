function page(){
  nodetpl.get('tpls/addProject.tpl', null, function(d){
    document.querySelector("#view").innerHTML=d;
    document.title="新增项目";
    
  });
}