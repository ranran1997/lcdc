function page(id){
  var sendData={
    type:'get_project',
    id:id
  }
  $.ajax({
    type:'get',
    url:localUrl(),
    data:sendData,
    dataType:"jsonp",
    jsonp:"callback",
    beforeSend:function(_this){
      console.log(sendData)
    },
    success:function(data){
      data.file=eval(data.file);
      data.img=service()+data.img;
      $.each(data.file,function(index,file){
        file.name=service()+"files/"+file.name;
      })
      console.log(data)
      nodetpl.get('tpls/project_detail.tpl', data, function(d){
        document.querySelector("#view").innerHTML=d;
        document.title="项目";
      })
    }
  })
}
