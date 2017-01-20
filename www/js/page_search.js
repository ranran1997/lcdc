function page(catory,type){
  init(function(){
    $("body").Bar({
      bar:setting()
    })
  })
  getHash();
  var sendData={
    type:"search",
    text:unescape(localStorage.getItem("search")),
    catory:catory,
    fenlei:0,
    start:0,
    pageSize:10,
    page:1
  }
  console.log(catory,type)
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
        nodetpl.get('tpls/null.tpl',{
          'list':data,
          'catory':catory
        }, function(d){
          document.title="没有数据";
          document.querySelector("#view").innerHTML=d;
        });
      }else{
        nodetpl.get('tpls/search_result.tpl',{
          'list':data,
          'catory':catory
        }, function(d){
          document.title="加载中";
          document.querySelector("#view").innerHTML=d;
        });
      }
      $("body").removeClass("show-search")
      $(".search input").val("")
      $("body").unbind("keydown");
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest.status);
      console.log(XMLHttpRequest.readyState);
      console.log(textStatus);
    }
  });
}