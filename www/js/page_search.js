function page(catory,type){
  $("body").Bar({
    bar:setting()
  })
  $("body").Code();
  nodetpl.get('tpls/search_result.tpl',null, function(d){
    document.title="加载中";
    document.querySelector("#view").innerHTML=d;
    var hash=localStorage.getItem("hash").split("/");
    var catory=localStorage.getItem("catory");
    var type=hash[3];
    $("body").keydown(function(e){
      var _this=$("#search");
      if(e.keyCode==13){
        var sendData={
          type:"search",
          text:_this.val(),
          catory:catory,
          fenlei:type,
          start:0,
          pageSize:10,
          page:1
        }
        $.ajax({
          type:'get',
          url:localUrl(),
          data:sendData,
          dataType:"jsonp",
          jsonp:"callback",
          beforeSend:function(){
            console.log(sendData.catory,sendData.fenlei)
            nodetpl.get('tpls/loading.tpl',null, function(d){
              document.title="加载中";
              document.querySelector("#view").innerHTML=d;
            });
          },
          success:function(data){
            nodetpl.get('tpls/search_result.tpl',{
              'list':data
            }, function(d){
              document.title="加载中";
              document.querySelector("#view").innerHTML=d;
              console.log(data)
            });
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
          }
        });
      }
    })
  });
}