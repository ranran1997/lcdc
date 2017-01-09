function page(id){
  var sendData={
    type:"article_list",
    catory:0
  }
  $.ajax({
    type:'get',
    url:localUrl(),
    data:sendData,
    dataType:"jsonp",
    jsonp:"callback",
    beforeSend:function(_this){
      
    },
    success:function(data){
      console.log(data)
      nodetpl.get('tpls/articles.tpl', null, function(d){
        document.querySelector("#view").innerHTML=d;
        document.title="文章";
      });
    }
  });
}