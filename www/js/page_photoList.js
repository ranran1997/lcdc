function page(){
  $("body").Bar({
    bar:setting()
  })
  $("body").Code()
  var sendData={
    type:"get_ablums",
    page:1,
    pagesize:2
  }
  $.ajax({
    type:'get',
    url:localUrl(),
    data:sendData,
    dataType:"jsonp",
    jsonp:"callback",
    beforeSend:function(){
      console.log(sendData)
      nodetpl.get('tpls/loading.tpl',{
        'img':"img/search.gif",
        'text':"让我再找一找！"
      }, function(d){
        document.title="加载中";
        document.querySelector("#view").innerHTML=d;
      });
    },
    success:function(data){
      if(data.length==0){
        nodetpl.get('tpls/null.tpl', null, function(d){
          document.querySelector("#view").innerHTML=d;
        });
      }else{
        nodetpl.get('tpls/photo_list.tpl', {
          'list':data
        }, function(d){
          document.querySelector("#view").innerHTML=d;
          document.title="图库";
        });
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest.status);
      console.log(XMLHttpRequest.readyState);
      console.log(textStatus);
    }
  });
}