function init(id){
  var sendData={
    type:"get_article",
    id:id
  }
  //获取文章
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
      nodetpl.get('tpls/article_detail.tpl', data, function(d){
        document.querySelector("#view").innerHTML=d;
        document.title="文章";
      });
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.readyState == 4) {
            // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
            console.log("http error")
        }
        else if (XMLHttpRequest.readyState == 0) {
            // Network error (i.e. connection refused, access denied due to CORS, etc.)
            console.log("network error")
        }
        else {
            // something weird is happening
            console.log("other error")
        }
      }
  });
}