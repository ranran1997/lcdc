function init(id){
  var sendData={
    type:"get_article",
    id:id
  }
  //获取文章
  $.ajax({
    type:'get',
    url:"http://192.168.4.151/lcdc/app/app.php",
    data:sendData,
    dataType:"jsonp",
    jsonp:"callback",
    beforeSend:function(_this){
      $("#submit").addClass("loading")
    },
    success:function(data){
      console.log(data)
    },
  });
  nodetpl.get('tpls/article_detail.tpl', null, function(d){
    document.querySelector("#view").innerHTML=d;
    document.title="文章";
    //init();
  });
}