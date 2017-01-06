function page(id){
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
      
    },
    success:function(data){
      $.getScript('libs/editormd.min.js',function(){
        nodetpl.get('tpls/article_detail.tpl', data, function(d){
          document.querySelector("#view").innerHTML=d;
          document.title="文章";
          var editor = editormd("editormd", {
            path : "./libs/",
            emoji:false,
            codeFold:false,
            searchReplace:false,
            flowChat:false,
            sequeceDiagram:false,
            taskList:false,
            tocm:false,
            tex:false,
            markdown:"",
            height:"80%"
          });
          init(editor);
        });
      });
    }
  });
}