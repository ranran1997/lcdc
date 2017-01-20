function page(id){
  var hash=getHash();
  var type=catory();
  $("body").Bar({
    link:'articles',
    type:id,
    nav:articleType(),
    bar:setting()
  })
  $("body").Code();
  var page=1;
  var pageSize=5;
  var type=id;
  load(type,page,pageSize,
  function(){
    nodetpl.get('tpls/loading.tpl',{
        'img':"img/search.gif",
        'text':"文章加载中"
      }, function(d){
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
  function(data){
    console.log(data)
    if(data.length==0){
      nodetpl.get('tpls/null.tpl',null,function(d){
        document.querySelector("#view").innerHTML=d;
        document.title="没有数据";
      })
      return false;
    }
    nodetpl.get('tpls/articles.tpl', {
      'list':data
    }, function(d){
      document.querySelector("#view").innerHTML=d;
      document.title="文章";
      var _this=$(".load-more")
      if(data.length<pageSize){
        _this.removeClass("loading").children("span").text("没有更多了")
      }else{
        _this.removeClass("loading").children("span").text("点击加载更多")
      }
      md(data)
      $(".load-more").click(function(){
        var _this=$(this);
        var page=parseInt(_this.attr("page"))
        if(_this.children("span").text()==="没有更多了") return false;
        load(type,page,pageSize,function(){
          _this.addClass("loading").children("span").text("加载中");
          _this.attr("page",parseInt(_this.attr("page"))+1);
        },function(data){
          console.log(data)
          nodetpl.get('tpls/articles_item.tpl', {
            'list':data
          }, function(d){
            $(d).appendTo(".list");
            md(data);
          })
          if(data.length<pageSize){
            _this.removeClass("loading").children("span").text("没有更多了")
          }else{
            _this.removeClass("loading").children("span").text("点击加载更多")
          }
        })
      })
    });
  })
  /*生成导航 */
  initFooter('articles');
  function md(data){
    $.getScript('libs/editormd.min.js',function(){
      for(var i=0;i<data.length;i++){
        console.log("editormd"+data[i].id)
        editormd.markdownToHTML("editormd"+data[i].id,{
          markdown        : data.content ,//+ "\r\n" + $("#append-test").text(),
          htmlDecode      : "style,script,iframe",  // you can filter tags decode
          tocm            : true,    // Using [TOCM]
          emoji           : true,
          taskList        : true,
          tex             : true,  // 默认不解析
          flowChart       : false,  // 默认不解析
          sequenceDiagram : true,  // 默认不解析
        })
      }
    });
  }
  function load(type,page,pagesize,before,callback){
    var sendData={
      type:"article_list",
      catory:type,
      page:page,
      pagesize:pagesize
    }
    $.ajax({
      type:'get',
      url:localUrl(),
      data:sendData,
      dataType:"jsonp",
      jsonp:"callback",
      beforeSend:function(_this){
        before();
      },
      success:function(data){
        callback(data);
      }
    });
  }
}