function page(id){
  init(function(){
    $("body").Bar({
      link:'projects',
      type:id,
      nav:[],
      bar:setting()
    })
  })
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
      nodetpl.get('tpls/loading.tpl',{
        'img':"img/search.gif",
        'text':"文章加载中"
      }, function(d){
        document.title="加载中";
        document.querySelector("#view").innerHTML=d;
      });
    },
    success:function(data){
      data.file=eval(data.file);
      data.img=service()+data.img;
      $.each(data.file,function(index,file){
        file.url=service()+"files/"+file.name;
        file.type=file.name.split('.')[1];
      })
      console.log(data)
      nodetpl.get('tpls/project_detail.tpl', data, function(d){
        document.querySelector("#view").innerHTML=d;
        document.title=data.title;
      })
    }
  })
}
