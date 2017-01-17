function page(id){
  var a,b,c,d,e,f=false;
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
      nodetpl.get('tpls/loading.tpl',null, function(d){
        document.title="加载中";
        document.querySelector("#view").innerHTML=d;
        $.getScript("libs/marked.min.js",function(){a=true;});
        $.getScript("libs/prettify.min.js",function(){b=true;});
        $.getScript("libs/raphael.min.js",function(){c=true;});
        $.getScript("libs/underscore.min.js",function(){d=true;});
        $.getScript("libs/sequence-diagram.min.js",function(){e=true;});
        $.getScript("libs/flowchart.min.js",function(){f=true;});
      });
    },
    success:function(data){
      nodetpl.get('tpls/article_detail.tpl', data, function(d){
        document.querySelector("#view").innerHTML=d;
        document.title=data.title;
        $.getScript("libs/editormd.min.js",function(){
          var file=service()+"md/"+data.file;
          var testEditormdView, testEditormdView2;
          if(a && b && c && d && e && f){
            $.get(file,function(markdown){
              testEditormdView=editormd.markdownToHTML("editormd",{
                markdown        : markdown ,//+ "\r\n" + $("#append-test").text(),
                htmlDecode      : "style,script,iframe",  // you can filter tags decode
                tocm            : true,    // Using [TOCM]
                emoji           : true,
                taskList        : true,
                tex             : true,  // 默认不解析
                flowChart       : false,  // 默认不解析
                sequenceDiagram : true,  // 默认不解析
              })
            })
          }
        });
      });
    }
  });
}