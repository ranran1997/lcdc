function page(id){
  var sendData={
    type:"project_list",
    catory:0
  }
  $.ajax({
    type:'get',
    url:localUrl(),
    data:sendData,
    dataType:"jsonp",
    jsonp:"callback",
    beforeSend:function(_this){
      nodetpl.get('tpls/loading.tpl',null, function(d){
        document.title="加载中";
        document.querySelector("#view").innerHTML=d;
      });
    },
    success:function(data){
      console.log(data)
      $.each(data,function(index,item){
        item.img=service()+item.img;
      })
      nodetpl.get('tpls/projects.tpl', {
        'list':data
      }, function(d){
        document.title="项目";
        document.querySelector("#view").innerHTML=d;
      });
    }
  })
}