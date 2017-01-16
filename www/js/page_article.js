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
      nodetpl.get('tpls/article_detail.tpl', data, function(d){
        document.querySelector("#view").innerHTML=d;
        document.title=data.title;
        $.getScript('libs/epiceditor/js/epiceditor.min.js',function(){
          var options={
            container:"editormd",
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
        })
      });
    }
  });
}