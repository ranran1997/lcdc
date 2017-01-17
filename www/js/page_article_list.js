function page(id){
  var page=1;
  var pageSize=2;
  var type=0;
  load(type,page,pageSize,function(){
    nodetpl.get('tpls/loading.tpl',null, function(d){
      document.title="加载中";
      document.querySelector("#view").innerHTML=d;
    });
  },function(data){
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
      $(".load-more").click(function(){
        var _this=$(this);
        var page=parseInt(_this.attr("page"))
        if(_this.children("span").text()==="没有更多了") return false;
        load(type,page,pageSize,function(){
          _this.addClass("loading").children("span").text("加载中");
          _this.attr("page",parseInt(_this.attr("page"))+1)
        },function(data){
          console.log(data)
          nodetpl.get('tpls/articles_item.tpl', {
            'list':data
          }, function(d){
            $(d).appendTo(".list");
            $.getScript('libs/editormd.min.js',function(){
              for(var i=0;i<data.length;i++){
                var options={
                  container:"editormd"+(i+1),
                  basePath:"./libs/epiceditor",
                  parser: marked,
                  file: {
                    name: 'epiceditor',
                    defaultContent: '## nihao',
                    autoSave: 100
                  },
                  theme: {
                    base: '/themes/base/epiceditor.css',
                    preview: '/themes/preview/github.css',
                    editor: '/themes/editor/epic-light.css'
                  },
                  button: {
                    preview: true,
                    fullscreen: true,
                    bar: "hidden"
                  },
                  focusOnLoad: false,
                  shortcut: {
                    modifier: 18,
                    fullscreen: 70,
                    preview: 80
                  },
                  string: {
                    togglePreview: 'Toggle Preview Mode',
                    toggleEdit: 'Toggle Edit Mode',
                    toggleFullscreen: 'Enter Fullscreen'
                  },
                  autogrow: true
                }
                var editor=new EpicEditor(options);
                editor.load();
                editor.preview();
              }
            });
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